import { access, readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const siteOrigin = 'https://lkowalskil.github.io';
const files = (await readdir(root)).filter((file) => file.endsWith('.html'));
const failures = [];
const seenTitles = new Map();
const seenCanonicals = new Map();
const noindexCanonicals = new Map();
const alternateSets = new Map();
const pageLanguages = new Map();

function capture(html, pattern) {
  return html.match(pattern)?.[1]?.replace(/\s+/g, ' ').trim();
}

function decodeEntities(value = '') {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=(["'])(.*?)\\1`, 'i'))?.[2];
}

function metaContent(html, kind, name) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    if (attribute(match[0], kind)?.toLowerCase() === name.toLowerCase()) {
      return attribute(match[0], 'content');
    }
  }
}

function canonicalFor(file) {
  return file === 'index.html' ? `${siteOrigin}/` : `${siteOrigin}/${file}`;
}

function localPath(url) {
  if (url.startsWith(`${siteOrigin}/`)) return new URL(url).pathname.slice(1) || 'index.html';
  return url.split('#')[0].split('?')[0];
}

async function requireLocalTarget(file, value, label) {
  const target = localPath(value);
  if (!target || value.startsWith('mailto:') || value.startsWith('data:') || value.startsWith('#')) return;
  if (/^https?:\/\//i.test(value) && !value.startsWith(`${siteOrigin}/`)) return;
  try {
    await access(resolve(root, target));
  } catch {
    failures.push(`${file}: broken ${label} ${value}`);
  }
}

for (const file of files) {
  const html = await readFile(resolve(root, file), 'utf8');
  const isVerification = file === 'google54b3a0eff6175f9b.html';
  if (isVerification) continue;

  const isLegal = file.startsWith('privacy-policy-') || file === 'terms-signet.html' || file === 'signet-support.html';
  const title = capture(html, /<title>([\s\S]*?)<\/title>/i);
  const description = metaContent(html, 'name', 'description');
  const robots = metaContent(html, 'name', 'robots');
  // Deliberately excluded from search: still needs full metadata and a canonical,
  // but must never appear in the sitemap.
  const isNoindex = /(^|,)\s*noindex\s*(,|$)/.test(robots ?? '');
  const referrer = metaContent(html, 'name', 'referrer');
  const viewport = metaContent(html, 'name', 'viewport');
  const csp = metaContent(html, 'http-equiv', 'Content-Security-Policy');
  const canonical = capture(html, /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/i);
  const favicon = capture(html, /<link\b(?=[^>]*\brel=["']icon["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/i);
  const expectedCanonical = canonicalFor(file);
  const h1Count = [...html.matchAll(/<h1\b/gi)].length;

  // Translated editions are only useful to search engines when the whole
  // hreflang set agrees; collect it here and check reciprocity below.
  pageLanguages.set(file, capture(html, /<html\b[^>]*\blang=["']([^"']+)["']/i));
  const alternates = new Map();
  for (const match of html.matchAll(/<link\b(?=[^>]*\brel=["']alternate["'])[^>]*>/gi)) {
    const hreflang = attribute(match[0], 'hreflang');
    const href = attribute(match[0], 'href');
    if (!hreflang || !href) {
      failures.push(`${file}: alternate link needs both hreflang and href`);
      continue;
    }
    if (alternates.has(hreflang)) failures.push(`${file}: duplicate hreflang ${hreflang}`);
    alternates.set(hreflang, href);
  }
  if (alternates.size) alternateSets.set(file, alternates);

  if (!title) failures.push(`${file}: missing title`);
  if (!description) failures.push(`${file}: missing meta description`);
  if (!canonical) failures.push(`${file}: missing canonical URL`);
  if (!favicon) failures.push(`${file}: missing favicon`);
  if (favicon) await requireLocalTarget(file, favicon, 'favicon');
  if (canonical && canonical !== expectedCanonical) {
    failures.push(`${file}: canonical must be ${expectedCanonical}`);
  }
  if (isNoindex) {
    if (!robots?.includes('follow')) {
      failures.push(`${file}: noindex page must still allow follow`);
    }
  } else if (!/(^|,)\s*index\s*(,|$)/.test(robots ?? '') || !robots?.includes('follow')) {
    failures.push(`${file}: robots metadata must allow index and follow`);
  }
  if (referrer !== 'strict-origin-when-cross-origin') {
    failures.push(`${file}: missing strict referrer policy`);
  }
  if (!viewport?.includes('viewport-fit=cover')) {
    failures.push(`${file}: viewport must support safe-area insets`);
  }
  if (!csp || !csp.includes("base-uri 'none'") || !csp.includes("object-src 'none'")) {
    failures.push(`${file}: missing hardened Content Security Policy`);
  }
  if (h1Count !== 1) failures.push(`${file}: expected exactly one h1, found ${h1Count}`);

  if (title) {
    const visibleTitleLength = decodeEntities(title).length;
    if (visibleTitleLength < 15 || visibleTitleLength > 75) {
      failures.push(`${file}: visible title length is ${visibleTitleLength}`);
    }
    if (seenTitles.has(title)) failures.push(`${file}: duplicate title with ${seenTitles.get(title)}`);
    seenTitles.set(title, file);
  }
  if (description) {
    const minimum = isLegal ? 50 : 80;
    if (description.length < minimum || description.length > 180) {
      failures.push(`${file}: meta description length is ${description.length}`);
    }
  }
  if (canonical) {
    if (seenCanonicals.has(canonical)) failures.push(`${file}: duplicate canonical with ${seenCanonicals.get(canonical)}`);
    if (isNoindex) noindexCanonicals.set(canonical, file);
    else seenCanonicals.set(canonical, file);
  }

  if (!isLegal) {
    const ogUrl = metaContent(html, 'property', 'og:url');
    const ogImage = metaContent(html, 'property', 'og:image');
    const requiredSocial = [
      ['og:title', metaContent(html, 'property', 'og:title')],
      ['og:description', metaContent(html, 'property', 'og:description')],
      ['og:site_name', metaContent(html, 'property', 'og:site_name')],
      ['og:image:width', metaContent(html, 'property', 'og:image:width')],
      ['og:image:height', metaContent(html, 'property', 'og:image:height')],
      ['og:image:alt', metaContent(html, 'property', 'og:image:alt')],
      ['twitter:card', metaContent(html, 'name', 'twitter:card')],
      ['twitter:title', metaContent(html, 'name', 'twitter:title')],
      ['twitter:description', metaContent(html, 'name', 'twitter:description')],
      ['twitter:image', metaContent(html, 'name', 'twitter:image')],
      ['twitter:image:alt', metaContent(html, 'name', 'twitter:image:alt')],
    ];
    if (ogUrl !== canonical) failures.push(`${file}: og:url must match the canonical URL`);
    if (!ogImage?.startsWith(`${siteOrigin}/`)) failures.push(`${file}: og:image must be an absolute same-site URL`);
    for (const [name, value] of requiredSocial) {
      if (!value) failures.push(`${file}: missing ${name}`);
    }
    if (ogImage) await requireLocalTarget(file, ogImage, 'social image');
  }

  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      failures.push(`${file}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const match of html.matchAll(/<script\b[^>]*\bsrc=["'][^"']+["'][^>]*>/gi)) {
    if (!/\bdefer\b/i.test(match[0])) failures.push(`${file}: external script must use defer`);
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const src = attribute(tag, 'src');
    if (!src) failures.push(`${file}: image missing src`);
    if (!attribute(tag, 'alt') && attribute(tag, 'alt') !== '') failures.push(`${file}: image missing alt`);
    if (!/^\d+$/.test(attribute(tag, 'width') || '') || !/^\d+$/.test(attribute(tag, 'height') || '')) {
      failures.push(`${file}: image missing numeric width and height (${src || 'unknown'})`);
    }
    if (attribute(tag, 'decoding') !== 'async') failures.push(`${file}: image should decode asynchronously (${src || 'unknown'})`);
    if (src) await requireLocalTarget(file, src, 'image');
  }

  for (const match of html.matchAll(/<(?:a|link)\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)) {
    const href = match[1];
    if (/^javascript:/i.test(href)) failures.push(`${file}: unsafe javascript URL`);
    await requireLocalTarget(file, href, 'link');
  }
  for (const match of html.matchAll(/<a\b[^>]*\btarget=["']_blank["'][^>]*>/gi)) {
    if (!/\brel=["'][^"']*noopener[^"']*["']/i.test(match[0])) {
      failures.push(`${file}: target=_blank link missing noopener`);
    }
  }
  if (/\son(?:click|error|load|mouseover)\s*=/i.test(html)) {
    failures.push(`${file}: inline event handler is not allowed`);
  }
  if (/\bdata-parallax\s*=/i.test(html)) {
    failures.push(`${file}: scroll parallax is not allowed on content images`);
  }
}

const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
const sitemapIndex = await readFile(resolve(root, 'sitemap-index.xml'), 'utf8');

// Schema-aware validators cannot resolve an XSD from the namespace alone, so each
// root element has to point at its schema explicitly or they report the sitemap as
// having no schema at all.
const sitemapNamespace = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const schemaLocations = [
  ['sitemap.xml', sitemap, 'urlset', `${sitemapNamespace}/sitemap.xsd`],
  ['sitemap-index.xml', sitemapIndex, 'sitemapindex', `${sitemapNamespace}/siteindex.xsd`],
];
for (const [file, xml, rootElement, xsd] of schemaLocations) {
  if (!xml.includes(`<${rootElement} xmlns="${sitemapNamespace}"`)) {
    failures.push(`${file}: ${rootElement} must declare the sitemap namespace`);
  }
  if (!xml.includes('xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"')) {
    failures.push(`${file}: missing the XMLSchema-instance namespace`);
  }
  if (!xml.includes(`xsi:schemaLocation="${sitemapNamespace} https://www.sitemaps.org${new URL(xsd).pathname}"`)) {
    failures.push(`${file}: ${rootElement} must declare xsi:schemaLocation for ${xsd}`);
  }
}
for (const match of sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  await requireLocalTarget('sitemap-index.xml', match[1], 'sitemap');
}

const sitemapUrls = new Map();
for (const match of sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/g)) {
  const [, loc, lastmod] = match;
  if (sitemapUrls.has(loc)) failures.push(`sitemap.xml: duplicate URL ${loc}`);
  sitemapUrls.set(loc, lastmod);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) failures.push(`sitemap.xml: invalid lastmod for ${loc}`);
  await requireLocalTarget('sitemap.xml', loc, 'target');
}

for (const [canonical, file] of seenCanonicals) {
  if (!sitemapUrls.has(canonical)) failures.push(`sitemap.xml: missing canonical for ${file}`);
}
for (const [canonical, file] of noindexCanonicals) {
  if (sitemapUrls.has(canonical)) failures.push(`sitemap.xml: noindex page must not be listed (${file})`);
}
for (const loc of sitemapUrls.keys()) {
  if (!seenCanonicals.has(loc)) failures.push(`sitemap.xml: URL is not an indexable canonical ${loc}`);
}

// An hreflang set is ignored unless every edition points at every other one,
// itself included, and each target agrees. A one-way declaration is dead weight.
for (const [file, alternates] of alternateSets) {
  const lang = pageLanguages.get(file);
  if (!lang) {
    failures.push(`${file}: page with hreflang alternates must declare an html lang`);
  } else if (alternates.get(lang) !== canonicalFor(file)) {
    failures.push(`${file}: hreflang set must reference itself as ${lang}`);
  }
  if (!alternates.has('x-default')) failures.push(`${file}: hreflang set is missing x-default`);

  for (const [hreflang, url] of alternates) {
    if (hreflang === 'x-default') continue;
    const target = localPath(url);
    const mirrored = alternateSets.get(target);
    if (!mirrored) {
      failures.push(`${file}: ${target} is the ${hreflang} alternate but declares no alternates back`);
      continue;
    }
    if (pageLanguages.get(target) !== hreflang) {
      failures.push(`${file}: declares ${target} as ${hreflang}, but that page is lang="${pageLanguages.get(target)}"`);
    }
    for (const [otherLang, otherUrl] of alternates) {
      if (mirrored.get(otherLang) !== otherUrl) {
        failures.push(`${file}: ${target} does not mirror the ${otherLang} alternate`);
      }
    }
  }
}

const robotsText = await readFile(resolve(root, 'robots.txt'), 'utf8');
const robotsLines = robotsText.split(/\r?\n/).map((line) => line.trim());
if (!robotsLines.includes(`Sitemap: ${siteOrigin}/sitemap.xml`)) {
  failures.push('robots.txt: missing absolute sitemap declaration on a line of its own');
}
// robots.txt is one directive per line. A second directive glued onto another's
// value is not parsed — it is swallowed into the value and silently ignored.
for (const line of robotsLines) {
  if (!line || line.startsWith('#')) continue;
  const separator = line.indexOf(':');
  if (separator === -1) {
    failures.push(`robots.txt: line is not a directive — "${line}"`);
    continue;
  }
  const field = line.slice(0, separator).trim();
  const value = line.slice(separator + 1).trim();
  if (!/^(user-agent|allow|disallow|sitemap|crawl-delay|host)$/i.test(field)) {
    failures.push(`robots.txt: unknown directive "${field}"`);
  }
  if (/\b(user-agent|allow|disallow|sitemap)\s*:/i.test(value)) {
    failures.push(`robots.txt: two directives on one line — "${line}"`);
  }
}

const responsiveStyles = [
  ['assets/css/main.css', await readFile(resolve(root, 'assets/css/main.css'), 'utf8')],
  ['assets/css/cult.css', await readFile(resolve(root, 'assets/css/cult.css'), 'utf8')],
];
for (const [file, css] of responsiveStyles) {
  if (!/\bimg\s*\{[^}]*\bheight:\s*auto\s*;/is.test(css)) {
    failures.push(`${file}: global images must preserve their intrinsic aspect ratio`);
  }
}
const mainStyles = responsiveStyles[0][1];
if (!/\.app-media\s*\{[^}]*\balign-items:\s*flex-start\s*;/is.test(mainStyles)) {
  failures.push('assets/css/main.css: app media must not stretch screenshots on the cross axis');
}
const interactionScript = await readFile(resolve(root, 'assets/js/main.js'), 'utf8');
if (/data-parallax/i.test(interactionScript)) {
  failures.push('assets/js/main.js: scroll parallax must not be reintroduced');
}

// Orphan pages do not rank: every guide and comparison must be linked from the hub.
const guideIndex = await readFile(resolve(root, 'guides.html'), 'utf8');
const guideCardCount = [...guideIndex.matchAll(/class="guide-card"/g)].length;
const hubLinks = new Set(
  [...guideIndex.matchAll(/<a\s+class="guide-card"\s+href="([^"]+)"/g)].map((match) => match[1]),
);
const hubExempt = new Set([
  'index.html',
  'guides.html',
  'about.html',
  '404.html',
  'pocket-cult.html',
  'privacy-policy.html',
  'terms-signet.html',
  'signet-support.html',
]);
for (const file of files) {
  if (file === 'google54b3a0eff6175f9b.html') continue;
  if (hubExempt.has(file) || file.startsWith('privacy-policy-')) continue;
  if (!hubLinks.has(file)) failures.push(`guides.html: missing hub link to ${file}`);
}
if (guideCardCount !== hubLinks.size) {
  failures.push(`guides.html: ${guideCardCount} guide cards but ${hubLinks.size} unique targets`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${files.length - 1} indexable HTML pages, ${guideCardCount} guide cards, metadata, structured data, responsive image safeguards, security controls, local links, robots and sitemap coverage.`);
}
