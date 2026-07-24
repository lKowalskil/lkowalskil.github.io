import { access, readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const files = (await readdir(root)).filter((file) => file.endsWith('.html'));
const failures = [];
const seenTitles = new Map();
const seenCanonicals = new Map();

function capture(html, pattern) {
  return html.match(pattern)?.[1]?.trim();
}

for (const file of files) {
  const html = await readFile(resolve(root, file), 'utf8');
  const isVerification = file === 'google54b3a0eff6175f9b.html';
  const isPrivacy = file.startsWith('privacy-policy-');
  const shouldOptimize = !isVerification && !isPrivacy;
  const title = capture(html, /<title>([\s\S]*?)<\/title>/i);
  const description = capture(html, /<meta\s+name="description"\s+content="([^"]+)"/i);
  const canonical = capture(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);

  if (!title && !isVerification) failures.push(`${file}: missing title`);
  if (!description && shouldOptimize) failures.push(`${file}: missing meta description`);
  if (!canonical && shouldOptimize) {
    failures.push(`${file}: missing canonical URL`);
  }
  if (description && shouldOptimize && (description.length < 80 || description.length > 180)) {
    failures.push(`${file}: meta description length is ${description.length}`);
  }

  if (title) {
    if (seenTitles.has(title)) failures.push(`${file}: duplicate title with ${seenTitles.get(title)}`);
    seenTitles.set(title, file);
  }
  if (canonical) {
    if (seenCanonicals.has(canonical)) failures.push(`${file}: duplicate canonical with ${seenCanonicals.get(canonical)}`);
    seenCanonicals.set(canonical, file);
  }

  for (const match of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      failures.push(`${file}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const match of html.matchAll(/href="([^"]+)"/gi)) {
    const href = match[1];
    if (
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('#') ||
      href.startsWith('javascript:')
    ) continue;
    const target = href.split('#')[0].split('?')[0];
    if (!target) continue;
    try {
      await access(resolve(root, target));
    } catch {
      failures.push(`${file}: broken local link ${href}`);
    }
  }
}

const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
for (const match of sitemap.matchAll(/<loc>https:\/\/lkowalskil\.github\.io\/([^<]*)<\/loc>/g)) {
  const path = match[1] || 'index.html';
  try {
    await access(resolve(root, path));
  } catch {
    failures.push(`sitemap.xml: missing local target ${path}`);
  }
}

const guideIndex = await readFile(resolve(root, 'guides.html'), 'utf8');
const guideCardCount = [...guideIndex.matchAll(/class="guide-card"/g)].length;
if (guideCardCount !== 12) failures.push(`guides.html: expected 12 guide cards, found ${guideCardCount}`);

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${files.length} HTML files, ${guideCardCount} guide cards, local links, sitemap targets and JSON-LD.`);
}
