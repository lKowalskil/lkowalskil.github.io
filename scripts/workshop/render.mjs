/* ═══════════════════════════════════════════════════════════
   Nyxelium Workshop — shared renderer for the non-product
   guides (PC, GPU, Windows, developer tooling, devices).

   These pages use the same "Systema" chrome as the app guides
   in generate-seo-guides.mjs, but carry a studio callout
   instead of an app callout: the workshop guides exist to be
   useful on their own, so they only mention an app when the
   fit is genuine.
   ═══════════════════════════════════════════════════════════ */

export const siteUrl = 'https://lkowalskil.github.io';
export const published = '2026-09-02';
export const reviewed = '2026-09-02';

const logo = { src: 'assets/img/nyxelium-logo.png', w: 512, h: 512 };
const socialCard = {
  url: `${siteUrl}/assets/img/nyxelium-social-card.png`,
  w: 1200,
  h: 630,
};

/* Chrome strings, so a translated guide is translated end to end
   instead of being an English shell wrapped around a foreign article. */
const strings = {
  en: {
    skip: 'Skip to the guide',
    back: '← ALL GUIDES',
    navApps: 'Apps',
    navGuides: 'Guides',
    cta: 'Get the apps',
    rail: 'ON THIS PAGE',
    keepReading: 'KEEP READING',
    footerGuides: 'ALL GUIDES',
    footerHome: 'STUDIO HOME',
    footerAbout: 'ABOUT',
    reviewedLabel: 'LAST REVIEWED · SEPTEMBER 2026',
    breadcrumbGuides: 'Guides',
    langLabel: 'READ THIS GUIDE IN',
    asideLabel: 'Guide summary',
    railLabel: 'On this page',
    relatedLabel: 'Related guides',
    socialAlt: 'Nyxelium — offline-first Android apps',
    logoAlt: 'Nyxelium studio mark',
  },
  ru: {
    skip: 'Перейти к руководству',
    back: '← ВСЕ РУКОВОДСТВА',
    navApps: 'Приложения',
    navGuides: 'Руководства',
    cta: 'Смотреть приложения',
    rail: 'НА ЭТОЙ СТРАНИЦЕ',
    keepReading: 'ЧИТАТЬ ДАЛЬШЕ',
    footerGuides: 'ВСЕ РУКОВОДСТВА',
    footerHome: 'ГЛАВНАЯ',
    footerAbout: 'О СТУДИИ',
    reviewedLabel: 'ПРОВЕРЕНО · СЕНТЯБРЬ 2026',
    breadcrumbGuides: 'Руководства',
    langLabel: 'ЯЗЫК РУКОВОДСТВА',
    asideLabel: 'Кратко о руководстве',
    railLabel: 'Содержание',
    relatedLabel: 'Похожие руководства',
    socialAlt: 'Nyxelium — офлайн-приложения для Android',
    logoAlt: 'Знак студии Nyxelium',
  },
  de: {
    skip: 'Zum Guide springen',
    back: '← ALLE GUIDES',
    navApps: 'Apps',
    navGuides: 'Guides',
    cta: 'Apps ansehen',
    rail: 'AUF DIESER SEITE',
    keepReading: 'WEITERLESEN',
    footerGuides: 'ALLE GUIDES',
    footerHome: 'STUDIO',
    footerAbout: 'ÜBER',
    reviewedLabel: 'ZULETZT GEPRÜFT · SEPTEMBER 2026',
    breadcrumbGuides: 'Guides',
    langLabel: 'DIESEN GUIDE LESEN AUF',
    asideLabel: 'Kurzfassung',
    railLabel: 'Auf dieser Seite',
    relatedLabel: 'Verwandte Guides',
    socialAlt: 'Nyxelium — Offline-Apps für Android',
    logoAlt: 'Nyxelium Studio-Zeichen',
  },
  es: {
    skip: 'Ir a la guía',
    back: '← TODAS LAS GUÍAS',
    navApps: 'Apps',
    navGuides: 'Guías',
    cta: 'Ver las apps',
    rail: 'EN ESTA PÁGINA',
    keepReading: 'SEGUIR LEYENDO',
    footerGuides: 'TODAS LAS GUÍAS',
    footerHome: 'INICIO',
    footerAbout: 'SOBRE EL ESTUDIO',
    reviewedLabel: 'REVISADO · SEPTIEMBRE DE 2026',
    breadcrumbGuides: 'Guías',
    langLabel: 'LEER ESTA GUÍA EN',
    asideLabel: 'Resumen de la guía',
    railLabel: 'En esta página',
    relatedLabel: 'Guías relacionadas',
    socialAlt: 'Nyxelium — apps offline para Android',
    logoAlt: 'Marca del estudio Nyxelium',
  },
};

const languageNames = {
  en: 'English',
  ru: 'Русский',
  de: 'Deutsch',
  es: 'Español',
};

export function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/* Indents a section body into the document, leaving <pre> contents
   untouched — whitespace is significant in a command block, and
   padding it puts a ragged 20-space gutter into every listing. */
function indent(block, spaces) {
  const pad = ' '.repeat(spaces);
  let inPre = false;
  return block
    .trim()
    .split('\n')
    .map((line) => {
      const wasInPre = inPre;
      const opens = line.lastIndexOf('<pre');
      const closes = line.lastIndexOf('</pre>');
      if (opens !== -1 && opens > closes) inPre = true;
      else if (closes !== -1) inPre = false;

      if (wasInPre) return line.trimEnd();
      return line.trim() ? pad + line.trimEnd() : '';
    })
    .join('\n');
}

function alternateLinks(page) {
  if (!page.alternates?.length) return '';
  const rows = page.alternates.map(
    ({ hreflang, file }) => `    <link rel="alternate" hreflang="${hreflang}" href="${siteUrl}/${file}">`,
  );
  const xDefault = page.alternates.find((alt) => alt.hreflang === 'en');
  if (xDefault) {
    rows.push(`    <link rel="alternate" hreflang="x-default" href="${siteUrl}/${xDefault.file}">`);
  }
  return `\n${rows.join('\n')}`;
}

function languageSwitch(page, t) {
  if (!page.alternates?.length) return '';
  const chips = page.alternates.map(({ hreflang, file }) => {
    const name = languageNames[hreflang] ?? hreflang.toUpperCase();
    return file === page.file
      ? `                        <span aria-current="page">${name}</span>`
      : `                        <a href="${file}" hreflang="${hreflang}" lang="${hreflang}">${name}</a>`;
  });
  return `
                <div class="guide-langs">
                    <span class="guide-langs-label">${t.langLabel}</span>
${chips.join('\n')}
                </div>`;
}

export function render(page) {
  const lang = page.lang ?? 'en';
  const t = strings[lang];
  if (!t) throw new Error(`${page.file}: no chrome strings for language "${lang}"`);

  const canonical = `${siteUrl}/${page.file}`;
  const callout = page.callout;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Nyxelium',
        url: `${siteUrl}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/${logo.src}`,
          width: logo.w,
          height: logo.h,
        },
        sameAs: ['https://github.com/lKowalskil'],
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/about.html#person`,
        name: 'Yehor Kovalchuk',
        url: `${siteUrl}/about.html`,
        jobTitle: 'Android developer',
        sameAs: ['https://github.com/lKowalskil'],
      },
      {
        '@type': page.articleType ?? 'TechArticle',
        '@id': `${canonical}#article`,
        headline: page.ogTitle,
        description: page.description,
        inLanguage: lang,
        datePublished: published,
        dateModified: reviewed,
        mainEntityOfPage: canonical,
        image: socialCard.url,
        keywords: page.keywords,
        articleSection: page.articleSection,
        proficiencyLevel: page.proficiency ?? 'Beginner',
        audience: { '@type': 'Audience', audienceType: page.audience },
        author: { '@id': `${siteUrl}/about.html#person` },
        publisher: { '@id': `${siteUrl}/#organization` },
        isPartOf: { '@type': 'CollectionPage', '@id': `${siteUrl}/guides.html` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        inLanguage: lang,
        mainEntity: page.faqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Nyxelium', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: t.breadcrumbGuides, item: `${siteUrl}/guides.html` },
          { '@type': 'ListItem', position: 3, name: page.ogTitle, item: canonical },
        ],
      },
    ],
  };

  if (page.howTo) {
    schema['@graph'].push({
      '@type': 'HowTo',
      '@id': `${canonical}#howto`,
      name: page.howTo.name,
      description: page.howTo.description,
      inLanguage: lang,
      totalTime: page.howTo.totalTime,
      tool: page.howTo.tools?.map((name) => ({ '@type': 'HowToTool', name })),
      step: page.howTo.steps.map(([name, text], index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name,
        text,
        url: `${canonical}#${page.howTo.anchor}`,
      })),
    });
  }

  return `<!DOCTYPE html>
<html lang="${lang}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="description" content="${esc(page.description)}">
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'none'; object-src 'none'; form-action 'none'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; upgrade-insecure-requests">
    <meta name="theme-color" content="#101318">
    <title>${esc(page.title)}</title>

    <meta property="og:type" content="article">
    <meta property="og:locale" content="${page.ogLocale ?? 'en_US'}">
    <meta property="og:title" content="${esc(page.ogTitle)}">
    <meta property="og:description" content="${esc(page.description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:site_name" content="Nyxelium">
    <meta property="og:image" content="${socialCard.url}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="${socialCard.w}">
    <meta property="og:image:height" content="${socialCard.h}">
    <meta property="og:image:alt" content="${esc(t.socialAlt)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(page.ogTitle)}">
    <meta name="twitter:description" content="${esc(page.twitterDescription ?? page.description)}">
    <meta name="twitter:image" content="${socialCard.url}">
    <meta name="twitter:image:alt" content="${esc(t.socialAlt)}">
    <link rel="canonical" href="${canonical}">${alternateLinks(page)}

    <link rel="icon" type="image/svg+xml" href="assets/img/favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500;700&amp;display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/guides.css">

    <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
    </script>
</head>

<body class="guide-page">
    <a class="skip-link" href="#article">${t.skip}</a>

    <header class="site-header">
        <a class="header-brand" href="index.html"><span class="mark" aria-hidden="true"></span>NYXELIUM</a>
        <a class="header-back" href="guides.html">${t.back}</a>
        <nav class="header-nav" aria-label="Primary">
            <a href="index.html#apps">${t.navApps}</a>
            <a href="guides.html">${t.navGuides}</a>
        </nav>
        <a class="header-cta" href="index.html#apps">${t.cta} <span aria-hidden="true">→</span></a>
    </header>

    <main>
        <section class="guide-hero">
            <div class="guide-hero-copy">
                <p class="guide-kicker">${esc(page.kicker)}</p>
                <h1 class="guide-title">${page.headline}</h1>
                <p class="guide-deck">${page.deck}</p>${languageSwitch(page, t)}
            </div>
            <aside class="guide-hero-aside" aria-label="${esc(t.asideLabel)}">
                <div class="guide-product">
                    <img src="${logo.src}" width="${logo.w}" height="${logo.h}" alt="${esc(t.logoAlt)}" decoding="async">
                    <div>
                        <span class="guide-label">${esc(page.aside.label)}</span>
                        <strong>${page.aside.strong}</strong>
                        <p>${page.aside.text}</p>
                    </div>
                </div>
                <ul class="guide-facts">
${page.aside.facts.map((fact) => `                    <li>${fact}</li>`).join('\n')}
                </ul>
            </aside>
        </section>

        <div id="article" class="article-shell">
            <aside class="article-rail" aria-label="${esc(t.railLabel)}">
                <div class="article-rail-inner">
                    <p class="guide-label">${t.rail}</p>
                    <nav>
${page.sections.map((section) => `                        <a href="#${section.id}">${section.nav}</a>`).join('\n')}
                        <a href="#answers">${page.faqNav}</a>
                    </nav>
                </div>
            </aside>

            <article class="article-body">
${page.sections
  .map(
    (section) => `                <section id="${section.id}" class="article-section">
                    <p class="guide-label">${esc(section.label)}</p>
                    <h2>${section.title}</h2>
${indent(section.body, 20)}
                </section>`,
  )
  .join('\n\n')}

                <section id="answers" class="article-section">
                    <p class="guide-label">${esc(page.faqLabel)}</p>
                    <h2>${page.faqHeading}</h2>
                    <div class="quick-answers">
${page.faqs
  .map(
    ([question, answer]) => `                        <div class="quick-answer">
                            <strong>${esc(question)}</strong>
                            <p>${esc(answer)}</p>
                        </div>`,
  )
  .join('\n')}
                    </div>
                </section>

                <aside class="related-guides" aria-label="${esc(t.relatedLabel)}">
                    <span class="guide-label">${t.keepReading}</span>
                    <div class="related-guide-grid">
${page.related
  .map(
    ([file, label]) => `                        <a href="${file}"><strong>${label}</strong><span aria-hidden="true">→</span></a>`,
  )
  .join('\n')}
                    </div>
                </aside>

                <aside class="product-callout">
                    <img src="${logo.src}" width="${logo.w}" height="${logo.h}" alt="" loading="lazy" decoding="async">
                    <div>
                        <span class="guide-label">${esc(callout.label)}</span>
                        <strong>${callout.strong}</strong>
                        <p>${callout.text}</p>
                    </div>
                    <a class="btn btn-accent btn-sm" href="${callout.href}">${callout.cta} →</a>
                </aside>
            </article>
        </div>
    </main>

    <footer class="guide-footer">
        <div class="footer-bottom">
            <span class="footer-copy"><span class="mark" aria-hidden="true"></span>© 2026 NYXELIUM</span>
            <div class="footer-legal">
                <a href="guides.html">${t.footerGuides}</a>
                <a href="index.html">${t.footerHome}</a>
                <a href="about.html">${t.footerAbout}</a>
            </div>
            <span>${t.reviewedLabel}</span>
        </div>
    </footer>

    <script src="assets/js/main.js" defer></script>
</body>

</html>
`;
}
