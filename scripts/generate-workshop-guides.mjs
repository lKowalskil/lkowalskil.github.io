/* ═══════════════════════════════════════════════════════════
   Nyxelium Workshop — generates the non-product guides.

   Companion to generate-seo-guides.mjs, which generates the
   app-led guides. These pages cover the tools around the work
   (GPUs, Windows, developer setup, devices) rather than the
   apps themselves, so they carry a studio callout instead of a
   Play Store one.

   Run:  node scripts/generate-workshop-guides.mjs
   Then: node scripts/validate-seo.mjs
   ═══════════════════════════════════════════════════════════ */

import { writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { render } from './workshop/render.mjs';
import { gpuGuides } from './workshop/guides-gpu.mjs';
import { systemGuides } from './workshop/guides-system.mjs';
import { devGuides } from './workshop/guides-dev.mjs';
import { shipGuides } from './workshop/guides-ship.mjs';
import { translatedGuides } from './workshop/guides-i18n.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const pages = [...gpuGuides, ...systemGuides, ...devGuides, ...shipGuides, ...translatedGuides];

/* Guides published in more than one language. Every page in a group
   links to every other, including itself, which is what hreflang
   reciprocity requires. */
const alternateGroups = [
  [
    { hreflang: 'en', file: 'dlss-5-neural-rendering-guide.html' },
    { hreflang: 'ru', file: 'dlss-5-neural-rendering-guide-ru.html' },
    { hreflang: 'de', file: 'dlss-5-neural-rendering-guide-de.html' },
  ],
  [
    { hreflang: 'en', file: 'run-local-llm-offline-guide.html' },
    { hreflang: 'ru', file: 'run-local-llm-offline-guide-ru.html' },
    { hreflang: 'es', file: 'run-local-llm-offline-guide-es.html' },
  ],
];

const byFile = new Map(pages.map((page) => [page.file, page]));

for (const group of alternateGroups) {
  for (const { file } of group) {
    const page = byFile.get(file);
    if (!page) throw new Error(`alternate group references a missing page: ${file}`);
    page.alternates = group;
  }
}

/* Fail loudly rather than quietly overwriting one guide with another. */
const seen = new Set();
for (const page of pages) {
  if (seen.has(page.file)) throw new Error(`duplicate output file: ${page.file}`);
  seen.add(page.file);
}

for (const page of pages) {
  await writeFile(resolve(root, page.file), render(page), 'utf8');
}

const localised = pages.filter((page) => (page.lang ?? 'en') !== 'en').length;
console.log(
  `Generated ${pages.length} workshop guides (${pages.length - localised} English, ${localised} translated).`,
);
