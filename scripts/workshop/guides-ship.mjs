/* Workshop cluster 4 — shipping a site, containers, and Android devices. */

export const shipGuides = [
  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'deploy-static-site-github-pages.html',
    kicker: 'WORKSHOP—13 · SHIPPING · 10 MIN READ',
    title: 'Deploy a Static Site on GitHub Pages Properly · Nyxelium',
    ogTitle: 'Deploy a Static Site on GitHub Pages, Properly',
    description:
      'The three GitHub Pages deployment models, custom domains and HTTPS, the SEO baseline every static site needs, and when to move to another host instead.',
    twitterDescription:
      'GitHub Pages from first push to custom domain, with the SEO baseline most static sites skip.',
    keywords:
      'GitHub Pages deploy, custom domain GitHub Pages, GitHub Actions Pages workflow, static site SEO, canonical URL sitemap robots, Cloudflare Pages alternative',
    articleSection: 'Shipping',
    audience: 'Developers publishing a personal or project site',
    proficiency: 'Beginner',
    headline: 'A static site on GitHub Pages, set up like you mean to keep it.',
    deck: 'Pushing HTML to a repository is five minutes. Getting a custom domain with working HTTPS, a build that deploys itself, and the metadata that decides whether search engines index any of it takes an afternoon — once. This is that afternoon, in order.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Free, and durable',
      text: 'No server, no runtime, no dependency that expires. The failure modes are all in configuration.',
      facts: [
        'THREE DEPLOY MODELS',
        'CUSTOM DOMAIN + HTTPS',
        'NINE-POINT SEO BASELINE',
        'WHEN TO MOVE HOST',
      ],
    },
    howTo: {
      name: 'Deploy a static site to GitHub Pages with a custom domain',
      description:
        'Publish a static site from a GitHub repository, attach a custom domain, and enable HTTPS.',
      totalTime: 'PT60M',
      anchor: 'models',
      tools: ['A GitHub repository', 'A domain name with DNS access'],
      steps: [
        ['Create the repository', 'Create a repository containing your static files, with an index.html at the root of the published directory.'],
        ['Choose a deployment source', 'In repository settings, publish from a branch, from a docs folder, or from a GitHub Actions workflow.'],
        ['Verify the default URL', 'Confirm the site loads on the github.io address before adding a domain.'],
        ['Point DNS at GitHub', 'Add the GitHub Pages A records for an apex domain, or a CNAME record for a subdomain.'],
        ['Set the custom domain', 'Enter the domain in the Pages settings so the CNAME file is written to the repository.'],
        ['Enforce HTTPS', 'Wait for the certificate to be issued, then enable Enforce HTTPS.'],
      ],
    },
    sections: [
      {
        id: 'what',
        nav: 'What Pages is',
        label: '01 · THE PLATFORM',
        title: 'Static files, served fast, with no server behind them.',
        body: `
<p class="lede">GitHub Pages serves files from a repository over a CDN. There is no runtime, which is a limitation and the entire reason it stays up without maintenance.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Works</th><th>Does not work</th></tr>
    </thead>
    <tbody>
      <tr><td>HTML, CSS, JavaScript, images, fonts, downloads</td><td>Server-side code of any kind</td></tr>
      <tr><td>Static site generators, built before deployment</td><td>Databases, sessions, server-side authentication</td></tr>
      <tr><td>Client-side applications calling external APIs</td><td>Form handling without a third-party endpoint</td></tr>
      <tr><td>Custom domains with automatic HTTPS</td><td>Custom response headers or redirect rules</td></tr>
    </tbody>
  </table>
</div>
<p><strong>That last row is the one that catches people.</strong> You cannot set cache-control, security headers or server-side redirects on Pages. If you need a content security policy, it goes in a meta tag; if you need redirects, they are HTML pages with a meta refresh and a canonical link. Both work; neither is as clean as a host that lets you write configuration.</p>
<p>Practical limits worth knowing: repositories are expected to stay under roughly a gigabyte, published sites under about the same, with a soft bandwidth allowance and a build limit per hour. A normal documentation or portfolio site is nowhere near any of them.</p>`,
      },
      {
        id: 'models',
        nav: 'Three deploy models',
        label: '02 · DEPLOYMENT',
        title: 'Branch, folder, or workflow. Pick by what builds your site.',
        body: `
<h3>1. Publish from a branch</h3>
<p>The simplest model: the repository contains the finished HTML, and Pages serves the branch root. Nothing builds, so nothing can fail to build. This is the right choice for hand-written sites and the reason plenty of small sites have run untouched for years.</p>
<h3>2. Publish from a /docs folder</h3>
<p>The same idea, with the site in a subdirectory so it can live beside source code in one repository. Useful for a project that ships documentation alongside its code.</p>
<h3>3. Publish from a GitHub Actions workflow</h3>
<p>Required for anything that needs a build step — a static site generator, a bundler, a template engine. The workflow builds and uploads an artefact, and Pages deploys it.</p>
<div class="cmd">
  <div class="cmd-head">.GITHUB/WORKFLOWS/DEPLOY.YML</div>
  <pre><code>name: Deploy to Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4</code></pre>
</div>
<div class="note">
  <p><strong>Do not add a build step you do not need.</strong> A workflow is another dependency that can break on a Tuesday because an action deprecated a version. If your site is HTML and CSS, publish the branch directly and keep the moving parts at zero.</p>
</div>`,
      },
      {
        id: 'domain',
        nav: 'Custom domain',
        label: '03 · DOMAIN AND HTTPS',
        title: 'DNS records, the CNAME file, and the certificate.',
        body: `
<p class="lede">Two things have to agree: your DNS points at GitHub, and GitHub knows which domain to answer for. Getting one without the other is the usual reason a domain shows a 404 for a day.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Domain shape</th><th>Record type</th><th>Points to</th></tr>
    </thead>
    <tbody>
      <tr><td>Apex, example.com</td><td>Four A records (and AAAA for IPv6)</td><td>The GitHub Pages IP addresses listed in the current documentation</td></tr>
      <tr><td>Subdomain, www.example.com</td><td>CNAME</td><td>yourusername.github.io</td></tr>
      <tr><td>Apex on a provider with flattening</td><td>ALIAS or ANAME</td><td>yourusername.github.io</td></tr>
    </tbody>
  </table>
</div>
<h3>The order that avoids a broken day</h3>
<ul>
  <li><strong>Add the DNS records first</strong> and wait for propagation. Check with <code>nslookup example.com</code> before touching GitHub.</li>
  <li><strong>Then set the custom domain</strong> in the repository Pages settings. GitHub writes a <code>CNAME</code> file into the repository — leave it there, and do not let a build step overwrite it.</li>
  <li><strong>Wait for the certificate.</strong> It can take up to a day. Do not enable Enforce HTTPS until GitHub reports the certificate is issued, or you will lock the site behind a protocol it cannot serve yet.</li>
  <li><strong>Pick one canonical host</strong> — apex or www — and make sure the other redirects to it. GitHub handles this once both are configured, and your canonical tags must match your choice.</li>
</ul>
<div class="note note-warn">
  <p><strong>If a build step wipes the CNAME file, the domain silently detaches.</strong> Generators that clean the output directory are the usual culprit. Either commit the file into the source that gets copied, or configure the generator to emit it.</p>
</div>`,
      },
      {
        id: 'seo',
        nav: 'The SEO baseline',
        label: '04 · BEING FOUND',
        title: 'Nine things every static site needs before it can rank.',
        body: `
<p class="lede">A static site has no framework doing this for you. Each item is a line of HTML or a small file, and skipping them is why a perfectly good site gets no traffic.</p>
<ul>
  <li><strong>A unique title and meta description per page.</strong> Roughly 50 to 60 characters for the title, 120 to 160 for the description. Duplicates across pages actively hurt.</li>
  <li><strong>A canonical link on every page</strong>, absolute, matching the host you chose. This is what prevents the apex, the www and the github.io address being treated as three sites.</li>
  <li><strong>An XML sitemap</strong>, listing exactly your indexable pages and nothing else, referenced from robots.txt.</li>
  <li><strong>A robots.txt</strong> that allows crawling and declares the sitemap by absolute URL.</li>
  <li><strong>Open Graph and Twitter card tags</strong> with an absolute image URL. This is what decides whether a shared link looks like a page or like a bare string.</li>
  <li><strong>Structured data</strong> in JSON-LD. Article, FAQPage and BreadcrumbList are the three that most content sites can genuinely justify.</li>
  <li><strong>Exactly one h1 per page</strong>, describing that page rather than the site.</li>
  <li><strong>A real 404 page</strong> — Pages serves <code>404.html</code> from the root automatically.</li>
  <li><strong>Internal links.</strong> An orphan page that nothing links to is a page search engines will find last and value least.</li>
</ul>
<div class="cmd">
  <div class="cmd-head">HEAD · THE MINIMUM PER PAGE</div>
  <pre><code>&lt;title&gt;Page title, distinct from every other page&lt;/title&gt;
&lt;meta name="description" content="One sentence that would make someone click."&gt;
&lt;link rel="canonical" href="https://example.com/page.html"&gt;
&lt;meta property="og:title" content="Page title"&gt;
&lt;meta property="og:description" content="Same sentence, roughly."&gt;
&lt;meta property="og:url" content="https://example.com/page.html"&gt;
&lt;meta property="og:image" content="https://example.com/card.png"&gt;
&lt;meta name="twitter:card" content="summary_large_image"&gt;</code></pre>
</div>
<div class="note note-good">
  <p><strong>Automate the check.</strong> A short script that verifies every page has a unique title, a correct canonical, a sitemap entry and no broken internal links catches the mistakes that are invisible in a browser. This site runs exactly that on every change, and it has caught more problems than any manual review.</p>
</div>`,
      },
      {
        id: 'performance',
        nav: 'Performance',
        label: '05 · PERFORMANCE',
        title: 'What you can control when you cannot set headers.',
        body: `
<p class="lede">You do not control caching or compression on Pages, so performance work happens entirely in the documents themselves.</p>
<ul>
  <li><strong>Serve modern image formats.</strong> WebP or AVIF, with dimensions on every image element so the layout does not shift while they load.</li>
  <li><strong>Set width and height on every image.</strong> The cheapest fix for layout shift there is, and it costs two attributes.</li>
  <li><strong>Lazy-load anything below the fold</strong> with <code>loading="lazy"</code>, and leave above-the-fold images eager.</li>
  <li><strong>Preconnect to font hosts</strong>, use <code>display=swap</code>, and load only the weights you actually use. Fonts are usually the largest render-blocking cost on a simple site.</li>
  <li><strong>Inline small CSS, defer all JavaScript.</strong> On a static site, most scripts have no reason to block rendering.</li>
  <li><strong>Avoid third-party embeds.</strong> One analytics script and one embedded video can outweigh your entire page.</li>
  <li><strong>Measure on a throttled connection.</strong> Lighthouse on a fast desktop connection tells you almost nothing about the visitor on mobile data.</li>
</ul>
<div class="note">
  <p><strong>Put a content security policy in a meta tag.</strong> Since you cannot send headers, <code>http-equiv="Content-Security-Policy"</code> is the available route. Restricting <code>default-src</code>, <code>object-src</code> and <code>base-uri</code> costs nothing on a static site and closes a real class of injection.</p>
</div>`,
      },
      {
        id: 'alternatives',
        nav: 'When to move',
        label: '06 · ALTERNATIVES',
        title: 'Three hosts that solve what Pages cannot.',
        body: `
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Host</th><th>Gives you</th><th>Move when</th></tr>
    </thead>
    <tbody>
      <tr><td>Cloudflare Pages</td><td>Custom headers and redirects, edge functions, generous bandwidth, preview deployments</td><td>You need real headers, redirect rules or a small amount of server-side logic</td></tr>
      <tr><td>Netlify</td><td>Redirects, form handling, functions, split testing</td><td>You want form submissions without building a backend</td></tr>
      <tr><td>Vercel</td><td>Framework-native builds, edge rendering, image optimisation</td><td>The site stops being static and becomes an application</td></tr>
      <tr><td>A small VPS</td><td>Everything, and the responsibility for it</td><td>You need a database or long-running processes</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Do not move for performance.</strong> Pages is behind a CDN and is fast. Move when you need behaviour it structurally cannot provide — headers, redirects, or code executing on request. For a documentation site, a portfolio or a static content site, the absence of moving parts is the feature.</p>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '07 · QUICK ANSWERS',
    faqHeading: 'GitHub Pages, briefly.',
    faqs: [
      [
        'Is GitHub Pages free for a custom domain?',
        'Yes. Custom domains and automatic HTTPS certificates are included at no cost for public repositories. You pay only for the domain registration itself. Private repositories can publish Pages sites on paid plans, but the site is still publicly visible unless you use a plan with access control.',
      ],
      [
        'Why is my custom domain showing a 404?',
        'Usually one of three things: DNS has not propagated yet, the CNAME file is missing from the published output because a build step deleted it, or the domain was set in settings before the DNS records existed. Check the domain resolves with nslookup first, then confirm the CNAME file is present in the deployed branch.',
      ],
      [
        'Can I run a backend on GitHub Pages?',
        'No. Pages serves static files only, with no server-side execution, no database and no ability to set response headers. Client-side JavaScript calling an external API works fine. If you need form handling, authentication or server logic, use a host with edge functions such as Cloudflare Pages or Netlify.',
      ],
      [
        'Do I need GitHub Actions to deploy?',
        'Only if your site needs a build step. If the repository already contains finished HTML, publish directly from a branch or a docs folder and nothing can fail to build. Use an Actions workflow when a static site generator or bundler has to run first.',
      ],
      [
        'Why is my GitHub Pages site not appearing in Google?',
        'Most commonly it lacks the basics: unique titles and descriptions, an absolute canonical link on every page, an XML sitemap declared in robots.txt, and internal links so pages are not orphaned. Also verify the property in Google Search Console and confirm the canonical host matches the one you actually serve.',
      ],
    ],
    related: [
      ['git-ssh-keys-github-guide.html', 'SSH keys and signed commits for GitHub'],
      ['install-nodejs-windows-nvm.html', 'Install Node.js the way that survives version changes'],
      ['docker-desktop-alternatives-windows.html', 'Docker Desktop alternatives on Windows'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'This site is a GitHub Pages repository with no build step and an automated metadata check on every change.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'docker-desktop-alternatives-windows.html',
    kicker: 'WORKSHOP—14 · CONTAINERS · 9 MIN READ',
    title: 'Docker Desktop Alternatives on Windows · Nyxelium',
    ogTitle: 'Docker Desktop Alternatives on Windows and WSL2',
    description:
      'What Docker Desktop actually provides, four ways to replace it on Windows, a walkthrough for running the engine inside WSL2, and the migration details that bite.',
    twitterDescription:
      'Podman, Rancher Desktop or the plain engine in WSL2 — what you gain, and what you have to set up yourself.',
    keywords:
      'Docker Desktop alternative Windows, Podman Desktop, Rancher Desktop, Docker engine WSL2, rootless containers, docker compose alternative, containerd nerdctl',
    articleSection: 'Developer tooling',
    audience: 'Developers running containers on Windows',
    proficiency: 'Intermediate',
    headline: 'Containers on Windows, without Docker Desktop.',
    deck: 'People leave Docker Desktop for three reasons: licence terms at larger companies, resource use, or a preference for fewer background services. All three have good answers. This covers what you actually lose, the four replacements worth considering, and the migration details that surprise people on day two.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Check the licence',
      text: 'Docker Desktop requires a paid subscription above a company size and revenue threshold. Verify the current terms yourself.',
      facts: [
        'PODMAN · RANCHER · WSL2',
        'ENGINE-IN-WSL2 WALKTHROUGH',
        'MIGRATION CHECKLIST',
        'WHEN TO STAY PUT',
      ],
    },
    sections: [
      {
        id: 'what-you-lose',
        nav: 'What Desktop provides',
        label: '01 · THE BASELINE',
        title: 'Know what you are replacing before you replace it.',
        body: `
<p class="lede">Docker Desktop is not just the engine. It is a bundle, and the parts you never think about are the ones you have to reproduce.</p>
<ul>
  <li><strong>A managed Linux VM</strong> — on Windows, a WSL2 distribution that hosts the daemon and is kept updated for you.</li>
  <li><strong>The engine and CLI</strong>, plus Docker Compose and BuildKit.</li>
  <li><strong>Filesystem and port integration</strong> — bind mounts from Windows paths, and published ports reachable on localhost.</li>
  <li><strong>A graphical interface</strong> for containers, images, volumes and logs.</li>
  <li><strong>Credential helpers</strong> for registry authentication, wired into the Windows credential store.</li>
  <li><strong>Optional Kubernetes</strong>, one checkbox away.</li>
  <li><strong>Automatic updates</strong> of all of the above.</li>
</ul>
<div class="note">
  <p><strong>Licensing, in one line:</strong> Docker Desktop requires a paid subscription for commercial use in organisations above a published size and revenue threshold, and is free for personal use, education and small businesses. The thresholds have changed more than once — check the current terms rather than a summary in any guide.</p>
</div>`,
      },
      {
        id: 'options',
        nav: 'The four options',
        label: '02 · THE FIELD',
        title: 'Four replacements, sorted by how much you want to configure.',
        body: `
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Option</th><th>What it is</th><th>Best for</th><th>Trade-off</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Podman Desktop</td>
        <td>Daemonless, rootless container engine with a graphical interface</td>
        <td>The closest drop-in replacement, with a real GUI and a Docker-compatible CLI</td>
        <td>Rootless has genuine differences: low ports, some volume behaviour, a few compose edge cases</td>
      </tr>
      <tr>
        <td>Rancher Desktop</td>
        <td>Open-source desktop app over containerd or the Docker engine, with Kubernetes built in</td>
        <td>Anyone who wants local Kubernetes without extra setup</td>
        <td>Heavier than the alternatives; Kubernetes is the point rather than an extra</td>
      </tr>
      <tr>
        <td>Docker engine in WSL2</td>
        <td>The engine installed directly inside a Linux distribution</td>
        <td>Developers already living in WSL2 who want the lightest possible setup</td>
        <td>No GUI, and you wire up startup, port access and Windows path mounts yourself</td>
      </tr>
      <tr>
        <td>containerd with nerdctl</td>
        <td>The underlying runtime plus a Docker-compatible CLI</td>
        <td>Matching a production Kubernetes runtime exactly</td>
        <td>The least hand-holding of the four</td>
      </tr>
    </tbody>
  </table>
</div>
<p><strong>For most people the choice is between the first and the third:</strong> Podman Desktop if you want something that feels like what you had, or the plain engine in WSL2 if you want the smallest number of moving parts and already work in a Linux shell all day.</p>`,
      },
      {
        id: 'wsl-engine',
        nav: 'Engine inside WSL2',
        label: '03 · THE LEAN ROUTE',
        title: 'Install the Docker engine directly in a WSL2 distribution.',
        body: `
<p class="lede">No desktop application, no background service on Windows, and the engine runs where your code already lives. Around ten minutes to set up.</p>
<div class="cmd">
  <div class="cmd-head">BASH · INSIDE A WSL2 UBUNTU DISTRIBUTION</div>
  <pre><code># Install the engine and the compose plugin from Docker's repository
curl -fsSL https://get.docker.com | sh

# Run docker without sudo
sudo usermod -aG docker $USER

# Start it, and have it start with the distribution
sudo service docker start
echo 'sudo service docker start' &gt;&gt; ~/.bashrc

# Verify
docker run --rm hello-world
docker compose version</code></pre>
</div>
<h3>Details that matter afterwards</h3>
<ul>
  <li><strong>Enable systemd</strong> in <code>/etc/wsl.conf</code> if you want the daemon managed properly rather than started from your shell profile. Restart with <code>wsl --shutdown</code> afterwards.</li>
  <li><strong>Keep project files in the Linux filesystem.</strong> Bind-mounting from <code>/mnt/c</code> is slow for the same reason every other cross-boundary operation is slow.</li>
  <li><strong>Published ports</strong> are reachable from Windows on localhost with mirrored networking enabled, which the <a href="wsl2-setup-windows-guide.html">WSL2 guide</a> covers.</li>
  <li><strong>Your editor still works.</strong> VS Code connected to WSL sees the daemon exactly as a Linux machine would.</li>
</ul>`,
      },
      {
        id: 'podman',
        nav: 'Podman on Windows',
        label: '04 · THE DROP-IN',
        title: 'Podman, if you want the graphical experience back.',
        body: `
<p class="lede">Podman is daemonless and rootless by default, which is a security improvement and the source of every difference you will notice.</p>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · PODMAN</div>
  <pre><code>winget install RedHat.Podman
# Or install Podman Desktop for the graphical interface

# Create and start the backing Linux machine
podman machine init
podman machine start

podman run --rm hello-world

# The Docker-compatible alias, if you want muscle memory to keep working
Set-Alias docker podman</code></pre>
</div>
<h3>The four differences that catch people</h3>
<ul>
  <li><strong>Ports below 1024.</strong> Rootless containers cannot bind them directly. Publish to a high port and map it, or use the documented privileged-port configuration.</li>
  <li><strong>File ownership in volumes.</strong> User namespace mapping means a file written in a container may not have the UID you expect on the host. The <code>:U</code> and <code>:Z</code> volume options exist for exactly this.</li>
  <li><strong>Compose.</strong> Podman supports Compose files through <code>podman compose</code> or a socket-compatible mode, but a few edge cases in networking and dependency ordering behave differently. Test the whole stack before switching a team.</li>
  <li><strong>Pods are first class.</strong> Podman can group containers into a pod that shares a network namespace, which is closer to Kubernetes semantics and genuinely useful once you know it exists.</li>
</ul>
<div class="note">
  <p><strong>A Docker socket compatibility layer exists</strong> for tools that talk to the Docker API directly, such as Testcontainers or some IDE integrations. Enable it before concluding that a tool is incompatible.</p>
</div>`,
      },
      {
        id: 'migration',
        nav: 'Migration checklist',
        label: '05 · MIGRATION',
        title: 'Seven things to check before you uninstall.',
        body: `
<div class="step-grid">
  <div class="step">
    <span class="step-num">CHECK—01</span>
    <strong>Save your volumes</strong>
    <p>Named volumes do not migrate between engines. Export any database data you care about before removing anything.</p>
  </div>
  <div class="step">
    <span class="step-num">CHECK—02</span>
    <strong>Registry credentials</strong>
    <p>Private registry logins live in the Desktop credential helper. Have the credentials to hand before you lose access to it.</p>
  </div>
  <div class="step">
    <span class="step-num">CHECK—03</span>
    <strong>Compose files</strong>
    <p>Run the whole stack on the new engine before committing. Networking and dependency ordering are where differences show.</p>
  </div>
  <div class="step">
    <span class="step-num">CHECK—04</span>
    <strong>Tools that call the socket</strong>
    <p>Testcontainers, IDE integrations and some CI runners talk to the Docker API directly. Point them at the compatibility socket.</p>
  </div>
  <div class="step">
    <span class="step-num">CHECK—05</span>
    <strong>Multi-architecture builds</strong>
    <p>If you build ARM images on x86, verify the emulation setup exists on the new engine before you need it.</p>
  </div>
  <div class="step">
    <span class="step-num">CHECK—06</span>
    <strong>Kubernetes</strong>
    <p>If you used the Desktop checkbox, decide on a replacement: Rancher Desktop, kind, k3d or minikube.</p>
  </div>
  <div class="step">
    <span class="step-num">CHECK—07</span>
    <strong>Uninstall properly</strong>
    <p>Remove Desktop through Windows Apps, then clean up its WSL distributions so they stop consuming disk.</p>
  </div>
</div>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · REMOVE THE LEFTOVER DISTRIBUTIONS</div>
  <pre><code>wsl -l -v
wsl --unregister docker-desktop
wsl --unregister docker-desktop-data</code></pre>
</div>
<div class="note note-warn">
  <p><strong>Unregistering deletes everything in that distribution.</strong> Any volume you have not exported is gone. Do the export first, and confirm you can read it back.</p>
</div>`,
      },
      {
        id: 'staying',
        nav: 'When to stay',
        label: '06 · THE HONEST CASE',
        title: 'Three situations where Docker Desktop is still the right answer.',
        body: `
<ul>
  <li><strong>A team where not everyone is a container specialist.</strong> The graphical interface, the automatic updates and the single supported path are worth real money in support time. Replacing it means someone owns the setup documentation.</li>
  <li><strong>Personal use, where it is free.</strong> If you are under the licensing threshold, the licence argument does not apply to you at all, and the alternatives are a preference rather than a requirement.</li>
  <li><strong>A workflow that depends on the ecosystem.</strong> Extensions, Docker Scout, and tight integration with tooling that expects Desktop specifically.</li>
</ul>
<p><strong>The resource argument is weaker than it used to be.</strong> Modern Desktop releases idle far more cheaply than the versions that gave it a reputation, and a properly configured <code>.wslconfig</code> caps its memory the same way it caps everything else in WSL. Measure your own machine before switching on that basis alone.</p>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '07 · QUICK ANSWERS',
    faqHeading: 'Containers without Docker Desktop, briefly.',
    faqs: [
      [
        'Do I need a licence for Docker Desktop?',
        'Docker Desktop is free for personal use, education and small businesses, and requires a paid subscription for commercial use in organisations above a published size and revenue threshold. Those thresholds have changed more than once, so check the current terms directly rather than relying on any summary.',
      ],
      [
        'What is the closest alternative to Docker Desktop?',
        'Podman Desktop. It provides a graphical interface, a Docker-compatible command line and a socket compatibility layer for tools that call the Docker API. The main differences come from being rootless: binding ports below 1024, volume file ownership, and a few Compose edge cases.',
      ],
      [
        'Can I just install Docker inside WSL2?',
        'Yes, and it is the lightest option. Install the engine and the Compose plugin inside a WSL2 distribution, add your user to the docker group, and start the service. You lose the graphical interface and automatic updates, and you configure startup and port access yourself.',
      ],
      [
        'Will my docker-compose files work with Podman?',
        'Mostly. Podman supports Compose files through podman compose or a Docker-compatible socket, but networking behaviour and dependency ordering have edge cases that differ. Run your full stack on the new engine before switching a team, rather than testing a single container.',
      ],
      [
        'How do I move my volumes to a new container engine?',
        'You export and re-import the data rather than moving the volume. Run a temporary container that mounts the volume, write its contents to an archive on the host, then restore it into a new volume on the new engine. Named volumes are not portable between engines directly.',
      ],
    ],
    related: [
      ['wsl2-setup-windows-guide.html', 'Set up WSL2 properly on Windows'],
      ['python-virtual-environment-guide.html', 'Python environments without the mess'],
      ['deploy-static-site-github-pages.html', 'Deploy a static site on GitHub Pages'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'A preference for fewer background services runs through everything here, including the apps.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'android-adb-setup-guide.html',
    kicker: 'WORKSHOP—15 · ANDROID DEVICES · 9 MIN READ',
    title: 'Set Up ADB on Windows and Actually Use It · Nyxelium',
    ogTitle: 'Set Up ADB on Windows and Actually Use It',
    description:
      'Install platform-tools without Android Studio, enable USB and wireless debugging, learn the commands worth knowing, and fix the connection errors that waste the most time.',
    twitterDescription:
      'ADB from install to wireless debugging, with the fifteen commands that are actually useful.',
    keywords:
      'ADB setup Windows, platform-tools install, USB debugging Android, adb wireless debugging pair, adb logcat, adb pull push, device unauthorized fix',
    articleSection: 'Android devices',
    audience: 'Android users and developers',
    proficiency: 'Intermediate',
    headline: 'ADB, installed properly and used for something.',
    deck: 'Most ADB guides stop at &ldquo;the device appears in the list&rdquo;. This one covers the install without a full IDE, wireless debugging, the fifteen commands that are genuinely worth remembering, and the connection failures that account for nearly all of the frustration.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Platform-tools only',
      text: 'You do not need Android Studio. The tool is a 15 MB download that needs no installer.',
      facts: [
        'PLATFORM-TOOLS ONLY',
        'WIRELESS DEBUGGING',
        'FIFTEEN USEFUL COMMANDS',
        'SIX CONNECTION FIXES',
      ],
    },
    howTo: {
      name: 'Set up ADB on Windows',
      description:
        'Install the Android platform tools, enable USB debugging on the device, and authorise the connection.',
      totalTime: 'PT15M',
      anchor: 'install',
      tools: ['Android SDK platform-tools', 'A USB data cable'],
      steps: [
        ['Download platform-tools', 'Download the Android SDK platform-tools package from the official developer site and extract it to a permanent folder.'],
        ['Add it to PATH', 'Add the extracted folder to your user PATH so adb is available from any terminal.'],
        ['Enable developer options', 'Tap the build number seven times in About phone to unlock developer options.'],
        ['Enable USB debugging', 'Turn on USB debugging in developer options.'],
        ['Connect and authorise', 'Connect the device with a data cable and accept the authorisation prompt on the phone screen.'],
        ['Verify', 'Run adb devices and confirm the device is listed as device rather than unauthorized.'],
      ],
    },
    sections: [
      {
        id: 'what',
        nav: 'What ADB is',
        label: '01 · THE TOOL',
        title: 'A debug bridge, not a rooting tool.',
        body: `
<p class="lede">ADB talks to a debug service on your phone over USB or the network. It does not grant root, and it does not require an unlocked bootloader.</p>
<p>Three components: the client on your computer, a server process that brokers connections, and a daemon on the device. Most confusing failures are the server on your machine, not the phone.</p>
<p><strong>What you can genuinely do with it:</strong></p>
<ul>
  <li>Install and uninstall applications, including ones not on the store.</li>
  <li>Read live system logs — the single best tool for understanding why an app misbehaves.</li>
  <li>Copy files in both directions without the file-transfer mode.</li>
  <li>Record the screen and take screenshots at native resolution.</li>
  <li>Inspect battery, network and package state.</li>
  <li>Disable preinstalled applications for your user, without root, with the caveats in section five.</li>
</ul>
<div class="note">
  <p><strong>Turn USB debugging off when you are done.</strong> It is a debug interface. Leaving it enabled on a phone you carry around is a small, real increase in what someone with physical access can do.</p>
</div>`,
      },
      {
        id: 'install',
        nav: 'Install it',
        label: '02 · INSTALLATION',
        title: 'Platform-tools, PATH, and nothing else.',
        body: `
<p class="lede">Skip the packages that bundle ADB with a driver installer of unknown origin. The official archive is small and needs no installation.</p>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · INSTALL AND PATH</div>
  <pre><code># Simplest route
winget install Google.PlatformTools

# Or extract the official platform-tools zip yourself, then add it to PATH
$tools = "C:\\Android\\platform-tools"
[Environment]::SetEnvironmentVariable(
  "Path",
  [Environment]::GetEnvironmentVariable("Path", "User") + ";$tools",
  "User")

# New terminal, then verify
adb version</code></pre>
</div>
<h3>On the phone</h3>
<ul>
  <li><strong>Settings, About phone, tap Build number seven times.</strong> Developer options appear, usually under System.</li>
  <li><strong>Enable USB debugging.</strong> On some manufacturers you must also enable an install-via-USB option before ADB can install packages.</li>
  <li><strong>Use a data cable.</strong> Charge-only cables are the single most common cause of a device that never appears. If nothing is detected, change the cable before anything else.</li>
  <li><strong>Accept the prompt on the phone.</strong> Tick &ldquo;always allow from this computer&rdquo; unless it is a machine you do not control.</li>
</ul>
<div class="cmd">
  <div class="cmd-head">SHELL · FIRST CONTACT</div>
  <pre><code>adb devices -l
# List of devices attached
# R58N12ABCDE  device  product:... model:SM_G991B</code></pre>
</div>
<p>If the state says <code>unauthorized</code>, the prompt was not accepted. If it says <code>offline</code>, the daemon needs restarting. Both are covered in the last section.</p>`,
      },
      {
        id: 'wireless',
        nav: 'Wireless debugging',
        label: '03 · OVER THE NETWORK',
        title: 'Wireless debugging, which is better than it sounds.',
        body: `
<p class="lede">On Android 11 and later, wireless debugging pairs with a code and does not require a cable at all. Once set up it is the more pleasant way to work.</p>
<div class="cmd">
  <div class="cmd-head">SHELL · PAIR AND CONNECT (ANDROID 11+)</div>
  <pre><code># On the phone: Developer options, Wireless debugging, Pair device with pairing code
adb pair 192.168.1.50:41234
# Enter the six-digit code shown on the phone

# Then connect, using the port from the wireless debugging screen
adb connect 192.168.1.50:5555
adb devices</code></pre>
</div>
<div class="cmd">
  <div class="cmd-head">SHELL · THE OLDER ROUTE, VIA USB ONCE</div>
  <pre><code>adb tcpip 5555
# Unplug the cable, then
adb connect 192.168.1.50:5555</code></pre>
</div>
<ul>
  <li><strong>Both devices must be on the same network</strong>, and client isolation on guest Wi-Fi will block it silently.</li>
  <li><strong>The pairing port changes</strong> each time the pairing dialog opens. Read it from the screen rather than reusing an old one.</li>
  <li><strong>The connection drops</strong> when the phone sleeps deeply or changes network. <code>adb connect</code> again; nothing is broken.</li>
  <li><strong>Do not leave it enabled on an untrusted network.</strong> Wireless debugging is authenticated, but it is still an open debug interface.</li>
</ul>`,
      },
      {
        id: 'commands',
        nav: 'Useful commands',
        label: '04 · THE COMMANDS',
        title: 'Fifteen that earn their place.',
        body: `
<div class="cmd">
  <div class="cmd-head">SHELL · PACKAGES AND FILES</div>
  <pre><code># Install, replacing an existing version and keeping data
adb install -r app.apk

# Install a split APK bundle
adb install-multiple base.apk config.arm64_v8a.apk

# Remove an app
adb uninstall com.example.app

# List installed packages, filtered
adb shell pm list packages | findstr example

# Copy a file off the device, and onto it
adb pull /sdcard/Download/report.pdf .
adb push localfile.txt /sdcard/Download/</code></pre>
</div>
<div class="cmd">
  <div class="cmd-head">SHELL · DIAGNOSTICS</div>
  <pre><code># Live log, filtered to one app's process
adb logcat --pid=$(adb shell pidof -s com.example.app)

# Clear the buffer, then watch only errors
adb logcat -c
adb logcat *:E

# Battery, network and package state
adb shell dumpsys battery
adb shell dumpsys package com.example.app

# A full bug report, which is what you attach to an issue
adb bugreport report.zip</code></pre>
</div>
<div class="cmd">
  <div class="cmd-head">SHELL · CAPTURE AND CONTROL</div>
  <pre><code># Screenshot straight to your machine
adb exec-out screencap -p &gt; screen.png

# Record the screen, then pull it
adb shell screenrecord /sdcard/demo.mp4
adb pull /sdcard/demo.mp4

# An interactive shell on the device
adb shell

# Restart the daemon when things get strange
adb kill-server
adb start-server</code></pre>
</div>
<div class="note note-good">
  <p><strong>If you learn one command, make it logcat filtered by process.</strong> Watching an application&rsquo;s own log while you reproduce a problem answers more questions than any amount of guessing from the outside.</p>
</div>`,
      },
      {
        id: 'debloat',
        nav: 'Disabling system apps',
        label: '05 · PREINSTALLED APPS',
        title: 'Removing manufacturer apps without root, carefully.',
        body: `
<p class="lede">ADB can uninstall a package for your user only. The system copy remains, so a factory reset restores it — which is what makes this reversible and therefore reasonable.</p>
<div class="cmd">
  <div class="cmd-head">SHELL · PER-USER REMOVAL</div>
  <pre><code># Find the exact package name first
adb shell pm list packages | findstr vendor

# Remove for the current user, keeping the system copy
adb shell pm uninstall -k --user 0 com.vendor.someapp

# Put it back
adb shell cmd package install-existing com.vendor.someapp</code></pre>
</div>
<div class="note note-warn">
  <p><strong>Do not paste a package list from a forum.</strong> Vendors ship framework components with names that look like bloatware, and removing the wrong one can break the camera, the dialler, notifications, or leave the device in a boot loop. Remove one package at a time, reboot, and use the phone normally before removing another.</p>
</div>
<h3>A safer procedure</h3>
<ul>
  <li><strong>Identify the app first.</strong> Open its settings entry on the phone and read the package name from the app info screen rather than guessing from a list.</li>
  <li><strong>Prefer disabling to removing</strong> where the option exists in Settings. Same practical effect, easier to undo.</li>
  <li><strong>Never touch anything named for the framework, the launcher, telephony, media provider or the package installer.</strong></li>
  <li><strong>Keep a list of what you removed.</strong> When something breaks a week later, this is the only way to find the cause.</li>
  <li><strong>Expect updates to restore some of them.</strong> A system update can reinstate a package you removed per user.</li>
</ul>`,
      },
      {
        id: 'troubleshooting',
        nav: 'Connection problems',
        label: '06 · TROUBLESHOOTING',
        title: 'The six failures, in order of how often they happen.',
        body: `
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Symptom</th><th>Cause</th><th>Fix</th></tr>
    </thead>
    <tbody>
      <tr><td>No devices listed at all</td><td>A charge-only cable</td><td>Swap the cable before anything else. This is most of the cases.</td></tr>
      <tr><td>Device shows as unauthorized</td><td>The authorisation prompt was not accepted</td><td>Unlock the phone, replug, accept. If no prompt appears, revoke USB debugging authorisations in developer options and retry.</td></tr>
      <tr><td>Device shows as offline</td><td>Stale daemon state</td><td>adb kill-server then adb start-server; toggle USB debugging off and on</td></tr>
      <tr><td>Detected on one machine but not another</td><td>Missing OEM USB driver on Windows</td><td>Install the manufacturer USB driver, or the Google USB driver from the SDK manager</td></tr>
      <tr><td>Wireless connect refused</td><td>Wrong port, or client isolation on the network</td><td>Reread the port from the wireless debugging screen; test on a normal network rather than guest Wi-Fi</td></tr>
      <tr><td>adb is not recognised</td><td>PATH not applied to the open terminal</td><td>Open a new terminal after changing PATH; confirm with adb version</td></tr>
    </tbody>
  </table>
</div>
<div class="cmd">
  <div class="cmd-head">SHELL · THE RESET SEQUENCE</div>
  <pre><code>adb kill-server
adb start-server
adb devices -l

# On the phone: Developer options, Revoke USB debugging authorisations
# Then replug and accept the prompt again</code></pre>
</div>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '07 · QUICK ANSWERS',
    faqHeading: 'ADB, briefly.',
    faqs: [
      [
        'Do I need Android Studio to use ADB?',
        'No. Download the Android SDK platform-tools package on its own, extract it, and add the folder to your PATH. It is a small download with no installer. Avoid third-party bundles that package ADB with driver installers of unknown origin.',
      ],
      [
        'Why does my device show as unauthorized?',
        'The authorisation prompt on the phone was not accepted. Unlock the screen, reconnect, and accept it, ticking always allow for a computer you own. If no prompt appears, use Revoke USB debugging authorisations in developer options and reconnect, then restart the ADB server.',
      ],
      [
        'Why is my phone not detected at all?',
        'Most often the cable. Many USB cables carry power but no data, and they give no indication of the difference. Swap it for a known data cable first. After that, check that USB debugging is enabled and that the manufacturer USB driver is installed on Windows.',
      ],
      [
        'Is it safe to remove system apps with ADB?',
        'It is reversible, which makes it reasonable, but it is not risk free. Removing a package for the current user leaves the system copy intact so a factory reset restores it, and cmd package install-existing brings it back immediately. The real risk is removing a framework component whose name looks like a vendor app. Remove one at a time and reboot between removals.',
      ],
      [
        'Does ADB require root or an unlocked bootloader?',
        'No. ADB is a debug interface that works on a standard, locked device with USB debugging enabled. Root grants additional capabilities inside the shell, but everything in this guide, including per-user package removal, works without it.',
      ],
    ],
    related: [
      ['android-backup-without-cloud.html', 'Back up an Android phone without the cloud'],
      ['install-flutter-windows-guide.html', 'Install Flutter and the Android SDK on Windows'],
      ['windows-11-debloat-safe-guide.html', 'Debloat Windows 11 without breaking it'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'Built and debugged with exactly these commands, on real devices rather than emulators.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'android-backup-without-cloud.html',
    kicker: 'WORKSHOP—16 · ANDROID DEVICES · 10 MIN READ',
    title: 'Back Up an Android Phone Without the Cloud · Nyxelium',
    ogTitle: 'How to Back Up an Android Phone Without the Cloud',
    description:
      'What Google backup does not cover, how to get photos and app data onto your own storage, and a monthly routine that leaves you able to restore a lost phone.',
    twitterDescription:
      'A local Android backup routine: photos, app data, messages and the things Google backup quietly skips.',
    keywords:
      'Android backup without Google, local phone backup, adb pull photos, Seedvault, export app data Android, transfer photos to PC, restore new phone',
    articleSection: 'Android devices',
    audience: 'Android users who want local copies of their data',
    proficiency: 'Beginner',
    headline: 'A local Android backup that covers what Google&rsquo;s quietly does not.',
    deck: 'Android&rsquo;s built-in backup is genuinely useful and genuinely incomplete, and the gaps are only visible when you set up a replacement phone. This is what it does not carry, how to copy the rest onto storage you control, and a monthly routine short enough that you will actually do it.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Your storage, your copy',
      text: 'Everything here lands on a disk you own. Cloud optional, never required.',
      facts: [
        'WHAT GOOGLE BACKUP SKIPS',
        'SCRIPTED ADB PULL',
        'APP DATA, HONESTLY',
        'A MONTHLY ROUTINE',
      ],
    },
    sections: [
      {
        id: 'gaps',
        nav: 'What Google misses',
        label: '01 · THE GAPS',
        title: 'The built-in backup is a good start and a poor guarantee.',
        body: `
<p class="lede">Android backup restores a remarkable amount to a new phone. The problem is that what it skips is not obvious until you are standing there with a blank device.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Data</th><th>Covered?</th><th>Notes</th></tr>
    </thead>
    <tbody>
      <tr><td>Contacts, calendar, Gmail</td><td>Yes</td><td>Account-synced rather than backed up, which is a different guarantee</td></tr>
      <tr><td>Photos and video</td><td>Only with Google Photos backup on</td><td>Subject to storage limits, and original quality is not always retained</td></tr>
      <tr><td>App list and settings</td><td>Mostly</td><td>Apps reinstall; whether their data returns depends on the app</td></tr>
      <tr><td>App internal data</td><td>Inconsistently</td><td>Apps can opt out, and many that hold important data do</td></tr>
      <tr><td>SMS and call log</td><td>Usually</td><td>Sometimes only into the same manufacturer ecosystem</td></tr>
      <tr><td>Authenticator codes</td><td>Depends entirely on the app</td><td>The single most damaging thing to lose</td></tr>
      <tr><td>Files in device storage</td><td>No</td><td>Downloads, documents, recordings, exported data</td></tr>
      <tr><td>Signal, WhatsApp and similar</td><td>Their own mechanism</td><td>Each has a separate backup with its own passphrase</td></tr>
    </tbody>
  </table>
</div>
<p><strong>The pattern:</strong> anything tied to an account comes back, anything living inside an app is at the app&rsquo;s discretion, and anything sitting in device storage is on you. That last category is where people lose photos they took before the sync was enabled.</p>`,
      },
      {
        id: 'photos',
        nav: 'Photos and files',
        label: '02 · PHOTOS AND FILES',
        title: 'The bulk of it, moved to a disk you own.',
        body: `
<p class="lede">Four routes, in rough order of how well they scale. Any of them beats not having a copy.</p>
<h3>1. USB file transfer</h3>
<p>Connect the phone, choose file transfer mode rather than charging, and copy <code>DCIM</code> and <code>Pictures</code> to your computer. Fine occasionally; slow and error-prone for tens of gigabytes.</p>
<h3>2. ADB pull, which is faster and scriptable</h3>
<div class="cmd">
  <div class="cmd-head">SHELL · PULL THE FOLDERS THAT MATTER</div>
  <pre><code>adb pull /sdcard/DCIM ./phone-backup/DCIM
adb pull /sdcard/Pictures ./phone-backup/Pictures
adb pull /sdcard/Download ./phone-backup/Download
adb pull /sdcard/Documents ./phone-backup/Documents

# See what else is taking space and worth taking
adb shell du -h -d 1 /sdcard | sort -h</code></pre>
</div>
<p>Repeatable, faster than the file transfer protocol, and easy to put in a script. The <a href="android-adb-setup-guide.html">ADB guide</a> covers the setup.</p>
<h3>3. Syncthing, for the version that keeps running</h3>
<p>Syncthing performs continuous, encrypted, peer-to-peer synchronisation between your phone and your computer with no server in the middle. Set it once and photos appear on your machine without you doing anything. <strong>Point it at a versioned folder</strong>, or it faithfully propagates a deletion — synchronisation is not backup, as the <a href="local-backup-3-2-1-guide.html">backup guide</a> explains at length.</p>
<h3>4. Straight to a USB-C drive</h3>
<p>Modern Android phones write directly to USB-C storage. For a one-off before a factory reset, this is the least fuss available: plug in, copy with the files app, unplug.</p>`,
      },
      {
        id: 'appdata',
        nav: 'App data',
        label: '03 · APP DATA',
        title: 'The honest situation, without the outdated advice.',
        body: `
<p class="lede">This is where old guides mislead. <code>adb backup</code> is deprecated, has been unreliable for years, and is ignored by most modern apps. It is not the answer.</p>
<p>What actually works, in order of preference:</p>
<ul>
  <li><strong>The app&rsquo;s own export.</strong> Any app holding data you care about should be able to write a file you keep. Notes, trackers, journals, password managers, two-factor apps and habit trackers usually have this buried in settings. <strong>Use it, and check the export actually opens.</strong></li>
  <li><strong>Manufacturer transfer tools.</strong> Samsung, Xiaomi and others provide a phone-to-phone transfer that copies more than Google backup does. Excellent for moving to a new device, useless as an ongoing backup.</li>
  <li><strong>Seedvault</strong>, if you run a custom Android build that includes it. Encrypted, local, full-system backup. Not available on a stock retail phone.</li>
  <li><strong>Root-level tools</strong> such as Neo Backup. Complete, and require root, which is its own decision with its own consequences.</li>
</ul>
<div class="note note-good">
  <p><strong>Make export a selection criterion.</strong> When choosing an app that will hold months of your data, check before you commit that it can write that data to a file you keep. An app with no export is a decision to lose everything in it eventually — which is exactly why every app on this site exports in a plain format.</p>
</div>`,
      },
      {
        id: 'messages',
        nav: 'Messages and credentials',
        label: '04 · THE SMALL, CRITICAL THINGS',
        title: 'Small files, disproportionate consequences.',
        body: `
<ul>
  <li><strong>Two-factor authenticator codes.</strong> Export them, or print the recovery codes for every account, and store them somewhere that does not require the phone. Losing the authenticator with no recovery codes locks you out of accounts permanently — this is the worst outcome on this entire page.</li>
  <li><strong>Password manager.</strong> Keep an emergency kit or an encrypted export somewhere physical. If your vault is only on a phone and in an account you cannot reach without the phone, you have a circular dependency.</li>
  <li><strong>Contacts.</strong> Export a vCard file even if they sync. Account-based sync is not a backup: deleting a contact deletes it everywhere.</li>
  <li><strong>SMS and call logs.</strong> An SMS backup app writes an XML or JSON archive you can restore anywhere, independent of manufacturer transfer tools.</li>
  <li><strong>Messaging apps.</strong> Signal and WhatsApp each have their own backup with their own passphrase or key. Set it up and write the credential down; there is no recovery path without it.</li>
  <li><strong>Wi-Fi passwords.</strong> Android can display and share a saved network as a QR code. Capture the ones you will not remember.</li>
</ul>
<div class="note note-warn">
  <p><strong>The authenticator is the one that ends badly.</strong> A lost phone with no exported two-factor secrets and no printed recovery codes means account recovery processes that take weeks, if they succeed at all. Do that one first, tonight.</p>
</div>`,
      },
      {
        id: 'routine',
        nav: 'A monthly routine',
        label: '05 · THE ROUTINE',
        title: 'Fifteen minutes, once a month.',
        body: `
<div class="step-grid">
  <div class="step">
    <span class="step-num">STEP—01</span>
    <strong>Pull media</strong>
    <p>Connect and copy DCIM, Pictures, Download and Documents to your machine, or confirm Syncthing has been running.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—02</span>
    <strong>Export the apps that matter</strong>
    <p>The three or four holding real data. Save the exports into the same dated folder as the media.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—03</span>
    <strong>Refresh contacts and messages</strong>
    <p>A vCard export and an SMS archive. Both are small and take under a minute.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—04</span>
    <strong>Fold it into your real backup</strong>
    <p>The phone folder should be inside whatever your computer already backs up, so it inherits versioning and the off-site copy.</p>
  </div>
</div>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · A DATED PULL</div>
  <pre><code>$date = Get-Date -Format "yyyy-MM-dd"
$dest = "D:\\phone-backup\\$date"
New-Item -ItemType Directory -Path $dest -Force

adb pull /sdcard/DCIM      "$dest\\DCIM"
adb pull /sdcard/Pictures  "$dest\\Pictures"
adb pull /sdcard/Download  "$dest\\Download"
adb pull /sdcard/Documents "$dest\\Documents"</code></pre>
</div>
<p>Run it, then let your normal backup take the folder off site. That is the whole system: the phone copies into the machine, and the machine is already protected.</p>`,
      },
      {
        id: 'restore',
        nav: 'Setting up a new phone',
        label: '06 · RESTORE',
        title: 'The checklist for the day it matters.',
        body: `
<p class="lede">Restoring is where you discover what you actually have. Work in this order.</p>
<ul>
  <li><strong>Two-factor first.</strong> Before anything else, restore your authenticator or use recovery codes. Everything downstream needs sign-in.</li>
  <li><strong>Password manager second.</strong> Same reason.</li>
  <li><strong>Then the account restore.</strong> Let Google or the manufacturer tool reinstall apps and settings. Do this before manual work so it does not overwrite it.</li>
  <li><strong>Restore app data from your exports.</strong> One app at a time, verifying each import rather than assuming.</li>
  <li><strong>Copy media back only if you want it on the phone.</strong> Often you do not — the archive on your computer is the copy that matters.</li>
  <li><strong>Reconnect messaging backups</strong> with the passphrases you saved.</li>
  <li><strong>Wipe the old phone properly</strong> — sign out of the account first, then factory reset, and only then sell or recycle it.</li>
</ul>
<div class="note">
  <p><strong>Test one restore before you need it.</strong> Import an export into a fresh install of the same app and confirm the data appears. Every backup on this page is a hypothesis until you have done that once.</p>
</div>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '07 · QUICK ANSWERS',
    faqHeading: 'Local Android backups, briefly.',
    faqs: [
      [
        'Does Google backup save everything on my phone?',
        'No. It reliably restores account-synced data such as contacts and calendar, and it reinstalls your apps. Whether app internal data returns depends on each app, since apps can opt out. Files in device storage such as downloads, documents and recordings are not covered, and photos are only included if Google Photos backup is enabled.',
      ],
      [
        'How do I back up Android app data without root?',
        'Use each app own export function, which is the only reliable route on a stock device. adb backup is deprecated and ignored by most modern apps. Manufacturer transfer tools copy more than Google backup during a phone-to-phone move, and Seedvault provides full encrypted local backup on custom Android builds that include it.',
      ],
      [
        'What is the fastest way to copy photos off an Android phone?',
        'adb pull is faster and more repeatable than USB file transfer, and it can be scripted into a dated folder. For an ongoing setup, Syncthing synchronises photos to your computer continuously with no server in the middle. Writing directly to a USB-C drive is the simplest one-off option.',
      ],
      [
        'What is the most important thing to back up before switching phones?',
        'Two-factor authenticator secrets and password manager access. Losing those can lock you out of accounts permanently, and no phone backup helps if you cannot sign in to restore it. Export or transfer the authenticator, and keep printed recovery codes somewhere that does not depend on the phone.',
      ],
      [
        'Is Syncthing a backup?',
        'Not on its own. It synchronises, which means a deletion on the phone propagates to your computer. Enable file versioning on the receiving folder, or treat the synced folder as a source that your real versioned backup then protects. The distinction matters exactly once, and expensively.',
      ],
    ],
    related: [
      ['local-backup-3-2-1-guide.html', 'A 3-2-1 backup you will actually run'],
      ['android-adb-setup-guide.html', 'Set up ADB and use it properly'],
      ['private-time-tracker-no-account.html', 'What no account should actually mean'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'Every app here stores its data on the device and exports it in a plain format, so this routine covers them.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },
];
