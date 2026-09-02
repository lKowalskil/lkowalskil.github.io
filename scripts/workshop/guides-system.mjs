/* Workshop cluster 2 — Windows, privacy, backup and local AI. */

export const systemGuides = [
  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'windows-11-debloat-safe-guide.html',
    kicker: 'WORKSHOP—05 · WINDOWS & PRIVACY · 11 MIN READ',
    title: 'How to Debloat Windows 11 Without Breaking It · Nyxelium',
    ogTitle: 'How to Debloat Windows 11 Safely, Without Breaking It',
    description:
      'A reversible approach to Windows 11 debloating: which settings to change, which apps are safe to remove, how to judge a debloat script, and what to never touch.',
    twitterDescription:
      'Reversible Windows 11 debloating — what to change, what to remove, and what to leave alone.',
    keywords:
      'debloat Windows 11, remove preinstalled apps Windows, Windows 11 privacy settings, winget uninstall, disable telemetry Windows 11, Windows debloat script safety',
    articleSection: 'Windows and privacy',
    audience: 'Windows 11 users cleaning up a new machine',
    proficiency: 'Intermediate',
    headline: 'Debloat Windows 11 without inheriting somebody else&rsquo;s broken machine.',
    deck: 'The popular scripts remove hundreds of things at once, and the ones that matter are a small subset of that list. This is the reversible version: what to switch off in Settings, what is genuinely safe to uninstall, how to read a debloat script before you run it, and the five components that break Windows when removed.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Reversible first',
      text: 'Every step here can be undone without reinstalling Windows. That is the whole selection criterion.',
      facts: [
        'REVERSIBLE CHANGES ONLY',
        'WINGET APP REMOVAL',
        'FIVE THINGS TO KEEP',
        'RECOVERY PATH INCLUDED',
      ],
    },
    sections: [
      {
        id: 'definitions',
        nav: 'What debloat means',
        label: '01 · DEFINITIONS',
        title: 'Three different operations wear the same word.',
        body: `
<p class="lede">People say &ldquo;debloat&rdquo; and mean anything from turning off suggested content to deleting servicing components. The risk profile is completely different at each level.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Level</th><th>What it does</th><th>Reversible?</th><th>Worth it?</th></tr>
    </thead>
    <tbody>
      <tr><td>Configuration</td><td>Settings, policies and registry values: suggestions, ads, telemetry level, startup apps, lock screen content</td><td>Fully</td><td>Yes — nearly all the real benefit lives here</td></tr>
      <tr><td>App removal</td><td>Uninstalling preinstalled store apps you do not use</td><td>Yes, reinstall from the store or winget</td><td>Mostly cosmetic, occasionally frees real disk</td></tr>
      <tr><td>Component removal</td><td>Stripping servicing stack pieces, Defender, WinSxS, update infrastructure</td><td>No, generally requires a reinstall</td><td>No. This is what produces the machine that cannot take a feature update.</td></tr>
    </tbody>
  </table>
</div>
<p><strong>The useful part is the first row, and it is the part nobody makes videos about</strong>, because switching off six settings is not dramatic. The dramatic scripts operate in the third row, and the cost arrives six months later when a cumulative update fails with an error code nobody can search.</p>
<div class="note">
  <p><strong>Set a restore point before anything.</strong> System Protection is off by default on many installations. Turn it on, create a point, and name it after what you are about to do. Two minutes now, versus reinstalling later.</p>
</div>`,
      },
      {
        id: 'settings',
        nav: 'Start in Settings',
        label: '02 · THE SAFE LAYER',
        title: 'Twelve switches that account for most of the annoyance.',
        body: `
<p class="lede">Before any script, spend ten minutes in Settings. This is the layer Microsoft supports, which means it survives feature updates instead of being silently restored by them.</p>
<h3>Privacy and content</h3>
<ul>
  <li><strong>Privacy and security &rarr; General:</strong> turn off the advertising ID, personalised ads, suggested content and app-launch tracking.</li>
  <li><strong>Privacy and security &rarr; Diagnostics:</strong> set diagnostic data to the required level, turn off tailored experiences, and clear the collected data once.</li>
  <li><strong>Personalisation &rarr; Lock screen:</strong> replace Windows Spotlight with a static picture to remove the promotional cards.</li>
  <li><strong>Personalisation &rarr; Start:</strong> disable recommendations, recently added apps and tips.</li>
  <li><strong>Personalisation &rarr; Device usage:</strong> clear every category. It only exists to shape suggestions.</li>
  <li><strong>System &rarr; Notifications:</strong> at the bottom, turn off the suggestions, tips and setup prompts. These are the notifications people mistake for malware.</li>
</ul>
<h3>Performance and behaviour</h3>
<ul>
  <li><strong>Apps &rarr; Startup:</strong> the highest-value screen in the whole system. Disable everything you did not deliberately install, especially updaters and launcher helpers.</li>
  <li><strong>Search permissions:</strong> turn off cloud content search and search history if you do not want web results in the Start menu.</li>
  <li><strong>Widgets and the taskbar:</strong> remove what you do not use — widgets, chat, task view, search box.</li>
  <li><strong>Power mode:</strong> set Best performance on a desktop; leave Balanced on a laptop unless you enjoy explaining the battery life to yourself.</li>
  <li><strong>Storage sense:</strong> enable it, then configure it. It removes temp files and old downloads on a schedule, which is the cleanup people install third-party tools for.</li>
  <li><strong>Delivery optimisation:</strong> restrict update sharing to the local network, or turn it off, if upload bandwidth matters to you.</li>
</ul>
<div class="note note-good">
  <p><strong>Stop here if the machine is for work.</strong> Everything above is supported, reversible and update-safe. The remaining sections trade increasing amounts of that safety for decreasing amounts of benefit.</p>
</div>`,
      },
      {
        id: 'apps',
        nav: 'Removing apps',
        label: '03 · APP REMOVAL',
        title: 'Uninstall properly, and know the five you should keep.',
        body: `
<p class="lede">Preinstalled apps are mostly small. Removing them is about not seeing them, not about reclaiming disk space — with a couple of genuine exceptions.</p>
<p>Two supported routes: right-click and uninstall in the Start menu, or the package manager. The package manager is better because it is scriptable, repeatable on the next machine, and reversible with the same tool.</p>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · LIST AND REMOVE WITH WINGET</div>
  <pre><code># See what is installed, with the exact package IDs
winget list

# Remove a specific package by ID
winget uninstall --id Microsoft.Teams

# Reinstall it later if you were wrong
winget install --id Microsoft.Teams

# Export your whole install list before you start changing things
winget export --output C:\\backup\\installed-apps.json</code></pre>
</div>
<p>That last command is the point of using winget at all: an exported list is both a record of what you removed and the fastest way to rebuild the machine later with <code>winget import</code>.</p>
<h3>What not to remove</h3>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Component</th><th>Why people remove it</th><th>What actually breaks</th></tr>
    </thead>
    <tbody>
      <tr><td>Microsoft Store</td><td>Looks like bloat</td><td>App updates stop, including apps you rely on. Restoring it is awkward.</td></tr>
      <tr><td>Windows Security / Defender</td><td>Performance folklore</td><td>You are unprotected, and some third-party suites refuse to install cleanly afterwards.</td></tr>
      <tr><td>Microsoft Edge</td><td>Browser preference</td><td>Parts of the OS render web content through it: help pages, PDF handling, some sign-in flows.</td></tr>
      <tr><td>Windows Update components</td><td>To stop reboots</td><td>Security updates stop arriving. Use active hours and pause instead.</td></tr>
      <tr><td>.NET and Visual C++ runtimes</td><td>They look duplicated</td><td>They are not duplicates. Applications fail to launch with cryptic missing-DLL errors.</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Reasonable removals</strong>, by contrast, are the store-delivered extras: Xbox companion apps on a work machine, Clipchamp, the news and weather apps, third-party trials preinstalled by the laptop manufacturer, and duplicated OEM utilities that shadow features Windows already has.</p>`,
      },
      {
        id: 'scripts',
        nav: 'Judging a script',
        label: '04 · TOOLS AND SCRIPTS',
        title: 'How to read a debloat script before you run it.',
        body: `
<p class="lede">Some of these tools are genuinely well made. The problem is not the tools, it is running one whose defaults you have never read on a machine you depend on.</p>
<h3>The categories</h3>
<ul>
  <li><strong>Privacy configurators</strong> — tools that toggle documented settings and policies, usually with an undo. Low risk, and often the fastest way to apply the section above consistently.</li>
  <li><strong>Tweak collections with a menu</strong> — broad utilities that bundle app removal, service changes and installers. Fine if you select items deliberately; risky as a one-click preset.</li>
  <li><strong>Aggressive removal scripts</strong> — anything that strips components, disables Defender or edits the servicing stack. This is where unrecoverable machines come from.</li>
  <li><strong>Modified Windows images</strong> — pre-stripped installation media. You are trusting an anonymous build with your entire operating system, and you will not get feature updates cleanly.</li>
</ul>
<h3>Five checks before you run anything</h3>
<div class="step-grid">
  <div class="step">
    <span class="step-num">CHECK—01</span>
    <strong>Is the source open?</strong>
    <p>You should be able to read what it changes. A closed binary that promises to optimise Windows is not a tool, it is a wish.</p>
  </div>
  <div class="step">
    <span class="step-num">CHECK—02</span>
    <strong>Is there an undo?</strong>
    <p>Good configurators record the previous value and can restore it. If a tool cannot revert, treat every change as permanent.</p>
  </div>
  <div class="step">
    <span class="step-num">CHECK—03</span>
    <strong>Does it touch Defender or Update?</strong>
    <p>Either one is a red flag on a machine you use for real work. Skip that section, whatever the tool claims about performance.</p>
  </div>
  <div class="step">
    <span class="step-num">CHECK—04</span>
    <strong>Are the defaults selected for you?</strong>
    <p>A preset that ticks 200 boxes is not a considered configuration. Deselect everything and choose deliberately.</p>
  </div>
  <div class="step">
    <span class="step-num">CHECK—05</span>
    <strong>Did you test on something disposable?</strong>
    <p>A virtual machine or a spare laptop first. If you would not run it on a client&rsquo;s machine, do not run it on yours.</p>
  </div>
</div>
<div class="note note-warn">
  <p><strong>Never run a script you found in a video description as administrator without reading it.</strong> The elevated-PowerShell one-liner is the single most effective malware delivery mechanism aimed at enthusiasts, precisely because the audience is used to running exactly that.</p>
</div>`,
      },
      {
        id: 'performance',
        nav: 'Real performance wins',
        label: '05 · ACTUAL SPEED',
        title: 'What genuinely makes a Windows machine faster.',
        body: `
<p class="lede">Debloating is about annoyance, not speed. If the machine feels slow, the cause is almost always on this list instead.</p>
<ul>
  <li><strong>Startup and background applications.</strong> Six updaters, two cloud clients and a launcher matter far more than any preinstalled store app that never runs.</li>
  <li><strong>Storage.</strong> A mechanical drive holding the system is the single biggest cause of a slow modern PC. A full SSD is the second — keep 10 to 15 percent free.</li>
  <li><strong>Memory pressure.</strong> Check the memory tab under load rather than at idle. Sustained high commit with disk activity is the pattern behind everything-freezes-for-a-second.</li>
  <li><strong>Thermals and power limits.</strong> A laptop on a soft surface throttles. So does a desktop with three years of dust in the cooler.</li>
  <li><strong>Chipset and storage drivers.</strong> Frequently still the generic ones from installation. Vendor packages are worth installing once and then leaving alone.</li>
  <li><strong>Antivirus stacking.</strong> Two real-time scanners fighting over the same file system is a genuine, measurable slowdown. Pick one.</li>
  <li><strong>Browser tabs and extensions.</strong> Usually the largest single consumer of memory on the machine, and the easiest thing to blame on Windows instead.</li>
</ul>
<div class="note">
  <p><strong>Measure before and after.</strong> Task Manager and Resource Monitor answer the question that matters — what is using the machine right now — and they are already installed. A subjective &ldquo;feels snappier&rdquo; after a 300-change script tells you nothing about which change helped.</p>
</div>`,
      },
      {
        id: 'recovery',
        nav: 'Getting back',
        label: '06 · RECOVERY',
        title: 'If something is already broken.',
        body: `
<p class="lede">In rough order: least destructive first. Work down this list, not up it.</p>
<div class="cmd">
  <div class="cmd-head">POWERSHELL (ADMIN) · REPAIR SYSTEM FILES</div>
  <pre><code># Repair the component store from Windows Update
DISM /Online /Cleanup-Image /RestoreHealth

# Then verify and repair protected system files
sfc /scannow

# Reinstall the built-in apps for the current user
Get-AppxPackage -AllUsers | ForEach-Object {
  Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\\AppXManifest.xml"
}</code></pre>
</div>
<ul>
  <li><strong>System Restore</strong> — if you made the restore point suggested at the top, this is the whole recovery.</li>
  <li><strong>DISM, then SFC</strong> — in that order. SFC repairs from the component store, so a damaged store must be fixed first.</li>
  <li><strong>Re-register the built-in apps</strong> — the command above restores Start menu entries and store apps that a script removed per user.</li>
  <li><strong>Repair install</strong> — run setup from a current Windows ISO and choose to keep files and apps. This replaces the OS while preserving your data and installed programs, and it fixes almost everything short of component removal.</li>
  <li><strong>Clean install</strong> — the honest endpoint if a script stripped servicing components. Restore from the backup you made first.</li>
</ul>
<p>If you are reading this section because a one-click optimiser broke something: start at the repair install. It is faster than three evenings of forum archaeology, and you keep your applications.</p>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '07 · QUICK ANSWERS',
    faqHeading: 'Debloating Windows 11, briefly.',
    faqs: [
      [
        'Is debloating Windows 11 safe?',
        'Configuration changes are safe and reversible: privacy settings, startup apps, notifications, suggested content and lock screen items. Uninstalling preinstalled store apps is also safe and reversible through winget or the Microsoft Store. Removing system components such as Defender, Windows Update infrastructure or servicing files is not safe and usually requires a reinstall to undo.',
      ],
      [
        'Does debloating make Windows faster?',
        'Rarely by much. Preinstalled apps that never run do not consume CPU. Real speed problems come from startup and background applications, a nearly full or mechanical system drive, thermal throttling, memory pressure and overlapping antivirus software. Fix those first and the debloating question mostly disappears.',
      ],
      [
        'Which Windows 11 apps are safe to uninstall?',
        'Store-delivered extras you do not use: Xbox companion apps on a work machine, Clipchamp, news and weather apps, and manufacturer trial software. Keep the Microsoft Store, Windows Security, Edge, Windows Update components and the .NET and Visual C++ runtimes, because other software depends on them in ways that are not obvious until something fails.',
      ],
      [
        'Should I run a debloat script from GitHub?',
        'Only after reading what it changes, deselecting the presets, and testing on a machine you can afford to reinstall. Prefer open-source tools that record previous values so changes can be reverted, and skip any section that touches Windows Defender or Windows Update. Never run an elevated one-liner from a video description unreviewed.',
      ],
      [
        'How do I undo a debloat script?',
        'Try in this order: System Restore if you created a point, then DISM RestoreHealth followed by sfc scannow, then re-registering the built-in apps with PowerShell. If system components were removed, run a repair install from a current Windows ISO with the keep files and apps option, which replaces the operating system without losing your data.',
      ],
    ],
    related: [
      ['local-backup-3-2-1-guide.html', 'A 3-2-1 backup you will actually run'],
      ['wsl2-setup-windows-guide.html', 'Set up WSL2 properly on Windows'],
      ['clean-gpu-driver-install-windows.html', 'Clean-install GPU drivers the safe way'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'Apps built on the same preference: no background noise, no account, nothing running that you did not ask for.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'wsl2-setup-windows-guide.html',
    kicker: 'WORKSHOP—06 · DEVELOPER SETUP · 11 MIN READ',
    title: 'WSL2 on Windows: Setup, Tuning and Pitfalls · Nyxelium',
    ogTitle: 'WSL2 on Windows: Setup, Tuning and the Pitfalls Nobody Mentions',
    description:
      'Install WSL2, size its memory and CPU properly, avoid the filesystem mistake that halves performance, and wire it into VS Code, Git, Docker and SSH.',
    twitterDescription:
      'A WSL2 setup that stays fast: memory limits, the filesystem rule, and toolchain integration.',
    keywords:
      'WSL2 setup, install WSL Windows 11, wslconfig memory limit, WSL filesystem performance, WSL VS Code remote, Docker WSL2 backend, Linux on Windows',
    articleSection: 'Developer tooling',
    audience: 'Developers working on Windows',
    proficiency: 'Intermediate',
    headline: 'A WSL2 setup that stays fast after the first week.',
    deck: 'Installing WSL2 takes one command. Keeping it from eating your memory, and avoiding the filesystem mistake that quietly halves every build, takes about fifteen minutes more. This covers the install, the configuration file most people never create, and how it connects to the rest of your toolchain.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Windows 10 and 11',
      text: 'One command to install, one file to configure, one rule about where your code lives.',
      facts: [
        'WINDOWS 10 AND 11',
        'WSLCONFIG TEMPLATE',
        'THE FILESYSTEM RULE',
        'VS CODE · DOCKER · GPU',
      ],
    },
    howTo: {
      name: 'Install and configure WSL2 on Windows',
      description:
        'Install the Windows Subsystem for Linux, choose a distribution, and configure resource limits so it does not exhaust host memory.',
      totalTime: 'PT20M',
      anchor: 'install',
      tools: ['Windows 10 or 11', 'PowerShell as administrator'],
      steps: [
        ['Install WSL', 'Run wsl --install from an elevated PowerShell prompt, which enables the required features and installs a default distribution.'],
        ['Restart and create a user', 'Restart the machine, then set the Linux username and password when the distribution first launches.'],
        ['Confirm version 2', 'Run wsl -l -v and confirm the distribution reports version 2.'],
        ['Create a .wslconfig file', 'Create .wslconfig in your Windows user profile and set memory, processor and swap limits.'],
        ['Restart the subsystem', 'Run wsl --shutdown so the new configuration is applied on the next launch.'],
        ['Keep projects on the Linux filesystem', 'Store repositories under the Linux home directory rather than under /mnt/c to avoid the cross-filesystem performance penalty.'],
      ],
    },
    sections: [
      {
        id: 'when',
        nav: 'When to use WSL2',
        label: '01 · THE DECISION',
        title: 'WSL2 is a real Linux kernel in a lightweight VM.',
        body: `
<p class="lede">WSL1 translated Linux system calls into Windows ones. WSL2 runs an actual Linux kernel in a managed virtual machine, which is why compatibility is excellent and why the filesystem boundary matters so much.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Situation</th><th>Best fit</th><th>Because</th></tr>
    </thead>
    <tbody>
      <tr><td>Node, Python, Go or Rust development targeting Linux servers</td><td>WSL2</td><td>Same toolchain as production, near-native speed, no dual boot</td></tr>
      <tr><td>Docker on a Windows workstation</td><td>WSL2</td><td>The WSL2 backend is how containers run on Windows now</td></tr>
      <tr><td>Windows desktop applications, .NET, native Windows APIs</td><td>Native Windows</td><td>WSL adds a boundary you would spend the day crossing</td></tr>
      <tr><td>Kernel work, custom modules, systemd-heavy infrastructure</td><td>A full VM</td><td>WSL2 constrains what you can change about the kernel</td></tr>
      <tr><td>GPU compute and machine learning experiments</td><td>WSL2</td><td>CUDA and compute pass through, with the caveats in section five</td></tr>
      <tr><td>Anything requiring strong isolation</td><td>A full VM</td><td>WSL is integrated with the host by design, which is the opposite of isolation</td></tr>
    </tbody>
  </table>
</div>`,
      },
      {
        id: 'install',
        nav: 'Install it',
        label: '02 · INSTALLATION',
        title: 'One command, then confirm you got version 2.',
        body: `
<div class="cmd">
  <div class="cmd-head">POWERSHELL (ADMIN) · INSTALL</div>
  <pre><code># Enables the features and installs the default distribution
wsl --install

# Or pick one explicitly
wsl --list --online
wsl --install -d Ubuntu-24.04

# After the reboot, confirm the version column says 2
wsl -l -v

# Keep the subsystem itself updated
wsl --update</code></pre>
</div>
<h3>Choosing a distribution</h3>
<ul>
  <li><strong>Ubuntu LTS</strong> — the default for a reason. The largest share of documentation and CI images assume it, so error messages match search results.</li>
  <li><strong>Debian</strong> — leaner, slower moving. Good when your servers run Debian.</li>
  <li><strong>Fedora or openSUSE</strong> — newer toolchains, more churn. Fine if you already know the ecosystem.</li>
  <li><strong>Alpine</strong> — tempting for size, awkward for development because of the musl C library. Use it in containers, not as your workstation shell.</li>
</ul>
<p>You can install several side by side and switch with <code>wsl -d name</code>. A per-project distribution is a legitimate way to keep two incompatible toolchains apart, and each one is a file you can export and re-import.</p>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · SNAPSHOT AND RESTORE A DISTRIBUTION</div>
  <pre><code># Export a distribution to a single archive
wsl --export Ubuntu-24.04 D:\\wsl\\ubuntu-backup.tar

# Re-import it, under any name, on any machine
wsl --import work-ubuntu D:\\wsl\\work D:\\wsl\\ubuntu-backup.tar</code></pre>
</div>`,
      },
      {
        id: 'config',
        nav: 'Configure resources',
        label: '03 · THE CONFIG FILE',
        title: 'Create .wslconfig before WSL eats your memory.',
        body: `
<p class="lede">By default WSL2 will claim a large share of system RAM and is slow to give it back. On a 16 GB machine, that is the difference between a usable desktop and one that swaps whenever a build starts.</p>
<p>Create <code>.wslconfig</code> in your Windows user profile — <code>C:\\Users\\yourname\\.wslconfig</code> — and restart the subsystem with <code>wsl --shutdown</code>.</p>
<div class="cmd">
  <div class="cmd-head">C:\\USERS\\YOURNAME\\.WSLCONFIG</div>
  <pre><code>[wsl2]
# Roughly half of physical RAM is a sane starting point
memory=8GB
processors=4
swap=4GB

# Reclaim unused memory back to Windows instead of holding it
autoMemoryReclaim=gradual

# Sparse VHD keeps the virtual disk from growing forever
sparseVhd=true

# Mirrored networking makes localhost work in both directions
networkingMode=mirrored
dnsTunneling=true
autoProxy=true

[experimental]
hostAddressLoopback=true</code></pre>
</div>
<h3>Choosing the numbers</h3>
<ul>
  <li><strong>Memory</strong> — about half of physical RAM. Raise it if builds are being killed, lower it if Windows starts paging.</li>
  <li><strong>Processors</strong> — leave at least two cores for Windows. All of them is not faster once the host starts contending.</li>
  <li><strong>Swap</strong> — worth having. Without it, an out-of-memory situation kills the process instead of slowing down.</li>
  <li><strong>Networking</strong> — mirrored mode makes services reachable on localhost from both sides, which removes the most common WSL networking confusion. If a VPN or corporate network client misbehaves, remove that line first.</li>
</ul>
<div class="note">
  <p><strong>The virtual disk grows but does not shrink on its own.</strong> With <code>sparseVhd</code> enabled, new distributions release space back after large deletions. For an existing one, <code>wsl --manage &lt;distro&gt; --set-sparse true</code> converts it.</p>
</div>`,
      },
      {
        id: 'filesystem',
        nav: 'The filesystem rule',
        label: '04 · THE ONE BIG MISTAKE',
        title: 'Keep your code on the Linux side. All of it.',
        body: `
<p class="lede">This is the single most common WSL2 performance complaint, and it has one cause: working on files that live on the Windows drive, accessed through /mnt/c.</p>
<p>Crossing the filesystem boundary goes through a network protocol. For a compiler or a package manager touching thousands of small files, the overhead is severe — installs and builds that should take seconds take minutes, and file watchers become unreliable.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Where the files live</th><th>Accessed from</th><th>Speed</th></tr>
    </thead>
    <tbody>
      <tr><td>Linux filesystem (~/projects)</td><td>Linux tools</td><td>Native. This is the correct arrangement.</td></tr>
      <tr><td>Windows filesystem (C:\\projects)</td><td>Windows tools</td><td>Native. Also fine.</td></tr>
      <tr><td>Windows filesystem (/mnt/c/projects)</td><td>Linux tools</td><td>Slow. This is the mistake.</td></tr>
      <tr><td>Linux filesystem (\\\\wsl$\\...)</td><td>Windows tools</td><td>Usable for editing, slow for bulk operations.</td></tr>
    </tbody>
  </table>
</div>
<div class="cmd">
  <div class="cmd-head">BASH · MOVE A PROJECT ONTO THE LINUX FILESYSTEM</div>
  <pre><code>mkdir -p ~/projects
cd ~/projects
git clone git@github.com:you/your-project.git
cd your-project

# Open it in VS Code on Windows, running the server inside WSL
code .</code></pre>
</div>
<p>You can still reach these files from Windows through <code>\\\\wsl$\\Ubuntu-24.04\\home\\you\\projects</code> — good for dropping a file into Explorer, wrong for running a Windows build tool against the whole tree.</p>
<div class="note note-warn">
  <p><strong>Never run Windows antivirus real-time scanning across your WSL project directory.</strong> Scanning through the filesystem bridge on every file operation is a large, invisible tax on every build. Exclude the WSL virtual disk path, not the individual folders.</p>
</div>`,
      },
      {
        id: 'toolchain',
        nav: 'Toolchain integration',
        label: '05 · WIRING IT UP',
        title: 'Editor, Git, containers, keys and the GPU.',
        body: `
<h3>VS Code</h3>
<p>Install the WSL extension on Windows and run <code>code .</code> from inside the Linux shell. The editor UI stays on Windows while the language servers, terminal, debugger and extensions run in Linux — which means the extensions see the same toolchain your build does. Trying to open a project through <code>\\\\wsl$</code> instead is the setup that produces mysteriously broken IntelliSense.</p>
<h3>Git</h3>
<ul>
  <li>Install and configure Git <strong>inside</strong> WSL, and use it for anything in the Linux filesystem.</li>
  <li>Set <code>git config --global core.autocrlf input</code> in Linux so you do not commit Windows line endings.</li>
  <li>Sharing a credential helper with Windows works, but a plain SSH key inside WSL is simpler and has fewer failure modes.</li>
</ul>
<h3>Docker</h3>
<p>Docker Desktop uses WSL2 as its backend and exposes the <code>docker</code> command inside your distributions. If you would rather not run Docker Desktop, you can install the Docker engine directly inside a WSL distribution — the <a href="docker-desktop-alternatives-windows.html">container alternatives guide</a> covers when that is worth the extra setup.</p>
<h3>SSH keys</h3>
<div class="cmd">
  <div class="cmd-head">BASH · A KEY THAT LIVES IN WSL</div>
  <pre><code>ssh-keygen -t ed25519 -C "you@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub   # add this to GitHub</code></pre>
</div>
<p>Keep the Linux key separate from your Windows key rather than sharing one across the boundary. Two keys on one account is normal, and it means revoking one does not lock you out of both environments.</p>
<h3>GPU compute</h3>
<p>CUDA workloads run in WSL2 with the Windows driver providing the GPU — you install the CUDA toolkit inside Linux, but <strong>not</strong> a Linux display driver. Installing one is the classic mistake and breaks the passthrough. This is what makes WSL2 a reasonable place to run local models; see the <a href="run-local-llm-offline-guide.html">local LLM guide</a> for the hardware side.</p>`,
      },
      {
        id: 'troubleshooting',
        nav: 'Troubleshooting',
        label: '06 · WHEN IT MISBEHAVES',
        title: 'The six failures you will actually hit.',
        body: `
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Symptom</th><th>Usual cause</th><th>Fix</th></tr>
    </thead>
    <tbody>
      <tr><td>Everything is slow</td><td>Project files under /mnt/c</td><td>Move the repository into the Linux home directory</td></tr>
      <tr><td>Windows swaps under load</td><td>No memory limit configured</td><td>Set memory and processors in .wslconfig, then wsl --shutdown</td></tr>
      <tr><td>Cannot reach a WSL service from Windows</td><td>Networking mode</td><td>Enable mirrored networking, or bind the service to 0.0.0.0</td></tr>
      <tr><td>DNS fails, especially on a VPN</td><td>Generated resolv.conf conflicts with the VPN</td><td>Enable dnsTunneling, or set generateResolvConf to false and write your own</td></tr>
      <tr><td>Virtual disk keeps growing</td><td>Sparse mode disabled</td><td>wsl --manage distro --set-sparse true</td></tr>
      <tr><td>File watching does not trigger</td><td>Cross-filesystem inotify</td><td>Same fix as the first row; watchers only work reliably on the native side</td></tr>
    </tbody>
  </table>
</div>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · THE RESET SEQUENCE</div>
  <pre><code># Stop everything (this is the fix for a surprising number of issues)
wsl --shutdown

# Update the subsystem itself
wsl --update

# Check state and versions
wsl -l -v

# Last resort for one distribution: export, unregister, re-import
wsl --export Ubuntu-24.04 D:\\wsl\\backup.tar
wsl --unregister Ubuntu-24.04</code></pre>
</div>
<p><strong>Export before you unregister.</strong> Unregistering deletes the distribution and everything in it, without a confirmation worth the name.</p>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '07 · QUICK ANSWERS',
    faqHeading: 'WSL2, briefly.',
    faqs: [
      [
        'Why is WSL2 so slow for my project?',
        'Almost always because the project files live on the Windows drive and are accessed from Linux through /mnt/c. Crossing that boundary goes through a network protocol, which is punishing for tools that touch thousands of small files. Move the repository into the Linux home directory and the problem disappears.',
      ],
      [
        'How much memory should I give WSL2?',
        'Roughly half of physical RAM is a reasonable starting point, set in a .wslconfig file in your Windows user profile. Also set a processor count that leaves at least two cores for Windows, and enable swap so an out-of-memory situation slows down rather than killing the process. Run wsl --shutdown for changes to apply.',
      ],
      [
        'Can I run Docker without Docker Desktop on WSL2?',
        'Yes. You can install the Docker engine directly inside a WSL distribution and use it from that shell. Docker Desktop adds convenience such as the GUI, Kubernetes and easier cross-distribution sharing, so the plain engine is best when you want a lighter setup or need to avoid the Desktop licence terms.',
      ],
      [
        'Does WSL2 support GPU acceleration?',
        'Yes, for compute. The Windows GPU driver provides passthrough, and you install the CUDA toolkit inside Linux without a Linux display driver. Installing a Linux graphics driver inside WSL breaks the passthrough, which is the most common mistake in this setup.',
      ],
      [
        'Is WSL2 a replacement for a virtual machine?',
        'For development work targeting Linux, usually yes, and it is faster to start and lighter on resources. For kernel development, custom modules, systemd-heavy infrastructure or anything requiring real isolation from the host, use a full virtual machine — WSL is deliberately integrated with Windows rather than separated from it.',
      ],
    ],
    related: [
      ['install-nodejs-windows-nvm.html', 'Install Node.js the way that survives version changes'],
      ['docker-desktop-alternatives-windows.html', 'Docker Desktop alternatives on Windows'],
      ['git-ssh-keys-github-guide.html', 'SSH keys and signed commits for GitHub'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'Built on Windows, shipped to Android, written by someone who spends the day in this exact setup.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'local-backup-3-2-1-guide.html',
    kicker: 'WORKSHOP—07 · DATA & BACKUP · 10 MIN READ',
    title: 'A 3-2-1 Backup Plan You Will Actually Run · Nyxelium',
    ogTitle: 'A 3-2-1 Backup Plan You Will Actually Run',
    description:
      'What 3-2-1 means in practice, the four failure modes a backup must survive, a concrete Windows setup with real tools, and the restore test everyone skips.',
    twitterDescription:
      'Backups that survive ransomware and human error, not just a dead drive — with a concrete setup.',
    keywords:
      '3-2-1 backup rule, Windows backup strategy, ransomware resistant backup, restic kopia duplicati, offsite backup encryption, restore test, versioned backup',
    articleSection: 'Data and backup',
    audience: 'Anyone responsible for their own files',
    proficiency: 'Beginner',
    headline: 'A backup plan that survives the ways data actually disappears.',
    deck: 'Most people have a copy of their files somewhere and call it a backup. Then the failure arrives as accidental deletion synced to every device, or as ransomware that encrypts the external drive too. This is what 3-2-1 means once you take those cases seriously, and a setup you can finish this evening.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Finish it tonight',
      text: 'One local versioned target, one encrypted offsite copy, one restore test. That is the whole plan.',
      facts: [
        '3-2-1-1-0 EXPLAINED',
        'FOUR FAILURE MODES',
        'WORKING RESTIC EXAMPLES',
        'RESTORE TEST INCLUDED',
      ],
    },
    sections: [
      {
        id: 'rule',
        nav: 'What 3-2-1 means',
        label: '01 · THE RULE',
        title: 'Three copies, two media, one off site — and two extra digits.',
        body: `
<p class="lede">The classic rule is a memory aid for surviving correlated failures. The modern extension exists because ransomware made two of the original assumptions optimistic.</p>
<ul>
  <li><strong>3 copies</strong> of the data — the live one plus two backups.</li>
  <li><strong>2 different media or devices</strong>, so a single controller, drive model or enclosure cannot take out everything.</li>
  <li><strong>1 copy off site</strong>, because fire, theft and flood do not respect a shelf.</li>
  <li><strong>1 copy offline or immutable</strong> — disconnected, append-only or write-protected. This is the anti-ransomware digit.</li>
  <li><strong>0 errors on restore</strong>, verified by an actual test rather than a green tick in a status window.</li>
</ul>
<div class="note">
  <p><strong>Synchronisation is not backup.</strong> A cloud sync folder faithfully propagates deletion and encryption to every device within seconds. It is excellent availability and it is not a backup, unless you are deliberately using its version history — and you have checked how far back that history goes.</p>
</div>`,
      },
      {
        id: 'scope',
        nav: 'Decide what matters',
        label: '02 · SCOPE',
        title: 'Back up what you cannot recreate. Skip the rest.',
        body: `
<p class="lede">Backing up everything is how backups become slow, expensive and eventually abandoned. Sort your data by whether the internet can replace it.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Category</th><th>Examples</th><th>Priority</th></tr>
    </thead>
    <tbody>
      <tr><td>Irreplaceable</td><td>Photos, video, documents, scans, letters, financial records, creative project files</td><td>Every copy, every rule, no exceptions</td></tr>
      <tr><td>Expensive to rebuild</td><td>Configuration, dotfiles, password vault export, licence keys, signing keys, VM images</td><td>Back up. Small, and a nightmare to reconstruct.</td></tr>
      <tr><td>Reproducible with effort</td><td>Code with a remote, edited exports, downloaded datasets</td><td>Local copy is usually enough</td></tr>
      <tr><td>Freely replaceable</td><td>Installers, games, cached media, node_modules and build output</td><td>Exclude. This is what makes backups too big to run.</td></tr>
    </tbody>
  </table>
</div>
<h3>The items people forget until it is too late</h3>
<ul>
  <li><strong>Password manager recovery material</strong> — the emergency kit or export, stored somewhere that does not require the password manager to reach.</li>
  <li><strong>Two-factor recovery codes</strong> — printed. If they live only on the phone you lost, the backup does not help you.</li>
  <li><strong>Android and iOS keystores or signing certificates</strong> — losing an app signing key means you cannot update your own published app.</li>
  <li><strong>Browser profile bookmarks and extension configuration</strong> — small, and irritating to rebuild.</li>
  <li><strong>The list of installed software</strong> — a package manager export takes seconds and saves an entire afternoon.</li>
</ul>`,
      },
      {
        id: 'failures',
        nav: 'Four failure modes',
        label: '03 · THREAT MODEL',
        title: 'A backup that only survives dead hardware is half a backup.',
        body: `
<div class="step-grid">
  <div class="step">
    <span class="step-num">MODE—01</span>
    <strong>Hardware failure</strong>
    <p>A drive dies. Any second copy solves this, which is why it is the only case most setups actually cover.</p>
  </div>
  <div class="step">
    <span class="step-num">MODE—02</span>
    <strong>Human error</strong>
    <p>You delete or overwrite something and notice three weeks later. Only <em>versioned</em> backups with enough retention survive this.</p>
  </div>
  <div class="step">
    <span class="step-num">MODE—03</span>
    <strong>Malicious encryption</strong>
    <p>Ransomware encrypts everything reachable, including the always-connected external drive and mapped network shares. Only offline or immutable copies survive.</p>
  </div>
  <div class="step">
    <span class="step-num">MODE—04</span>
    <strong>Location loss</strong>
    <p>Fire, flood, theft. Only the off-site copy survives, which is the digit people skip because it feels unlikely right up until it is not.</p>
  </div>
</div>
<p><strong>Check your current setup against all four.</strong> An external drive that stays plugged in covers exactly one of them. That is the most common backup arrangement in the world, and it is the one ransomware was designed to defeat.</p>`,
      },
      {
        id: 'setup',
        nav: 'A concrete setup',
        label: '04 · THE BUILD',
        title: 'One local target, one off site, both versioned.',
        body: `
<p class="lede">This is a specific arrangement rather than a survey. Substitute tools freely — the shape is what matters.</p>
<h3>Layer 1 — versioned local backup</h3>
<ul>
  <li><strong>An external drive that is not always connected.</strong> Plug it in for the run, unplug it afterwards. That single habit converts the drive from a ransomware target into an offline copy.</li>
  <li><strong>A deduplicating, versioned backup tool</strong> such as Restic, Kopia, Duplicati or a vendor agent. Deduplication is what makes daily snapshots affordable; versioning is what saves you from mode 02.</li>
  <li><strong>Keep a sensible retention window:</strong> daily for a fortnight, weekly for a couple of months, monthly for a year. Cheap, and it covers the mistake you have not noticed yet.</li>
</ul>
<div class="cmd">
  <div class="cmd-head">EXAMPLE · RESTIC, LOCAL REPOSITORY</div>
  <pre><code># Once: create an encrypted repository on the external drive
restic init --repo E:\\backups\\home

# Each run: snapshot the folders that matter, skipping the noise
restic -r E:\\backups\\home backup C:\\Users\\you\\Documents --exclude "**/node_modules"
restic -r E:\\backups\\home backup C:\\Users\\you\\Pictures   --exclude "**/*.tmp"

# Prune to a retention policy
restic -r E:\\backups\\home forget --keep-daily 14 --keep-weekly 8 --keep-monthly 12 --prune

# Verify the repository can actually be read back
restic -r E:\\backups\\home check --read-data-subset=5%</code></pre>
</div>
<h3>Layer 2 — encrypted off site</h3>
<ul>
  <li><strong>Cloud object storage</strong> with the same backup tool, so the data is encrypted before it leaves the machine. This is the practical way to get an off-site copy without trusting the provider with plaintext.</li>
  <li><strong>Or a drive at another address</strong> — a relative&rsquo;s house, an office drawer. Rotate it monthly. Unglamorous, free, and it works.</li>
  <li><strong>Enable object lock or immutability if the provider offers it.</strong> This is what makes the off-site copy resistant to an attacker who has your credentials.</li>
</ul>
<h3>Layer 3 — the boring habits</h3>
<ul>
  <li><strong>Automate the local run</strong> with a scheduled task, and make failures visible. A silent backup that stopped three months ago is worse than none, because you stopped worrying.</li>
  <li><strong>Export your installed-software list</strong> during the same run.</li>
  <li><strong>Keep one full system image</strong> if reinstalling Windows and its applications would cost you a working day.</li>
</ul>`,
      },
      {
        id: 'encryption',
        nav: 'Encryption and keys',
        label: '05 · KEYS',
        title: 'Encrypt the copies. Then solve the key problem.',
        body: `
<p class="lede">Any backup that leaves your home should be encrypted before it goes. That immediately creates a second problem: a key you cannot lose and cannot leave lying next to the data.</p>
<ul>
  <li><strong>Encrypt client side.</strong> Tools like Restic and Kopia encrypt before upload, so the storage provider holds ciphertext. Provider-side encryption protects against the wrong threat.</li>
  <li><strong>Use a long passphrase, stored in your password manager</strong>, and make sure the password manager itself is recoverable without the backup.</li>
  <li><strong>Write the recovery material down.</strong> On paper, somewhere physical. A repository key that exists only inside the encrypted vault it protects is a circular dependency you will discover at the worst moment.</li>
  <li><strong>Encrypt the external drive too</strong> — BitLocker on Windows, or the backup tool&rsquo;s own encryption. A stolen backup drive is a data breach with your name on it.</li>
  <li><strong>Test the passphrase from a different machine</strong>, at least once, before you rely on it.</li>
</ul>
<div class="note note-warn">
  <p><strong>The most common total loss is not a dead drive.</strong> It is an encrypted backup whose passphrase was only in the head of someone who was sure they would remember it. Write it down.</p>
</div>`,
      },
      {
        id: 'restore',
        nav: 'Test the restore',
        label: '06 · THE TEST',
        title: 'A backup you have never restored is a hypothesis.',
        body: `
<p class="lede">Restore testing is the step everyone skips, and it is the only step that proves any of the others worked.</p>
<h3>Quarterly, in fifteen minutes</h3>
<ul>
  <li>Pick a random file from six months ago and restore it <strong>to a new location</strong>. Open it. Confirm it is intact and is the version you expected.</li>
  <li>Restore a whole folder and compare file counts and sizes against the source.</li>
  <li>Do it from the off-site copy at least once a year, not just the convenient local one.</li>
  <li>Time it. &ldquo;How long until I am working again&rdquo; is the number that determines whether your plan is adequate, and most people have never measured it.</li>
</ul>
<h3>Yearly, in an hour</h3>
<ul>
  <li>Restore to a different machine, or a virtual machine, using only what you have written down. No help from the running system.</li>
  <li>Verify the encryption passphrase works from that clean environment.</li>
  <li>Check that the tool itself is still available and still supports your repository format.</li>
  <li>Re-read your own notes and fix whatever you have to remember rather than read.</li>
</ul>
<div class="note note-good">
  <p><strong>If you do exactly one thing after reading this:</strong> restore a single file from your existing backup right now. A surprising share of people discover at that moment that they do not have one.</p>
</div>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '07 · QUICK ANSWERS',
    faqHeading: 'Backups, briefly.',
    faqs: [
      [
        'What does the 3-2-1 backup rule mean?',
        'Three copies of your data, on two different media or devices, with one copy off site. The modern extension adds one copy that is offline or immutable, so ransomware cannot reach it, and zero errors on restore, meaning you have actually tested that the backup can be read back.',
      ],
      [
        'Is cloud sync the same as a backup?',
        'No. Synchronisation propagates changes, including deletions and ransomware encryption, to every connected device within seconds. It provides availability, not recovery. It only counts as a backup to the extent you use its version history, and you should check how far back that history reaches before relying on it.',
      ],
      [
        'How often should I back up?',
        'Match the interval to how much work you are willing to redo. Daily automated backups suit most people, with an off-site copy updated weekly. What matters more than frequency is that the job is automated, that failures are visible, and that retention is long enough to recover a mistake you notice weeks later.',
      ],
      [
        'Will my backup survive ransomware?',
        'Only if at least one copy is offline or immutable. Ransomware encrypts everything it can reach, including permanently connected external drives and mapped network shares. Unplug the backup drive between runs, or use storage with object lock, and keep versioned snapshots so you can roll back to a point before the infection.',
      ],
      [
        'How do I test a backup?',
        'Restore a real file from several months ago to a new location and open it. Once a year, restore to a different machine using only your written notes, verify the encryption passphrase works there, and time how long a full recovery takes. That number, not the backup software status page, tells you whether your plan is adequate.',
      ],
    ],
    related: [
      ['windows-11-debloat-safe-guide.html', 'Debloat Windows 11 without breaking it'],
      ['android-backup-without-cloud.html', 'Back up an Android phone without the cloud'],
      ['git-ssh-keys-github-guide.html', 'SSH keys and signed commits for GitHub'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'Every app stores its data on the device and exports it in a plain format, so your copy is genuinely yours.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'run-local-llm-offline-guide.html',
    kicker: 'WORKSHOP—08 · LOCAL AI · 12 MIN READ',
    title: 'How to Run an LLM Locally and Fully Offline · Nyxelium',
    ogTitle: 'How to Run an LLM Locally, Fully Offline',
    description:
      'Hardware requirements by model size, how quantisation works, which local runner to choose, and how to verify a local model is genuinely running without a network.',
    twitterDescription:
      'Local LLMs without the hand-waving: VRAM tables, quantisation, runners, and an offline verification step.',
    keywords:
      'run LLM locally, offline AI model, Ollama setup, LM Studio, llama.cpp, GGUF quantisation, VRAM requirements local model, private AI assistant',
    articleSection: 'Local AI',
    audience: 'Developers and privacy-conscious users',
    proficiency: 'Intermediate',
    headline: 'Run a language model on your own machine, with the network unplugged.',
    deck: 'Local models are genuinely useful now, and the guides about them are mostly hardware fantasy. This is the honest version: what fits in your VRAM, what quantisation actually costs you, which runner to pick for which job, and how to confirm the thing is really running offline rather than quietly calling an API.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Offline, verified',
      text: 'The last section is a check that the model runs with the network physically disconnected.',
      facts: [
        'VRAM TABLE BY MODEL SIZE',
        'QUANTISATION EXPLAINED',
        'OLLAMA · LM STUDIO · LLAMA.CPP',
        'OFFLINE VERIFICATION STEP',
      ],
    },
    howTo: {
      name: 'Run a local language model offline',
      description:
        'Install a local model runner, download a quantised model sized to your hardware, and verify that it runs without a network connection.',
      totalTime: 'PT30M',
      anchor: 'install',
      tools: ['Ollama or LM Studio', 'A GPU with 8 GB of VRAM or 16 GB of system RAM'],
      steps: [
        ['Check your memory budget', 'Determine your GPU VRAM, or system RAM if running on CPU, and pick a model size that fits with room for context.'],
        ['Install a runner', 'Install Ollama for a command line and API workflow, or LM Studio for a graphical one.'],
        ['Pull a quantised model', 'Download a model at a 4-bit or 5-bit quantisation appropriate to your memory budget.'],
        ['Run a first prompt', 'Start a chat session and confirm the model responds at a usable speed.'],
        ['Tune context and offload', 'Adjust the context window and the number of layers offloaded to the GPU until speed and memory use are balanced.'],
        ['Verify it is offline', 'Disconnect the network and repeat a prompt to confirm no external service is involved.'],
      ],
    },
    sections: [
      {
        id: 'why',
        nav: 'Why run it locally',
        label: '01 · THE CASE',
        title: 'Three good reasons, and the limits nobody mentions.',
        body: `
<p class="lede">A local model is worse than a frontier hosted model at almost every task. It is also the only option when the data cannot leave the machine — and that trade is worth understanding precisely rather than emotionally.</p>
<h3>What local genuinely gives you</h3>
<ul>
  <li><strong>The data does not leave.</strong> No terms of service, no retention policy, no question about training. For client material, medical notes, legal drafts or anything under an NDA, this is the whole argument.</li>
  <li><strong>It works with no connection.</strong> On a plane, in a lab, on a site with no signal, or during an outage.</li>
  <li><strong>No per-token cost and no rate limit.</strong> Bulk classification, batch summarisation and repeated experiments become free after the electricity.</li>
  <li><strong>It cannot be deprecated underneath you.</strong> The model you saved works the same in two years. Hosted models change behaviour without notice.</li>
</ul>
<h3>What it does not give you</h3>
<ul>
  <li><strong>Frontier reasoning.</strong> A model that fits in consumer VRAM is not competitive with the largest hosted models on hard reasoning, long-horizon coding or obscure knowledge. Expect a capable assistant, not a replacement.</li>
  <li><strong>Speed on long context.</strong> Processing a large document is where consumer hardware feels slowest, and it is exactly what people want local models for.</li>
  <li><strong>Fewer confident errors.</strong> Smaller models hallucinate more, not less. Local does not mean careful.</li>
  <li><strong>A free lunch on RAM.</strong> Whatever the model occupies is memory your other work does not get.</li>
</ul>`,
      },
      {
        id: 'hardware',
        nav: 'What your hardware runs',
        label: '02 · THE BUDGET',
        title: 'Memory decides everything. Here is the arithmetic.',
        body: `
<p class="lede">Model size in billions of parameters, multiplied by the bytes per parameter your quantisation uses, plus room for the context window. That is the entire calculation.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Model size</th><th>At 4-bit</th><th>At 8-bit</th><th>Realistic on</th></tr>
    </thead>
    <tbody>
      <tr><td>3B</td><td>about 2 GB</td><td>about 3.5 GB</td><td>Any modern GPU, or CPU only</td></tr>
      <tr><td>7B to 8B</td><td>about 4.5 GB</td><td>about 8.5 GB</td><td>8 GB VRAM comfortably; 16 GB RAM on CPU</td></tr>
      <tr><td>13B to 14B</td><td>about 8 GB</td><td>about 15 GB</td><td>12 GB VRAM; slow but usable on CPU</td></tr>
      <tr><td>30B to 34B</td><td>about 19 GB</td><td>about 36 GB</td><td>24 GB VRAM, or a unified-memory laptop</td></tr>
      <tr><td>70B</td><td>about 40 GB</td><td>about 75 GB</td><td>Two large GPUs, or 64 GB of unified memory, slowly</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Add headroom on top of every figure.</strong> The key-value cache for the context window grows with how much text you feed in, and a long context on a large model can consume several more gigabytes. A model that just fits with an empty context will fail halfway through a long document.</p>
<h3>Quantisation, in one paragraph</h3>
<p>Weights are stored at reduced precision so the model fits in less memory. Going from 16-bit to 8-bit is nearly free in quality. 8-bit to 4-bit is the sweet spot most people run: a small, usually acceptable quality loss for roughly half the memory. Below 4-bit, degradation becomes obvious — instruction-following slips first, then coherence on long outputs. <strong>A larger model at 4-bit generally beats a smaller model at 8-bit</strong>, which is the single most useful heuristic in this whole area.</p>
<div class="note">
  <p><strong>GPU or CPU?</strong> A GPU is roughly an order of magnitude faster for generation. CPU inference is entirely usable for 3B to 8B models if you can accept reading speed rather than instant answers. Apple Silicon and other unified-memory designs are unusually good here, because the memory is shared and generous.</p>
</div>`,
      },
      {
        id: 'runners',
        nav: 'Pick a runner',
        label: '03 · THE TOOLS',
        title: 'Four ways to run the same model files.',
        body: `
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Tool</th><th>Shape</th><th>Best for</th><th>Trade-off</th></tr>
    </thead>
    <tbody>
      <tr><td>Ollama</td><td>Command line plus a local HTTP API</td><td>Developers. One command to pull and run, and an API other tools can target.</td><td>Less granular control than raw llama.cpp</td></tr>
      <tr><td>LM Studio</td><td>Desktop application</td><td>Trying models, comparing them, and non-technical use. Model browser and chat built in.</td><td>Graphical workflow, heavier install</td></tr>
      <tr><td>llama.cpp</td><td>The underlying engine</td><td>Maximum control over quantisation, offload and sampling. Runs anywhere.</td><td>You assemble the workflow yourself</td></tr>
      <tr><td>Jan / GPT4All</td><td>Desktop applications</td><td>A private assistant for someone who does not want a terminal</td><td>Fewer knobs, slower to get new model formats</td></tr>
    </tbody>
  </table>
</div>
<p>All four run the same quantised model files, so the choice is about workflow rather than capability. A common arrangement is Ollama as the engine with a separate chat interface pointed at its API, which keeps the model server and the interface independent.</p>`,
      },
      {
        id: 'install',
        nav: 'Install and first run',
        label: '04 · THE WALKTHROUGH',
        title: 'From nothing to a working model in about ten minutes.',
        body: `
<div class="cmd">
  <div class="cmd-head">SHELL · OLLAMA, FIRST RUN</div>
  <pre><code># Pull a model sized to your hardware and start chatting
ollama run llama3.1:8b

# List what you have downloaded, and how much space it uses
ollama list

# Remove one you no longer want
ollama rm llama3.1:8b

# Serve the local API for other tools to use
ollama serve</code></pre>
</div>
<p>The API listens on localhost, which is what editor plugins, note apps and scripts connect to. Nothing leaves the machine.</p>
<div class="cmd">
  <div class="cmd-head">SHELL · CALL THE LOCAL API</div>
  <pre><code>curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1:8b",
  "prompt": "Summarise this in three bullet points: ...",
  "stream": false
}'</code></pre>
</div>
<h3>Choosing a first model</h3>
<ul>
  <li><strong>General assistant, 8 GB VRAM</strong> — a current 7B to 8B instruction-tuned model at 4-bit. This is the default answer and it is a good one.</li>
  <li><strong>Code</strong> — a code-specialised model of the same size. Noticeably better at completion and refactoring than a general model of equal size.</li>
  <li><strong>Small and fast</strong> — a 3B model for classification, extraction, tagging and other structured work where you do not need conversation.</li>
  <li><strong>Best quality you can fit</strong> — go up in parameters before you go up in precision. Larger at 4-bit beats smaller at 8-bit.</li>
</ul>
<div class="note">
  <p><strong>Check the licence before you build on it.</strong> Open-weight is not the same as open-source, and several popular families restrict commercial use or impose conditions on derived models. This matters the moment a hobby project becomes a product.</p>
</div>`,
      },
      {
        id: 'tuning',
        nav: 'Tuning for speed',
        label: '05 · TUNING',
        title: 'Four settings that decide whether it feels usable.',
        body: `
<ul>
  <li><strong>GPU layer offload.</strong> The most important setting on a machine where the model does not fully fit. Push as many layers onto the GPU as VRAM allows; the remainder runs on CPU. Going one layer too far causes an out-of-memory failure, so step down until it is stable.</li>
  <li><strong>Context window.</strong> Larger contexts cost memory and slow down generation. Set it to what you actually need — 4K for chat, more only when you are genuinely feeding in documents.</li>
  <li><strong>Batch size for prompt processing.</strong> Affects how quickly a long prompt is ingested, separately from how fast tokens come out. If pasting a large document feels slow but replies are fine, this is the setting.</li>
  <li><strong>Quantisation level.</strong> If it does not fit, drop from 5-bit to 4-bit before you drop to a smaller model. Below 4-bit, prefer a smaller model instead.</li>
</ul>
<h3>Speed expectations</h3>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Setup</th><th>7B to 8B at 4-bit</th><th>Feels like</th></tr>
    </thead>
    <tbody>
      <tr><td>Modern discrete GPU, fully offloaded</td><td>Fast, well above reading speed</td><td>Comparable to a hosted chat interface</td></tr>
      <tr><td>Older or smaller GPU, partial offload</td><td>Around reading speed</td><td>Usable for conversation, tedious for long output</td></tr>
      <tr><td>CPU only, modern multi-core</td><td>Below reading speed</td><td>Fine for background and batch work, not for chat</td></tr>
      <tr><td>Unified memory laptop</td><td>Comfortably above reading speed</td><td>The best experience per watt available today</td></tr>
    </tbody>
  </table>
</div>
<p><strong>If generation is far slower than the table suggests</strong>, the model is almost certainly spilling out of VRAM into system memory. Check the layer offload before blaming the hardware — this one misconfiguration accounts for most disappointing first attempts.</p>`,
      },
      {
        id: 'offline',
        nav: 'Verify it is offline',
        label: '06 · THE VERIFICATION',
        title: 'Prove the model runs without a network.',
        body: `
<p class="lede">This is the step that separates a genuinely local setup from a local interface in front of a remote API. Do it once, deliberately.</p>
<div class="step-grid">
  <div class="step">
    <span class="step-num">STEP—01</span>
    <strong>Download everything first</strong>
    <p>Pull every model you intend to use while connected. Model files are the only thing that genuinely needs the network.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—02</span>
    <strong>Disconnect properly</strong>
    <p>Turn off Wi-Fi and unplug the cable. Airplane mode is fine. Do not rely on a firewall rule for the test itself.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—03</span>
    <strong>Run a real prompt</strong>
    <p>Not a one-word test. Ask for something long enough that a silent fallback to a remote service would fail visibly.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—04</span>
    <strong>Watch the resource meters</strong>
    <p>GPU or CPU utilisation should climb while it generates. If nothing moves locally, something else is answering.</p>
  </div>
</div>
<h3>Keeping it offline afterwards</h3>
<ul>
  <li><strong>Block outbound network access for the runner</strong> in Windows Firewall once your models are downloaded. Update deliberately rather than automatically.</li>
  <li><strong>Turn off telemetry and update checks</strong> in whichever tool you chose. Most have a switch; a few need a configuration file.</li>
  <li><strong>Keep the model files backed up.</strong> They are large but not infinite, and a model that gets withdrawn or relicensed is unrecoverable if you did not keep a copy. The <a href="local-backup-3-2-1-guide.html">backup guide</a> covers where they should live.</li>
  <li><strong>Be careful with chat interfaces.</strong> Many desktop front-ends support both local and hosted providers, and switching is one dropdown away. Check which provider is selected before pasting anything sensitive.</li>
</ul>
<div class="note note-good">
  <p><strong>The privacy claim is only as good as the weakest component.</strong> A local model behind a front-end that syncs your conversation history to a cloud account is not a private setup. Verify each piece separately.</p>
</div>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '07 · QUICK ANSWERS',
    faqHeading: 'Local models, briefly.',
    faqs: [
      [
        'What hardware do I need to run an LLM locally?',
        'For a 7B to 8B model at 4-bit quantisation, about 4.5 GB of VRAM, so an 8 GB graphics card is comfortable. CPU-only inference works with around 16 GB of system RAM but generates below reading speed. Unified-memory machines such as Apple Silicon do unusually well because the memory is shared and generous.',
      ],
      [
        'Is a local LLM as good as a hosted one?',
        'No, not at the sizes that fit on consumer hardware. Expect a capable assistant for summarising, drafting, extraction and routine code work, and expect it to fall behind the largest hosted models on hard reasoning, long-horizon coding and obscure knowledge. The reason to run locally is privacy, offline availability and cost, not raw capability.',
      ],
      [
        'What does quantisation cost in quality?',
        '16-bit to 8-bit is nearly free. 8-bit to 4-bit costs a small, usually acceptable amount for roughly half the memory, which is why most people run 4-bit. Below 4-bit, degradation becomes obvious, starting with instruction-following. As a rule, a larger model at 4-bit beats a smaller model at 8-bit.',
      ],
      [
        'Which tool should I use to run models locally?',
        'Ollama if you want a command line and a local API that other tools can call. LM Studio if you want a desktop application with a model browser and chat built in. llama.cpp directly if you want full control over quantisation and offload. All of them run the same model files, so the choice is about workflow.',
      ],
      [
        'How do I know my local model is really offline?',
        'Download the models while connected, then disconnect the network entirely and run a substantial prompt. Watch GPU or CPU utilisation climb as it generates. Afterwards, block outbound network access for the runner in the firewall and check that your chat front-end is not configured to fall back to a hosted provider.',
      ],
    ],
    related: [
      ['wsl2-setup-windows-guide.html', 'Set up WSL2 properly on Windows'],
      ['local-backup-3-2-1-guide.html', 'A 3-2-1 backup you will actually run'],
      ['python-virtual-environment-guide.html', 'Python environments without the mess'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'The same idea on a phone: the app works with the network off, and nothing you write is uploaded.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },
];
