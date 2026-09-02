/* Workshop cluster 1 — GPU, upscaling and frame rate. */

export const gpuGuides = [
  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'dlss-5-neural-rendering-guide.html',
    kicker: 'WORKSHOP—01 · GPU & UPSCALING · 12 MIN READ',
    title: 'How to Install the DLSS 5 Neural Rendering Mod · Nyxelium',
    ogTitle: 'How to Install the DLSS 5 Neural Rendering Mod (2026)',
    description:
      'The safe route to the leaked DLSS 5 neural rendering build using RHI and ReShade, the real frame cost, the anti-cheat rule, and four alternatives worth trying first.',
    twitterDescription:
      'DLSS 5 neural rendering, installed without a stranger one-click exe — plus the honest performance bill.',
    keywords:
      'DLSS 5, DLSS 5 mod, neural rendering, RHI ReShade HDR Installer, RenoDX, DLSS 5 install guide, ReShade add-on, nvngx_dlssnr.dll, RTX 50 series',
    articleSection: 'GPU and upscaling',
    audience: 'PC gamers with an NVIDIA RTX GPU',
    proficiency: 'Expert',
    headline: 'DLSS 5, installed without a stranger&rsquo;s one-click .exe.',
    deck: 'A pre-release DLSS 5 neural-rendering runtime is circulating days before the official launch, mostly wrapped in Discord installers nobody should run. This is the transparent route, the anti-cheat rule that decides whether you should do it at all, and the frame cost nobody puts in the thumbnail.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Experimental community mod',
      text: 'A pre-release library injected into games that were never built for it. Reversible, but single-player only.',
      facts: [
        'OFFICIAL RELEASE · 3 SEP 2026',
        'ROUTE · RHI + RENODX',
        'COST · UP TO -50% FPS',
        'SINGLE-PLAYER ONLY',
      ],
    },
    howTo: {
      name: 'Install the DLSS 5 neural rendering add-on with RHI',
      description:
        'Install ReShade with add-on support and the RenoDX DLSS 5 neural rendering add-on into a single-player game using the open-source RHI installer.',
      totalTime: 'PT15M',
      anchor: 'install',
      tools: ['RHI (ReShade HDR Installer)', 'ReShade add-on build', 'RenoDX DLSS 5 add-on'],
      steps: [
        ['Download RHI from GitHub', 'Download RHI only from the RankFTW/RHI releases page on GitHub, not from a mirror or a Discord repack.'],
        ['Choose per-game installation', 'On first run, pick the manual per-game mode instead of deploying ReShade across the whole detected library.'],
        ['Install ReShade for the game', 'Select the single-player game in the left pane and install the ReShade add-on build for it.'],
        ['Add the RenoDX DLSS 5 add-on', 'Open Add-ons, select RenoDX DLSS 5, and let RHI place the add-on next to the game executable.'],
        ['Deploy the neural rendering DLL', 'Open Neural Rendering and choose Deploy DLL so the neural rendering runtime and the matching Streamline libraries are copied into the game folder.'],
        ['Open the overlay in game', 'Launch the game and press Home to open the ReShade overlay, then enable DLSS 5 Neural Rendering on the Add-ons tab.'],
      ],
    },
    sections: [
      {
        id: 'what-it-is',
        nav: 'What DLSS 5 changes',
        label: '01 · THE TECHNOLOGY',
        title: 'DLSS 5 is not another upscaler. It repaints the frame.',
        body: `
<p class="lede">Every DLSS release up to now answered one question: how do we render fewer pixels and reconstruct the rest? DLSS 5 answers a different one — how do we add detail the game never authored?</p>
<p>NVIDIA calls it <strong>3D-guided neural rendering</strong>. A model receives the rendered frame together with the engine&rsquo;s three-dimensional information and re-synthesises materials, skin, hair, fabric and lighting response on top of it. Where DLSS 4 reconstructed what the renderer intended, DLSS 5 invents plausible detail the renderer never had.</p>
<p><strong>That inversion matters for one practical reason: this is the first DLSS feature that costs frames instead of producing them.</strong> Super resolution, ray reconstruction and frame generation were all performance features with a quality side effect. Neural rendering is a quality feature with a performance bill, and the bill is large.</p>
<h3>What is official, and what is not</h3>
<p>NVIDIA has DLSS 5 launching on <strong>3 September 2026</strong>, first in NBA 2K27, across all GeForce RTX 50 Series desktop and laptop GPUs and on GeForce NOW Ultimate. No official support has been announced for the RTX 40 series or older cards.</p>
<p>What people are installing this week is not that. The neural-rendering runtime was found inside an NBA 2K27 early-access build, a RenoDX developer wired it into Control to see what it did, and within days it was being injected into a dozen more games through ReShade add-ons. It works, in the sense that it produces frames. It is still a pre-release library running outside the integration it was written for.</p>
<div class="note">
  <p><strong>Set your expectations from that sentence.</strong> Scenes it flatters look genuinely better than the source material. Scenes it does not can turn a hand-authored character into a plastic portrait-mode render. There is no per-game tuning behind it yet, because there was never meant to be a mod.</p>
</div>`,
      },
      {
        id: 'risks',
        nav: 'Read this first',
        label: '02 · BEFORE YOU TOUCH IT',
        title: 'Four facts that decide whether you should do this at all.',
        body: `
<p class="lede">None of these are reasons not to experiment. They are the reasons to experiment on the right machine, in the right game, from the right download.</p>
<div class="step-grid">
  <div class="step">
    <span class="step-num">RISK—01</span>
    <strong>Anti-cheat</strong>
    <p>ReShade with add-on support hooks the graphics device. RHI&rsquo;s own warning is blunt: single-player only, uninstall before playing multiplayer. Kernel anti-cheats do not negotiate.</p>
  </div>
  <div class="step">
    <span class="step-num">RISK—02</span>
    <strong>An unsigned DLL</strong>
    <p>You are placing an unsigned library that hooks Direct3D next to a game executable. Only take it from a source that publishes a checksum you can verify yourself.</p>
  </div>
  <div class="step">
    <span class="step-num">RISK—03</span>
    <strong>The one-click installer</strong>
    <p>The payload is small and trivially repackaged, which makes &ldquo;1 CLICK DLSS 5&rdquo; builds from Discord and Telegram the actual threat here — not the technology.</p>
  </div>
  <div class="step">
    <span class="step-num">RISK—04</span>
    <strong>The frame bill</strong>
    <p>Early community measurements land near half your frame rate. If you are already at 50 fps, you are about to be at 25. Budget for it before you install.</p>
  </div>
</div>
<div class="note note-warn">
  <p><strong>If the game has an anti-cheat, stop reading here.</strong> Competitive shooters, live-service titles and anything with EAC, BattlEye or a kernel-level driver are not worth the exposure. There is no visual improvement that survives losing the account.</p>
</div>`,
      },
      {
        id: 'install',
        nav: 'Install it with RHI',
        label: '03 · THE CLEAN ROUTE',
        title: 'Use the open installer, not a repackaged binary.',
        body: `
<p class="lede">RHI — the ReShade HDR Installer by RankFTW — is an open-source manager for exactly this class of graphics mod, which makes it the one link in the chain you can actually inspect.</p>
<p>It detects games across eight storefronts (Steam, GOG, Epic, EA App, Ubisoft Connect, Xbox and Game Pass, Battle.net, Rockstar) and manages around ten components: ReShade itself, RenoDX, OptiScaler, DXVK, Display Commander, ReLimiter, RE Framework, Luma Framework and independent DLSS and Streamline DLL swapping. It needs Windows 10 or 11 (x64) and the .NET 8 Desktop Runtime; an NVIDIA GPU is recommended, and most features also work on AMD and Intel.</p>
<div class="step-grid">
  <div class="step">
    <span class="step-num">STEP—01</span>
    <strong>Download from the source</strong>
    <p>Take RHI from the <a href="https://github.com/RankFTW/RHI" target="_blank" rel="noopener">RankFTW/RHI releases page</a> on GitHub. Not a mirror, not a re-upload, not a link forwarded in a server.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—02</span>
    <strong>Choose manual, per game</strong>
    <p>On first run, take the option that installs ReShade for games you select. Do not batch-deploy across a detected library — that is how a mod ends up in an online game you forgot about.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—03</span>
    <strong>Install ReShade</strong>
    <p>Pick the single-player game in the left pane, then install ReShade. The add-on build is required; the plain build cannot load RenoDX at all.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—04</span>
    <strong>Add RenoDX DLSS 5</strong>
    <p>Open <em>Add-ons</em>, choose <em>Select</em>, and pick <em>RenoDX DLSS 5</em>. This is the add-on that exposes neural rendering inside the overlay.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—05</span>
    <strong>Deploy the DLL</strong>
    <p>Open <em>Neural Rendering</em> and choose <em>Deploy DLL</em>. RHI places the neural-rendering runtime and the Streamline libraries matching your GPU generation beside the game executable.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—06</span>
    <strong>Open the overlay</strong>
    <p>Launch the game and press <strong>Home</strong> — <strong>Pos1</strong> on a German layout — to open ReShade. Neural rendering appears under the Add-ons tab.</p>
  </div>
</div>
<h3>Verify anything you download by hand</h3>
<p>If you obtain the add-on or the runtime outside RHI, check it before it goes anywhere near a game folder. A good source publishes a SHA-256 next to the file; compare it yourself rather than trusting a screenshot of one.</p>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · VERIFY A DOWNLOADED LIBRARY</div>
  <pre><code># Print the hash of the file you downloaded
Get-FileHash .\\nvngx_dlssnr.dll -Algorithm SHA256

# Compare it to the published value before copying it anywhere.
# If the two strings differ by one character, delete the file.</code></pre>
</div>
<div class="note">
  <p><strong>Keep the uninstall path short.</strong> RHI records what it wrote per game, so removal is one button instead of a hunt through the install directory. A half-removed ReShade — a stray <code>dxgi.dll</code> and an orphaned ini — is the usual reason a game starts crashing three patches later.</p>
</div>`,
      },
      {
        id: 'tuning',
        nav: 'Tune it in game',
        label: '04 · IN THE OVERLAY',
        title: 'What to change once the overlay opens.',
        body: `
<p class="lede">The default is not the setting you want. Neural rendering fails loudly rather than subtly, and the intensity slider is what stands between &ldquo;better materials&rdquo; and &ldquo;everyone looks like a mannequin&rdquo;.</p>
<p>On the Add-ons tab you should find the DLSS 5 neural rendering toggle, a set of presets and an intensity control. The presets currently exposed by the RenoDX add-on are:</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Preset</th><th>What it tends to do</th><th>Use it when</th></tr>
    </thead>
    <tbody>
      <tr><td>Default</td><td>The add-on&rsquo;s baseline: broad detail reconstruction across materials, skin and hair.</td><td>First look, to see whether a game responds at all.</td></tr>
      <tr><td>Natural</td><td>Restrained reconstruction that stays closer to the game&rsquo;s own art direction.</td><td>Almost always. Start here and stay here for stylised games.</td></tr>
      <tr><td>Cinematic</td><td>Heavier relighting and material response; the most visible and the most artificial.</td><td>Screenshots and photo modes, rarely for playing.</td></tr>
      <tr><td>Intensity</td><td>Scales how far the model is allowed to move away from the source frame.</td><td>Lower it until faces stop looking retouched, then leave it.</td></tr>
    </tbody>
  </table>
</div>
<h3>Judge it on faces and hair, not on foliage</h3>
<p>Foliage and rock flatter any detail-synthesis model. Characters are where the failure shows: pores that were never in the texture, hair strands invented at the silhouette, and skin that reads as retouched. Load a cutscene, toggle the add-on, and watch a single face. If that face stops belonging to the game, the setting is too strong regardless of how good the environment looks.</p>
<h3>Removing it cleanly</h3>
<ul>
  <li>Uninstall through RHI, for the specific game, rather than deleting files by hand.</li>
  <li>Check the game folder afterwards for a leftover <code>dxgi.dll</code>, <code>d3d12.dll</code>, <code>ReShade.ini</code> or <code>reshade-shaders</code> directory.</li>
  <li>Run the storefront&rsquo;s file verification if the game uses launcher-side integrity checks.</li>
  <li>Remove it before any multiplayer session, even in a game with a single-player mode you were using.</li>
</ul>`,
      },
      {
        id: 'performance',
        nav: 'The frame cost',
        label: '05 · THE BILL',
        title: 'Expect to pay roughly half your frame rate.',
        body: `
<p class="lede">These are early community measurements from an injected pre-release build. They are consistent enough across GPUs to plan around.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>GPU</th><th>Scenario</th><th>Before</th><th>After</th></tr>
    </thead>
    <tbody>
      <tr><td>RTX 5070 Ti</td><td>Control, 4K</td><td>71 fps</td><td>35 fps</td></tr>
      <tr><td>RTX 5090</td><td>4K demonstration</td><td>91 fps</td><td>50 fps</td></tr>
      <tr><td>RTX 5070</td><td>Cyberpunk 2077, 1440p, raster</td><td>138 fps</td><td>68 fps</td></tr>
      <tr><td>RTX 5070</td><td>Cyberpunk 2077, 1440p, RT Ultra</td><td>111 fps</td><td>55 fps</td></tr>
      <tr><td>RTX 5070</td><td>Cyberpunk 2077, 1440p, path tracing</td><td>71 fps</td><td>45 fps</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Read the last row carefully.</strong> The path-traced case loses the least in percentage terms, because the frame was already expensive. The cheaper your frame, the larger the neural pass looms in it — which is the opposite of how every previous DLSS feature behaved.</p>
<div class="note">
  <p><strong>This is not a forecast for the shipping feature.</strong> These numbers come from an unoptimised injection with no control over internal resolution or scheduling. NVIDIA has said the internal build became roughly five times faster over six months of development. Treat the table as the current price of the mod, not the price of DLSS 5.</p>
</div>
<h3>Making it playable anyway</h3>
<ul>
  <li><strong>Drop the internal resolution first.</strong> Combine neural rendering with DLSS super resolution at Balanced or Performance rather than lowering the output resolution.</li>
  <li><strong>Cap the frame rate.</strong> A stable 40 with a cap reads far better than an uncapped 35 to 55 swing, because the frame-time variance is what you actually feel.</li>
  <li><strong>Turn off what the neural pass duplicates.</strong> Heavy post-sharpening, film grain and chromatic aberration fight the reconstruction and cost frames on top of it.</li>
  <li><strong>Leave frame generation for later.</strong> Stacking generated frames on a halved base frame rate raises latency more than it raises smoothness.</li>
</ul>`,
      },
      {
        id: 'alternatives',
        nav: 'Better alternatives',
        label: '06 · THE ALTERNATIVES',
        title: 'Four things that are probably a better use of the evening.',
        body: `
<p class="lede">Neural rendering is the most interesting option on this list and the worst value on it. Here is what the same hour buys elsewhere.</p>
<h3>1. Wait for the official release</h3>
<p>DLSS 5 ships on 3 September 2026 for RTX 50 Series cards, starting with NBA 2K27 and expanding as titles integrate it. Official means signed libraries, no anti-cheat exposure, and an integration that can choose internal resolutions a mod cannot. If you own a 50 Series card, waiting costs you days.</p>
<h3>2. Force the newest DLSS model into older games</h3>
<p>This is the highest-value change most people have never made. The transformer super-resolution model runs on <strong>every RTX card since the 20 Series</strong>, and hundreds of shipped games still call an older preset compiled years ago. The DLSS override in the NVIDIA app, or a per-game DLL swap with DLSS Swapper, replaces it. Upgrading a 2021 title from an old convolutional preset to the current transformer model routinely removes more shimmer and ghosting than neural rendering adds detail — and it is free, signed and reversible.</p>
<h3>3. OptiScaler, if you are not on NVIDIA</h3>
<p>When a game exposes only one upscaler and it is the wrong one for your GPU, OptiScaler translates between DLSS, FSR and XeSS inputs so you can run the reconstruction your hardware actually accelerates. RHI manages it alongside everything else.</p>
<h3>4. Plain ReShade, or RenoDX without the neural add-on</h3>
<p>Tone mapping, a proper HDR retrofit for a game that shipped without one, and restrained sharpening are deterministic, reversible and nearly free. For most older games this is the change that makes them look modern — not detail synthesis.</p>
<div class="note note-good">
  <p><strong>If you only do one thing:</strong> check which DLSS preset your favourite game is using and override it to the current model. It takes five minutes, works on a six-year-old GPU, and does not involve an unsigned DLL. The <a href="dlss-vs-fsr-vs-xess-upscaling.html">upscaling comparison guide</a> covers how to choose the mode and where each vendor stands.</p>
</div>`,
      },
      {
        id: 'sources',
        nav: 'Sources',
        label: '07 · SOURCES',
        title: 'Where these details come from.',
        body: `
<p>This page describes a fast-moving community mod alongside an unreleased product. Both will have changed by the time you read it — verify before you install, and prefer the primary source over any guide, including this one.</p>
<ul>
  <li><a href="https://github.com/RankFTW/RHI" target="_blank" rel="noopener">RankFTW/RHI on GitHub</a> — the installer, its component list, requirements and the single-player-only warning.</li>
  <li><a href="https://www.tomshardware.com/pc-components/gpus/nvidias-controversial-dlss-5-will-launch-september-3-with-nba2k27-available-on-all-rtx-50-series-gpus" target="_blank" rel="noopener">Tom&rsquo;s Hardware</a> — the 3 September 2026 launch date, NBA 2K27 as the first title, and RTX 50 Series availability.</li>
  <li><a href="https://www.tomshardware.com/pc-components/gpus/modders-get-leaked-dlss-5-running-in-control-early-blackwell-test-drops-rtx-5070-ti-from-71-to-35-fps-at-4k" target="_blank" rel="noopener">Tom&rsquo;s Hardware</a> — the Control test that produced the 71 to 35 fps figure on an RTX 5070 Ti at 4K.</li>
  <li><a href="https://videocardz.com/newz/nvidia-dlss-5-gets-5x-faster-in-six-months-launches-september-3-on-all-rtx-50-gpus" target="_blank" rel="noopener">VideoCardz</a> — NVIDIA&rsquo;s claim that the internal build became five times faster during development.</li>
</ul>
<p>Nothing here is affiliated with NVIDIA, RankFTW or RenoDX. There are no affiliate links on this site, and nothing on this page is sponsored.</p>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '08 · QUICK ANSWERS',
    faqHeading: 'DLSS 5 neural rendering, briefly.',
    faqs: [
      [
        'Is the DLSS 5 mod safe to install?',
        'The technique is reversible, but the download is where the risk lives. Use the open-source RHI installer from its GitHub releases page rather than a one-click executable shared in a Discord or Telegram group, verify any DLL you fetch by hand against a published SHA-256, and install only into single-player games. ReShade with add-on support hooks the graphics device and can trigger anti-cheat.',
      ],
      [
        'Does DLSS 5 work on the RTX 40 series?',
        'Officially, no. NVIDIA announced DLSS 5 for all GeForce RTX 50 Series desktop and laptop GPUs plus GeForce NOW Ultimate, with no support announced for RTX 40 or older cards. Community mods have been injected into other hardware with mixed results, but that is unsupported and the performance cost on older cards is worse, not better.',
      ],
      [
        'Can the DLSS 5 mod get me banned?',
        'In an online game with anti-cheat, yes, that is a realistic outcome. RHI itself warns that ReShade with add-on support may trigger anti-cheat and tells you to uninstall before playing multiplayer. Treat this as a single-player-only modification and remove it before launching anything competitive.',
      ],
      [
        'Does DLSS 5 improve performance like DLSS 4?',
        'No, and this is the key difference. Super resolution and frame generation were performance features. Neural rendering is a visual feature that costs frames: early community tests show roughly half the frame rate, such as 71 fps down to 35 fps on an RTX 5070 Ti at 4K in Control. The shipping version is expected to be considerably faster than the injected build.',
      ],
      [
        'I already use DLSS 4. Is neural rendering worth adding?',
        'For most people, not yet. Forcing the current transformer super-resolution model into games that still ship an older preset is free, works on every RTX card since the 20 Series, and usually produces a larger visible improvement than neural rendering at a fraction of the cost. Revisit neural rendering once games integrate it officially.',
      ],
    ],
    related: [
      ['dlss-vs-fsr-vs-xess-upscaling.html', 'DLSS vs FSR vs XeSS: which upscaler to use'],
      ['reduce-input-lag-pc-gaming.html', 'Reduce input lag in the right order'],
      ['clean-gpu-driver-install-windows.html', 'Clean-install GPU drivers the safe way'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'Different screen, same rule this guide runs on: software should be local, reversible and easy to remove.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'dlss-vs-fsr-vs-xess-upscaling.html',
    kicker: 'WORKSHOP—02 · GPU & UPSCALING · 11 MIN READ',
    title: 'DLSS vs FSR vs XeSS: Which Upscaler to Use · Nyxelium',
    ogTitle: 'DLSS vs FSR vs XeSS: Which Upscaler Should You Use?',
    description:
      'How DLSS, FSR and XeSS differ, which GPUs run which version, the render resolution behind every quality mode, and when frame generation helps or hurts.',
    twitterDescription:
      'The upscaling landscape in one page: hardware support, quality modes, render resolutions and frame generation.',
    keywords:
      'DLSS vs FSR, XeSS 2, FSR 4, DLSS 4 transformer model, upscaling quality mode, frame generation, render resolution, GPU upscaling comparison',
    articleSection: 'GPU and upscaling',
    audience: 'PC gamers choosing graphics settings',
    proficiency: 'Beginner',
    headline: 'Three upscalers, one decision, and the numbers behind it.',
    deck: 'DLSS, FSR and XeSS all promise more frames for less loss. They differ in who can run them, how they reconstruct a frame, and how badly they fail in motion. This is the version that fits on one page, with the render resolutions your quality preset actually picks.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Settings, not hardware',
      text: 'Nothing here needs a purchase. Every recommendation is a setting you already have.',
      facts: [
        'DLSS 4 · FSR 4 · XESS 2',
        'RENDER-RESOLUTION TABLES',
        'FRAME-GENERATION RULES',
        'NO HARDWARE REQUIRED',
      ],
    },
    sections: [
      {
        id: 'how-it-works',
        nav: 'How upscaling works',
        label: '01 · THE MECHANISM',
        title: 'You are not stretching an image. You are accumulating one.',
        body: `
<p class="lede">Modern upscaling is temporal: the frame you see is assembled from several previous frames, aligned using the engine&rsquo;s own motion vectors, then resolved into one image at output resolution.</p>
<p>That single fact explains almost every artefact you have ever blamed on an upscaler. Because reconstruction depends on history, anything that breaks history breaks the image:</p>
<ul>
  <li><strong>Ghosting</strong> — history that should have been rejected got kept, usually behind a fast-moving object.</li>
  <li><strong>Shimmer and crawl</strong> — thin geometry such as fences, wires and foliage never survives long enough in history to resolve.</li>
  <li><strong>Smearing</strong> — effects drawn without motion vectors, like many particles, transparencies and some shadows, have no history to align.</li>
  <li><strong>Disocclusion trails</strong> — the area revealed behind a moving object has no accumulated data at all, so it must be invented.</li>
</ul>
<p><strong>The generation you run matters more than the brand you run.</strong> A modern model on a five-year-old GPU beats an old model on a new one, which is why the single most valuable thing in this guide is the section on forcing a newer model into an older game.</p>`,
      },
      {
        id: 'families',
        nav: 'The three families',
        label: '02 · THE FIELD',
        title: 'Who can run what, as of September 2026.',
        body: `
<p class="lede">Hardware support is the first filter, and it eliminates most of the debate before quality even comes up.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Technology</th><th>Runs on</th><th>Approach</th><th>Practical position</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>DLSS 4 / 4.5<br>(NVIDIA)</td>
        <td>GeForce RTX 20 Series and newer for super resolution; frame generation is limited to newer generations</td>
        <td>Transformer-based super resolution and ray reconstruction, running on tensor cores</td>
        <td>The quality reference. The transformer model reaches back to the 20 Series, which is unusually generous for a vendor feature.</td>
      </tr>
      <tr>
        <td>FSR 4<br>(AMD)</td>
        <td>RDNA 4 cards such as the RX 9070 and 9070 XT; earlier cards fall back to FSR 3.1</td>
        <td>AMD&rsquo;s first machine-learning upscaler, using the AI units introduced with RDNA 4</td>
        <td>The biggest generational jump of the three. The catch is that the good version needs current hardware.</td>
      </tr>
      <tr>
        <td>XeSS 2<br>(Intel)</td>
        <td>Best on Intel Arc via XMX units; a DP4a path runs on most other modern GPUs</td>
        <td>Machine-learning reconstruction with a vendor-neutral fallback, plus XeLL latency reduction and XeFG frame generation</td>
        <td>The useful middle option. Often the best choice on a non-RDNA-4 AMD card in a game with no good FSR build.</td>
      </tr>
      <tr>
        <td>TSR / TAAU<br>(engine-provided)</td>
        <td>Any GPU</td>
        <td>Engine-side temporal upscaling, notably Unreal&rsquo;s Temporal Super Resolution</td>
        <td>The floor. Better than it gets credit for at high internal resolutions, clearly behind the others at low ones.</td>
      </tr>
    </tbody>
  </table>
</div>
<div class="note">
  <p><strong>Vendor pages move faster than guides.</strong> Model versions, per-generation frame-generation limits and the list of supported cards all change with driver releases. Check the current vendor documentation before you plan a purchase around any row above.</p>
</div>`,
      },
      {
        id: 'quality-modes',
        nav: 'What the modes cost',
        label: '03 · THE ARITHMETIC',
        title: 'Your quality preset is just a render resolution.',
        body: `
<p class="lede">Quality, Balanced and Performance are not opinions. They are fixed scaling factors, and knowing the number tells you immediately whether a setting will look acceptable.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Mode</th><th>Scale</th><th>Renders at, for 1080p</th><th>for 1440p</th><th>for 4K</th></tr>
    </thead>
    <tbody>
      <tr><td>Native / DLAA</td><td>1.00x</td><td>1920 &times; 1080</td><td>2560 &times; 1440</td><td>3840 &times; 2160</td></tr>
      <tr><td>Quality</td><td>0.67x</td><td>1280 &times; 720</td><td>1706 &times; 960</td><td>2560 &times; 1440</td></tr>
      <tr><td>Balanced</td><td>0.58x</td><td>1114 &times; 626</td><td>1485 &times; 835</td><td>2227 &times; 1253</td></tr>
      <tr><td>Performance</td><td>0.50x</td><td>960 &times; 540</td><td>1280 &times; 720</td><td>1920 &times; 1080</td></tr>
      <tr><td>Ultra Performance</td><td>0.33x</td><td>640 &times; 360</td><td>853 &times; 480</td><td>1280 &times; 720</td></tr>
    </tbody>
  </table>
</div>
<p><strong>One rule falls straight out of that table: judge the internal resolution, not the label.</strong> Performance mode at 4K renders a full 1080p frame and usually looks excellent. Performance mode at 1080p renders 540p and usually does not. The same word means two very different pictures.</p>
<h3>A practical starting point</h3>
<ul>
  <li><strong>4K display</strong> — start at Performance. You are reconstructing from 1080p, and the extra frames are worth more than the difference to Quality.</li>
  <li><strong>1440p display</strong> — start at Quality, drop to Balanced only if you need the frames.</li>
  <li><strong>1080p display</strong> — Quality only, and consider running the anti-aliasing mode instead (DLAA, or native with the upscaler&rsquo;s AA) if you have headroom.</li>
  <li><strong>Anything below 720p internal</strong> — stop and lower a different setting. Shadows and volumetrics usually cost more than the resolution you are trying to save.</li>
</ul>`,
      },
      {
        id: 'frame-generation',
        nav: 'Frame generation',
        label: '04 · GENERATED FRAMES',
        title: 'Frame generation is a smoothness feature, not a performance feature.',
        body: `
<p class="lede">Upscaling makes the frames cheaper. Frame generation inserts frames that no input ever touched. The difference decides when each one is a good idea.</p>
<p>A generated frame is interpolated between two rendered frames, which means the renderer must hold a frame back before it can produce one. You gain motion smoothness and you pay latency. Multi-frame generation extends this further — recent DLSS versions push the ratio up to several generated frames per rendered one, which multiplies both the benefit and the cost.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Base frame rate</th><th>Frame generation</th><th>Why</th></tr>
    </thead>
    <tbody>
      <tr><td>Below 40 fps</td><td>Leave it off</td><td>The latency penalty lands on an already-slow input path, and interpolation artefacts are most visible when the gap between frames is large.</td></tr>
      <tr><td>50 to 70 fps</td><td>Good case</td><td>This is what the feature is for: a high-refresh display fed by a frame rate that cannot reach it natively.</td></tr>
      <tr><td>Above 100 fps</td><td>Optional</td><td>Useful for a 240 Hz panel, pointless below that. Diminishing visual return, same latency cost.</td></tr>
      <tr><td>Competitive shooters</td><td>Off</td><td>You want the lowest latency, not the smoothest picture. Always.</td></tr>
    </tbody>
  </table>
</div>
<div class="note">
  <p><strong>Always pair frame generation with the vendor&rsquo;s latency reduction</strong> — Reflex on NVIDIA, Anti-Lag on AMD, XeLL on Intel. Without it you are adding queue depth on purpose. The <a href="reduce-input-lag-pc-gaming.html">input-lag guide</a> covers the whole chain and the frame-cap arithmetic that goes with it.</p>
</div>`,
      },
      {
        id: 'choosing',
        nav: 'Choosing per game',
        label: '05 · THE DECISION',
        title: 'Pick in this order, and stop when you reach a yes.',
        body: `
<p class="lede">Almost every &ldquo;which is better&rdquo; argument dissolves once you sort by what the game actually offers and what the card actually accelerates.</p>
<ul>
  <li><strong>Does the game offer the upscaler your GPU accelerates in hardware?</strong> Take it. An NVIDIA card takes DLSS, an RDNA 4 card takes FSR 4, an Arc card takes XeSS 2. This resolves most cases immediately.</li>
  <li><strong>Is the offered version old?</strong> Check which model the game ships. A 2022 game with an early DLSS or an FSR 2 build is a candidate for a newer DLL or a driver-level override before you judge its quality.</li>
  <li><strong>Non-RDNA-4 AMD card, and FSR looks poor?</strong> Try XeSS 2 if the game has it. The vendor-neutral path frequently beats an older FSR build on the same hardware.</li>
  <li><strong>Plenty of headroom already?</strong> Use the anti-aliasing mode rather than the upscaling mode. DLAA and its equivalents render at native resolution and use the same reconstruction to clean the image — the best-looking option in most games.</li>
  <li><strong>Nothing available looks right?</strong> Lower shadows, volumetrics or ray-tracing steps first. They usually buy more frames than another notch of upscaling, and they do not damage motion clarity.</li>
</ul>
<h3>Forcing a newer model into an older game</h3>
<p>This is the highest-value trick in the whole category and it is free. NVIDIA&rsquo;s app exposes a DLSS override that swaps a game&rsquo;s bundled model for the current one; DLSS Swapper does the same by replacing the DLL per game. Because the transformer super-resolution model runs on every RTX card since the 20 Series, an old game and an old GPU both benefit. Expect less shimmer on thin geometry and noticeably less ghosting behind moving objects.</p>
<div class="note note-good">
  <p><strong>Do this before buying anything.</strong> Overriding the model in the five games you actually play costs an evening and changes more than most upgrades in this price range.</p>
</div>`,
      },
      {
        id: 'mistakes',
        nav: 'Common mistakes',
        label: '06 · MISTAKES',
        title: 'Six settings people get wrong, in rough order of frequency.',
        body: `
<div class="step-grid">
  <div class="step">
    <span class="step-num">MISTAKE—01</span>
    <strong>Stacking sharpeners</strong>
    <p>Upscaler sharpening, an in-game slider and a driver-level filter all at once produces the crunchy over-processed look people then blame on the upscaler. Pick one, keep it low.</p>
  </div>
  <div class="step">
    <span class="step-num">MISTAKE—02</span>
    <strong>Performance mode at 1080p</strong>
    <p>That is a 540p frame. Use Quality, or lower a different setting. No reconstruction model recovers detail that was never sampled.</p>
  </div>
  <div class="step">
    <span class="step-num">MISTAKE—03</span>
    <strong>Frame generation to fix a low frame rate</strong>
    <p>It smooths what is already acceptable. Below roughly 40 fps it makes the game feel worse while the counter goes up.</p>
  </div>
  <div class="step">
    <span class="step-num">MISTAKE—04</span>
    <strong>Ignoring the model version</strong>
    <p>Two games with the same setting name can ship models years apart. Check and override before concluding an upscaler looks bad.</p>
  </div>
  <div class="step">
    <span class="step-num">MISTAKE—05</span>
    <strong>Forgetting the VRAM side</strong>
    <p>Upscaling reduces the render resolution but not texture memory. If you are stuttering from a full frame buffer, lower texture quality — upscaling will not save you.</p>
  </div>
  <div class="step">
    <span class="step-num">MISTAKE—06</span>
    <strong>Comparing on still screenshots</strong>
    <p>Every artefact that matters is temporal. Judge in motion, ideally while turning the camera past a fence or a stand of trees.</p>
  </div>
</div>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '07 · QUICK ANSWERS',
    faqHeading: 'Upscaling on PC, briefly.',
    faqs: [
      [
        'Which is better, DLSS or FSR?',
        'On image quality, DLSS with the current transformer model is generally ahead, and it runs on every GeForce RTX card since the 20 Series. FSR 4 closed much of the gap but requires RDNA 4 hardware such as the RX 9070 series; on older AMD cards you are running FSR 3.1, which is a different product. In practice the answer is decided by which one your GPU accelerates.',
      ],
      [
        'What quality mode should I use?',
        'Look at the internal resolution rather than the label. At 4K, Performance mode renders a full 1080p frame and usually looks excellent. At 1080p, Performance renders 540p and usually does not, so stay on Quality. A useful floor is to avoid any mode that renders below about 720p internally.',
      ],
      [
        'Does frame generation increase input lag?',
        'Yes. A generated frame is interpolated between two rendered frames, so the renderer holds a frame back to produce it. Always enable the vendor latency reduction alongside it, and skip frame generation entirely below roughly 40 fps or in competitive shooters.',
      ],
      [
        'Can I use DLSS on an AMD or Intel GPU?',
        'No. DLSS runs on NVIDIA tensor cores. On AMD use FSR, on Intel use XeSS, and if a game offers only DLSS, a translation layer such as OptiScaler can map the game DLSS calls onto FSR or XeSS instead.',
      ],
      [
        'How do I update DLSS in an old game?',
        'Use the DLSS override in the NVIDIA app, or swap the DLL per game with a tool such as DLSS Swapper. Because the current super-resolution model runs on every RTX card since the 20 Series, this usually improves shimmer and ghosting in older titles at no performance cost.',
      ],
    ],
    related: [
      ['dlss-5-neural-rendering-guide.html', 'DLSS 5 neural rendering: the honest version'],
      ['reduce-input-lag-pc-gaming.html', 'Reduce input lag in the right order'],
      ['clean-gpu-driver-install-windows.html', 'Clean-install GPU drivers the safe way'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'Small tools that do one job and keep your data on the device. No account, no sign-up.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'clean-gpu-driver-install-windows.html',
    kicker: 'WORKSHOP—03 · GPU & DRIVERS · 9 MIN READ',
    title: 'How to Clean Install GPU Drivers on Windows · Nyxelium',
    ogTitle: 'How to Clean Install GPU Drivers on Windows (DDU and Alternatives)',
    description:
      'When a clean GPU driver install is genuinely the fix, how to run DDU without breaking anything, the vendor-specific steps, and three gentler options to try first.',
    twitterDescription:
      'DDU, done properly — plus the three gentler fixes most people should try before reaching for it.',
    keywords:
      'clean install GPU drivers, DDU Display Driver Uninstaller, NVIDIA driver reinstall, AMD Adrenalin factory reset, Intel Arc driver, Windows graphics driver problems',
    articleSection: 'Windows and hardware',
    audience: 'Windows PC owners troubleshooting graphics problems',
    proficiency: 'Intermediate',
    headline: 'Clean-install a GPU driver without breaking the rest of Windows.',
    deck: 'Half the internet answers every graphics problem with &ldquo;DDU and reinstall&rdquo;. It is a real fix for a narrow set of symptoms and a waste of an hour for everything else. This is how to tell which case you are in, and how to run the nuclear option properly when you need it.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Reversible by design',
      text: 'Every step here can be undone. Download the installer before you remove anything.',
      facts: [
        'NVIDIA · AMD · INTEL',
        'FULL DDU PROCEDURE',
        'THREE GENTLER FIXES FIRST',
        'LAPTOP CAVEATS INCLUDED',
      ],
    },
    howTo: {
      name: 'Clean install a graphics driver on Windows with DDU',
      description:
        'Remove an existing graphics driver completely with Display Driver Uninstaller and install a freshly downloaded driver package.',
      totalTime: 'PT30M',
      anchor: 'ddu',
      tools: ['Display Driver Uninstaller', 'The vendor driver installer'],
      steps: [
        ['Download the driver first', 'Download the driver package you intend to install before removing anything, so the machine never needs a working GPU driver to fetch one.'],
        ['Disconnect from the internet', 'Disconnect the network or pause driver delivery so Windows Update cannot install a generic driver mid-process.'],
        ['Boot into Safe Mode', 'Restart into Safe Mode so no display driver components are loaded and in use.'],
        ['Run DDU', 'Run Display Driver Uninstaller, select the correct GPU vendor, and choose clean and restart.'],
        ['Install the downloaded driver', 'After the reboot, run the driver installer you downloaded and choose the custom or clean installation option.'],
        ['Reapply settings and reconnect', 'Reconnect the network, then restore your control panel settings and per-game profiles.'],
      ],
    },
    sections: [
      {
        id: 'when',
        nav: 'When it is the fix',
        label: '01 · TRIAGE',
        title: 'A clean install fixes a specific list. Check yours against it.',
        body: `
<p class="lede">Wiping a driver helps when the old installation left state behind that the new one cannot overwrite. It does nothing at all for a game that is simply too heavy for the card.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Symptom</th><th>Clean install?</th><th>Look here instead</th></tr>
    </thead>
    <tbody>
      <tr><td>Black screen or no signal after a driver update</td><td>Yes</td><td>—</td></tr>
      <tr><td>Control panel missing, or refusing to open</td><td>Yes</td><td>—</td></tr>
      <tr><td>Driver install fails partway, repeatedly</td><td>Yes</td><td>—</td></tr>
      <tr><td>You swapped GPU vendors</td><td>Yes</td><td>—</td></tr>
      <tr><td>Random crashes after many in-place driver updates</td><td>Probably</td><td>Check temperatures and memory first</td></tr>
      <tr><td>Stutter in one specific game</td><td>No</td><td>Shader cache, background apps, the game patch notes</td></tr>
      <tr><td>Low frame rate in general</td><td>No</td><td>Settings, resolution, thermal throttling, power limits</td></tr>
      <tr><td>Crash to desktop with a memory error</td><td>No</td><td>Overclocks, RAM stability, PSU under transient load</td></tr>
    </tbody>
  </table>
</div>
<p><strong>The honest summary:</strong> if the problem appeared immediately after a driver change, or the driver software itself is broken, a clean install is the right tool. If the problem is performance, it almost never is.</p>`,
      },
      {
        id: 'gentler',
        nav: 'Try these first',
        label: '02 · GENTLER OPTIONS',
        title: 'Three fixes that take five minutes instead of an hour.',
        body: `
<p class="lede">Each of these solves a real subset of driver problems without taking the machine out of service.</p>
<h3>1. Roll back to the previous driver</h3>
<p>If the problem started with an update, Device Manager keeps the previous package. Open the display adapter&rsquo;s properties, go to the Driver tab, and use Roll Back Driver. This is the fastest route back to a working desktop and it preserves everything else.</p>
<h3>2. Reinstall in place, with the clean option</h3>
<p>Both major vendors offer a clean option inside their own installer — a custom install with &ldquo;perform a clean installation&rdquo; ticked on NVIDIA, or the factory reset option in AMD&rsquo;s installer. This removes profiles and settings and rewrites the driver components, which handles most corrupted-state cases without Safe Mode.</p>
<h3>3. Clear the shader cache</h3>
<p>Stutter that appears after a driver update is frequently just a cold shader cache being rebuilt, plus a stale one confusing matters. Clearing the driver&rsquo;s cache and the game&rsquo;s own cache directory resolves a surprising share of &ldquo;the new driver ruined performance&rdquo; reports, and costs nothing but the first few minutes of the next session.</p>
<div class="note">
  <p><strong>Change one thing at a time.</strong> If you roll back, clear caches and disable an overlay in the same sitting, you have learned nothing about which one mattered — and you will do all three again next time.</p>
</div>`,
      },
      {
        id: 'ddu',
        nav: 'The DDU procedure',
        label: '03 · THE FULL REMOVAL',
        title: 'Display Driver Uninstaller, run in the right order.',
        body: `
<p class="lede">DDU removes driver files, registry entries, folders and leftovers that a normal uninstall leaves behind. The order below exists so you are never stranded without a driver and without a way to get one.</p>
<div class="step-grid">
  <div class="step">
    <span class="step-num">STEP—01</span>
    <strong>Download the new driver first</strong>
    <p>Fetch the exact package you intend to install and put it somewhere obvious. Never start a removal you cannot reverse offline.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—02</span>
    <strong>Note what you are running</strong>
    <p>Write down the current driver version. If the new one is worse, that number is how you get back.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—03</span>
    <strong>Stop Windows from helping</strong>
    <p>Disconnect the network before the reboot. Otherwise Windows Update installs a generic display driver in the gap and you get to do this twice.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—04</span>
    <strong>Boot into Safe Mode</strong>
    <p>Restart with Safe Mode from the advanced startup options. DDU can run in normal mode but it will tell you not to, and it is right.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—05</span>
    <strong>Clean and restart</strong>
    <p>Run DDU, select the correct vendor, then Clean and restart. Expect a low-resolution desktop on the way back up. That is the point.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—06</span>
    <strong>Install, then reconnect</strong>
    <p>Run your downloaded installer, choose the custom or clean option, reboot, and only then reconnect the network.</p>
  </div>
</div>
<div class="note note-warn">
  <p><strong>Laptops with switchable graphics need care.</strong> Removing the integrated display driver on a hybrid laptop can leave you with no output at all. Clean only the discrete GPU vendor, and keep the manufacturer&rsquo;s own driver page open — laptop OEMs sometimes ship modified packages that the generic vendor installer will not replace correctly.</p>
</div>`,
      },
      {
        id: 'vendors',
        nav: 'Vendor specifics',
        label: '04 · PER VENDOR',
        title: 'What differs between NVIDIA, AMD and Intel.',
        body: `
<h3>NVIDIA</h3>
<ul>
  <li><strong>Game Ready or Studio.</strong> Game Ready tracks new releases; Studio changes less often and is validated against creative applications. If you are not chasing a launch-day title, Studio is the quieter choice.</li>
  <li><strong>Custom install.</strong> Always available in the installer, with a &ldquo;perform a clean installation&rdquo; checkbox that resets profiles and settings.</li>
  <li><strong>Skip what you do not use.</strong> The custom screen lets you leave out components you never touch, which reduces the surface area of the next problem.</li>
  <li><strong>Settings live outside the driver.</strong> Per-game profiles and overrides are re-applied after a clean install, so expect to set them again.</li>
</ul>
<h3>AMD</h3>
<ul>
  <li><strong>Factory reset.</strong> The Adrenalin installer offers a factory reset that performs a full removal without a separate tool. For most cases this replaces DDU entirely.</li>
  <li><strong>Watch the tuning profiles.</strong> Undervolts and fan curves live in the driver software, so a reset removes them. Screenshot them first.</li>
  <li><strong>Optional versus recommended.</strong> Optional branches ship fixes early; recommended branches are the safer default for a machine you rely on.</li>
</ul>
<h3>Intel</h3>
<ul>
  <li><strong>Arc drivers move quickly.</strong> Older titles in particular have improved substantially across driver releases, so an update is more often the fix here than on other vendors.</li>
  <li><strong>Integrated graphics matter.</strong> On a laptop, the OEM package may be the supported one. Check the manufacturer before installing a generic build.</li>
</ul>
<div class="note">
  <p><strong>Keep one known-good installer on disk.</strong> A driver version that ran your machine for six months without incident is worth 800 MB of storage. It is the fastest recovery path when a new release goes badly and the download page has already moved on.</p>
</div>`,
      },
      {
        id: 'after',
        nav: 'After the install',
        label: '05 · AFTERWARDS',
        title: 'Verify, restore and stop the loop from repeating.',
        body: `
<ul>
  <li><strong>Confirm the version.</strong> Check the control panel reports the driver you installed, not a Windows Update replacement that slipped in during the reboot.</li>
  <li><strong>Reset the display.</strong> Refresh rate, HDR and resolution frequently revert. So does any custom resolution or colour profile.</li>
  <li><strong>Re-apply the settings you rely on.</strong> Latency reduction, vertical sync behaviour, per-game profiles, scaling mode and any undervolt.</li>
  <li><strong>Test with something you know.</strong> Run a game you have played this week rather than a benchmark. You are checking for stability, not scores.</li>
  <li><strong>Pin the version.</strong> If the machine matters, turn off automatic driver delivery through Windows Update and update deliberately instead.</li>
</ul>
<h3>Stop reinstalling as a reflex</h3>
<p>A clean install is a diagnostic step, not maintenance. Doing it monthly does not keep a system healthy; it just resets your settings and hides the pattern behind whatever is genuinely failing. If you are reaching for DDU more than twice a year, the driver is probably not the problem — look at temperatures, power delivery under transient load, memory stability and any factory overclock before you wipe anything again.</p>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '06 · QUICK ANSWERS',
    faqHeading: 'Clean driver installs, briefly.',
    faqs: [
      [
        'Do I really need DDU to update my GPU driver?',
        'No. For a routine update, running the vendor installer over the top is fine, and both NVIDIA and AMD offer a clean option inside their own installer that resets driver state without Safe Mode. Reach for DDU when a driver install fails repeatedly, the control panel is broken, you switched GPU vendors, or a black screen appeared right after an update.',
      ],
      [
        'Should I disconnect from the internet before running DDU?',
        'Yes. If the machine is online after the removal, Windows Update can install a generic display driver before you install the one you downloaded, which forces you to repeat the process. Download the driver first, disconnect, remove, install, then reconnect.',
      ],
      [
        'Is DDU safe on a laptop?',
        'Usually, with one caution: on hybrid laptops the integrated and discrete drivers are paired, and removing the wrong one can leave you with no display output. Clean only the discrete GPU vendor, and check whether your laptop manufacturer ships its own modified driver package before installing a generic one.',
      ],
      [
        'Will a clean driver install improve my frame rate?',
        'Almost never. Clean installs fix broken driver state, not performance ceilings. If frame rates are low, look at graphics settings, thermal throttling, power limits, background applications and whether the game shipped a patch that changed its own performance.',
      ],
      [
        'Game Ready or Studio drivers, which should I use?',
        'Game Ready drivers are validated for new game releases and appear more often. Studio drivers change less frequently and are validated against creative applications. If you are not playing something released this month, Studio is the more stable default, and you can switch branches at any time.',
      ],
    ],
    related: [
      ['dlss-vs-fsr-vs-xess-upscaling.html', 'DLSS vs FSR vs XeSS: which upscaler to use'],
      ['reduce-input-lag-pc-gaming.html', 'Reduce input lag in the right order'],
      ['windows-11-debloat-safe-guide.html', 'Debloat Windows 11 without breaking it'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'Written by a developer who would rather explain a fix than sell you a cleaner utility.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'reduce-input-lag-pc-gaming.html',
    kicker: 'WORKSHOP—04 · DISPLAY & LATENCY · 10 MIN READ',
    title: 'How to Reduce Input Lag on PC: The Right Order · Nyxelium',
    ogTitle: 'How to Reduce Input Lag on PC, In the Order That Matters',
    description:
      'Where PC input lag actually comes from, the settings that remove the most of it, the frame cap arithmetic for VRR displays, and how to measure the result yourself.',
    twitterDescription:
      'The latency chain from click to photon, and the four settings that shorten it most.',
    keywords:
      'reduce input lag PC, NVIDIA Reflex, AMD Anti-Lag, frame cap G-Sync, VRR vsync settings, latency measurement PresentMon, gaming responsiveness',
    articleSection: 'Display and latency',
    audience: 'PC gamers tuning responsiveness',
    proficiency: 'Intermediate',
    headline: 'Input lag, fixed in the order that actually removes milliseconds.',
    deck: 'Most latency advice is a list of settings with no sense of scale. This one is ordered by how much each change is worth, from the render queue that costs tens of milliseconds down to the peripheral polling rate that costs one — including the frame-cap arithmetic that makes variable refresh behave.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Ordered by payoff',
      text: 'The first two sections contain most of the available improvement. The rest is refinement.',
      facts: [
        'ORDERED BY PAYOFF',
        'REFLEX · ANTI-LAG · XELL',
        'FRAME-CAP ARITHMETIC',
        'MEASUREMENT INCLUDED',
      ],
    },
    sections: [
      {
        id: 'chain',
        nav: 'Where lag comes from',
        label: '01 · THE CHAIN',
        title: 'Click to photon, and where the milliseconds hide.',
        body: `
<p class="lede">Input lag is the total time between moving your hand and the screen showing the result. It is a chain, and one link usually dominates the rest.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Stage</th><th>Typical cost</th><th>What controls it</th></tr>
    </thead>
    <tbody>
      <tr><td>Peripheral</td><td>1 to 8 ms</td><td>Polling rate, sensor, wireless implementation, switch debounce</td></tr>
      <tr><td>OS and game input handling</td><td>1 to 5 ms</td><td>Input processing, background CPU contention</td></tr>
      <tr><td>Render queue</td><td>0 to 60 ms</td><td>How many frames the CPU is allowed to run ahead of the GPU</td></tr>
      <tr><td>GPU render time</td><td>Frame time</td><td>Settings, resolution, GPU load</td></tr>
      <tr><td>Presentation</td><td>0 to 30 ms</td><td>Vertical sync behaviour, buffering, whether the frame waits for a refresh</td></tr>
      <tr><td>Display</td><td>1 to 20 ms</td><td>Panel processing, response time, overdrive, picture modes</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Look at the ranges rather than the totals.</strong> The render queue and presentation stages have the widest spread, which is exactly why they are worth fixing first. A better mouse saves a couple of milliseconds; an unbounded render queue at high GPU load can cost forty.</p>`,
      },
      {
        id: 'queue',
        nav: 'Stop rendering ahead',
        label: '02 · THE BIGGEST WIN',
        title: 'Stop the CPU running frames ahead of the GPU.',
        body: `
<p class="lede">When the GPU is fully loaded, the CPU keeps queuing frames it cannot yet draw. Every queued frame is input you have already given that the screen has not shown.</p>
<p>The fix has a vendor name on each platform: <strong>NVIDIA Reflex</strong>, <strong>AMD Anti-Lag</strong> and <strong>Intel XeLL</strong>. All three do essentially the same thing — keep the queue nearly empty by pacing the CPU to the GPU, so a frame is submitted just in time rather than early.</p>
<ul>
  <li><strong>In-game Reflex or Anti-Lag is the best version.</strong> The game itself knows when it sampled input, so an integrated implementation beats a driver-level approximation.</li>
  <li><strong>Use the driver setting when the game has none.</strong> Low Latency Mode set to Ultra, or the driver-level Anti-Lag, is the fallback.</li>
  <li><strong>Ignore the &ldquo;Boost&rdquo; variants unless you are GPU-limited and plugged in.</strong> They raise clocks at idle to shave a little more, at a real power cost.</li>
  <li><strong>It does nothing when you are CPU-limited.</strong> If the GPU is at 60 percent load, the queue was already short and there is nothing to drain.</li>
</ul>
<div class="note note-good">
  <p><strong>If you change one setting today, change this one.</strong> Enabling in-game Reflex or Anti-Lag in a GPU-limited game is routinely worth more than every other item in this guide combined.</p>
</div>`,
      },
      {
        id: 'frame-cap',
        nav: 'The frame cap',
        label: '03 · THE ARITHMETIC',
        title: 'Cap the frame rate below the refresh rate. Here is why.',
        body: `
<p class="lede">On a variable-refresh display, letting the frame rate reach the panel maximum pushes you back into the vertical-sync path you installed the display to avoid.</p>
<p>Variable refresh rate — G-Sync, FreeSync, VESA Adaptive-Sync — works by matching the panel to the frame rate. That only works inside the panel&rsquo;s range. Once the frame rate hits the ceiling, one of two things happens: with vertical sync on, frames wait, and latency jumps; with it off, the frame tears. A cap a few frames below the ceiling keeps you inside the variable range at all times.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Display refresh</th><th>Suggested cap</th><th>Notes</th></tr>
    </thead>
    <tbody>
      <tr><td>60 Hz</td><td>57 fps</td><td>Small headroom is enough at low refresh rates.</td></tr>
      <tr><td>120 Hz</td><td>116 fps</td><td>—</td></tr>
      <tr><td>144 Hz</td><td>138 fps</td><td>The classic case; three to six frames of headroom.</td></tr>
      <tr><td>240 Hz</td><td>232 fps</td><td>Headroom scales roughly with refresh rate.</td></tr>
      <tr><td>360 Hz and above</td><td>Refresh minus about 3 percent</td><td>At this point the queue matters far more than the cap.</td></tr>
    </tbody>
  </table>
</div>
<h3>The combination that works</h3>
<ul>
  <li><strong>Variable refresh: on</strong>, in both the driver and the display&rsquo;s own menu. Many panels ship with it disabled.</li>
  <li><strong>Vertical sync: on in the driver, off in the game.</strong> This sounds wrong and is the standard recommendation: the driver-level setting acts as a tear-preventing backstop that the frame cap keeps you from ever reaching.</li>
  <li><strong>Frame cap: set once, below the ceiling.</strong> Prefer the in-game limiter or the driver limiter; third-party limiters add their own overhead.</li>
  <li><strong>Latency reduction: on.</strong> It is what keeps the queue empty inside that arrangement.</li>
</ul>
<div class="note">
  <p><strong>A stable cap beats a higher average.</strong> A locked 116 fps feels better than an 95-to-144 swing, because your hands track frame-time consistency, not the number in the corner.</p>
</div>`,
      },
      {
        id: 'display',
        nav: 'Display and peripherals',
        label: '04 · THE HARDWARE ENDS',
        title: 'Small, real, and mostly free.',
        body: `
<h3>The display</h3>
<ul>
  <li><strong>Use the game or PC picture mode.</strong> Cinema and Vivid modes add processing. On a TV, game mode is frequently worth 20 to 80 ms on its own — the single largest hardware-side saving available to anyone playing on a television.</li>
  <li><strong>Turn off motion interpolation, noise reduction and dynamic contrast.</strong> All three buffer frames to work.</li>
  <li><strong>Set overdrive to the middle option.</strong> The most aggressive setting usually introduces overshoot artefacts and rarely helps latency.</li>
  <li><strong>Confirm the refresh rate is actually set.</strong> Windows regularly leaves a high-refresh panel at 60 Hz after a driver update or a cable change.</li>
</ul>
<h3>Peripherals</h3>
<ul>
  <li><strong>1000 Hz polling is enough.</strong> Beyond that, returns are tiny and CPU cost is real. Verify it is set rather than assuming.</li>
  <li><strong>Modern wireless is fine.</strong> A current low-latency wireless mouse is not the reason you lost the duel. Bluetooth for gaming input is a different story.</li>
  <li><strong>Turn off keyboard and mouse software effects that sync to the system.</strong> Lighting synchronisation can hold a CPU thread at surprising moments.</li>
  <li><strong>Plug into the motherboard, not a hub.</strong> Cheap hubs and unpowered docks add jitter, which is worse than a constant delay.</li>
</ul>`,
      },
      {
        id: 'not-helping',
        nav: 'What does not help',
        label: '05 · THE MYTHS',
        title: 'Five things that cost time and change nothing.',
        body: `
<div class="step-grid">
  <div class="step">
    <span class="step-num">MYTH—01</span>
    <strong>Registry latency tweaks</strong>
    <p>Copy-pasted registry bundles from forums mostly toggle settings that no longer exist. Some disable power management in ways that hurt.</p>
  </div>
  <div class="step">
    <span class="step-num">MYTH—02</span>
    <strong>Stripped-down Windows builds</strong>
    <p>Modified installation images trade a couple of milliseconds you cannot measure for missing security updates you will eventually need.</p>
  </div>
  <div class="step">
    <span class="step-num">MYTH—03</span>
    <strong>Disabling every service</strong>
    <p>On any modern multi-core CPU the background load is not your bottleneck. Close the overlay-heavy applications and stop there.</p>
  </div>
  <div class="step">
    <span class="step-num">MYTH—04</span>
    <strong>Frame generation for responsiveness</strong>
    <p>It raises smoothness and latency together. Excellent for a single-player game on a high-refresh panel, wrong for anything competitive.</p>
  </div>
  <div class="step">
    <span class="step-num">MYTH—05</span>
    <strong>Uncapped frame rates</strong>
    <p>Above your refresh ceiling, extra frames are discarded. You get heat, fan noise and a full render queue in exchange for nothing.</p>
  </div>
</div>`,
      },
      {
        id: 'measure',
        nav: 'Measure the result',
        label: '06 · MEASUREMENT',
        title: 'Confirm the change instead of believing it.',
        body: `
<p class="lede">Every setting on this page has a placebo twin. Measure before and after, or you are collecting folklore.</p>
<ul>
  <li><strong>In-game latency overlays.</strong> Games with Reflex integration frequently expose a render-latency figure directly. It is the easiest honest number available.</li>
  <li><strong>Vendor overlays.</strong> NVIDIA and AMD both surface a latency metric in their own overlay for supported titles.</li>
  <li><strong>PresentMon.</strong> Intel&rsquo;s open capture tool records frame times, present timing and stalls for any game. It is the right tool when you want data rather than a number on screen.</li>
  <li><strong>A phone camera.</strong> Record at a high frame rate, point it at mouse and monitor together, and count frames between the movement and the response. Crude, hardware-independent, and good enough to detect a 30 ms change.</li>
</ul>
<h3>Test it properly</h3>
<ul>
  <li>Change <strong>one</strong> setting at a time and re-measure.</li>
  <li>Use the same scene, the same graphics settings and a similar GPU load each run.</li>
  <li>Record the numbers. Latency differences below about 5 ms are not reliably perceptible, so a change that small is not worth keeping if it costs you anything else.</li>
  <li>Check frame-time consistency alongside the average. Stutter reads as lag even when the mean latency is unchanged.</li>
</ul>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '07 · QUICK ANSWERS',
    faqHeading: 'Input lag, briefly.',
    faqs: [
      [
        'What is the single best setting to reduce input lag?',
        'Enable the in-game latency reduction feature: NVIDIA Reflex, AMD Anti-Lag or Intel XeLL. When the GPU is fully loaded, it keeps the render queue nearly empty, which is where most avoidable latency accumulates. In a GPU-limited game it is usually worth more than every other change combined.',
      ],
      [
        'Should I cap my frame rate?',
        'On a variable refresh display, yes. Cap a few frames below the panel maximum, for example 138 fps on a 144 Hz display, so the frame rate stays inside the variable refresh range and never falls back to the vertical sync path. A stable cap also feels better than a fluctuating higher average.',
      ],
      [
        'Does V-Sync add input lag?',
        'Traditional vertical sync does, because frames wait for a refresh interval. The recommended arrangement on a variable refresh display is vertical sync enabled in the driver, disabled in the game, with a frame cap below the refresh ceiling. The cap means you never reach the point where vertical sync engages.',
      ],
      [
        'Is a wireless mouse worse for input lag?',
        'A modern low-latency gaming wireless mouse is effectively equivalent to a wired one, on the order of a millisecond or two. Bluetooth peripherals are a different case and are not suitable for latency-sensitive play. Either way, this stage of the chain is small compared with the render queue.',
      ],
      [
        'How do I measure input lag myself?',
        'Use an in-game or vendor overlay that reports render latency, capture frame timing with PresentMon, or record mouse and screen together with a high-frame-rate phone camera and count the frames between movement and response. Change one setting at a time and compare against a baseline in the same scene.',
      ],
    ],
    related: [
      ['dlss-vs-fsr-vs-xess-upscaling.html', 'DLSS vs FSR vs XeSS: which upscaler to use'],
      ['clean-gpu-driver-install-windows.html', 'Clean-install GPU drivers the safe way'],
      ['dlss-5-neural-rendering-guide.html', 'DLSS 5 neural rendering: the honest version'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'The same instinct applied to phones: fewer moving parts, nothing waiting on a server.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },
];
