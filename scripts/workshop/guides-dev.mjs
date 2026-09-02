/* Workshop cluster 3 — developer setup on Windows. */

export const devGuides = [
  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'install-nodejs-windows-nvm.html',
    kicker: 'WORKSHOP—09 · DEVELOPER SETUP · 9 MIN READ',
    title: 'Install Node.js on Windows Without Version Pain · Nyxelium',
    ogTitle: 'Install Node.js on Windows Without the Version Pain',
    description:
      'Why the plain installer causes problems later, how to choose between nvm-windows, fnm and Volta, and how to pin a Node version per project so builds stay reproducible.',
    twitterDescription:
      'Node on Windows, installed so that switching versions never breaks a project again.',
    keywords:
      'install Node.js Windows, nvm-windows, fnm, Volta, Node version manager, nvmrc, Corepack pnpm yarn, node-gyp build tools Windows',
    articleSection: 'Developer tooling',
    audience: 'JavaScript and TypeScript developers on Windows',
    proficiency: 'Beginner',
    headline: 'Install Node.js once, then never fight a version again.',
    deck: 'The official installer works perfectly until the day you open a two-year-old project. This covers why that happens, which version manager to use on Windows, how to pin a version per repository, and the handful of errors that account for most Node setup problems on this platform.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Version managers first',
      text: 'Install the manager, not the runtime. Everything else follows from that one decision.',
      facts: [
        'FNM · NVM-WINDOWS · VOLTA',
        'PER-PROJECT PINNING',
        'COREPACK FOR PNPM',
        'SIX ERRORS DECODED',
      ],
    },
    howTo: {
      name: 'Install Node.js on Windows with a version manager',
      description:
        'Install a Node version manager, use it to install a Node release, and pin the version per project so every clone uses the same runtime.',
      totalTime: 'PT15M',
      anchor: 'install',
      tools: ['Windows 10 or 11', 'winget', 'fnm or nvm-windows'],
      steps: [
        ['Remove existing Node installations', 'Uninstall any Node.js installed from the plain installer so a version manager can own the PATH entry.'],
        ['Install a version manager', 'Install fnm or nvm-windows, for example with winget install Schniz.fnm.'],
        ['Add the shell hook', 'Add the version manager initialisation to your PowerShell profile so it switches versions automatically.'],
        ['Install a Node release', 'Install the current LTS release and set it as the default.'],
        ['Pin the version per project', 'Add a .nvmrc file or an engines field so every clone resolves to the same version.'],
        ['Enable Corepack', 'Run corepack enable so pnpm and Yarn come from the version pinned in package.json.'],
      ],
    },
    sections: [
      {
        id: 'problem',
        nav: 'Why the installer hurts',
        label: '01 · THE PROBLEM',
        title: 'One global Node is fine until the second project arrives.',
        body: `
<p class="lede">The Node installer puts one runtime on the PATH. That is exactly right for one project and exactly wrong for a machine that has to build several.</p>
<p>The failures show up in a recognisable order:</p>
<ul>
  <li><strong>A project needs an older major.</strong> A native dependency was built against a different ABI, and the install fails with a compilation error that has nothing to do with your code.</li>
  <li><strong>A project needs a newer one.</strong> The tooling uses syntax or a built-in API your runtime does not have, and the error message points at a file inside a dependency.</li>
  <li><strong>Global packages disappear.</strong> They were installed under the previous version and are invisible to the new one, which reads as &ldquo;the tool is broken&rdquo;.</li>
  <li><strong>Permission errors on global installs.</strong> Windows-specific, common, and the reason so many answers tell you to run the terminal as administrator. Do not.</li>
  <li><strong>CI disagrees with your machine.</strong> The build passes locally and fails in the pipeline, because nothing declared which version was correct.</li>
</ul>
<p><strong>A version manager solves all five, because the version becomes a property of the project rather than of the computer.</strong></p>`,
      },
      {
        id: 'managers',
        nav: 'Choose a manager',
        label: '02 · THE OPTIONS',
        title: 'Four managers, and which one to pick on Windows.',
        body: `
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Tool</th><th>How it works</th><th>Best for</th><th>Trade-off</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>fnm</td>
        <td>Fast native binary; switches on directory change via a shell hook</td>
        <td>Most people. Quick, cross-platform, reads .nvmrc and .node-version.</td>
        <td>Requires a line in your shell profile to switch automatically</td>
      </tr>
      <tr>
        <td>nvm-windows</td>
        <td>Symlinks the active version into a fixed path</td>
        <td>Familiarity, and teams that already document nvm commands</td>
        <td>Unrelated to the Unix nvm despite the name; switching needs an elevated shell in some setups</td>
      </tr>
      <tr>
        <td>Volta</td>
        <td>Shims that resolve the version from package.json at execution time</td>
        <td>Teams. The version is pinned in the repository and applied automatically with no hook.</td>
        <td>Its own pinning field, so the project must adopt Volta</td>
      </tr>
      <tr>
        <td>mise / asdf</td>
        <td>Polyglot version manager for many runtimes at once</td>
        <td>Machines that also juggle Python, Go, Java and Ruby versions</td>
        <td>More concepts than you need if Node is your only runtime</td>
      </tr>
    </tbody>
  </table>
</div>
<div class="note">
  <p><strong>Uninstall the plain Node installer first.</strong> A leftover installation stays on the PATH and will silently win against your version manager, producing the single most confusing failure in this whole area: <code>node -v</code> reports a version you did not select.</p>
</div>`,
      },
      {
        id: 'install',
        nav: 'Install it',
        label: '03 · THE WALKTHROUGH',
        title: 'fnm on Windows, in about five minutes.',
        body: `
<div class="cmd">
  <div class="cmd-head">POWERSHELL · INSTALL FNM AND NODE</div>
  <pre><code># Install the version manager
winget install Schniz.fnm

# Make PowerShell load it and switch automatically per directory
if (-not (Test-Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
Add-Content $PROFILE 'fnm env --use-on-cd | Out-String | Invoke-Expression'

# Open a new terminal, then install and select a runtime
fnm install --lts
fnm default lts-latest
fnm list

node -v
npm -v</code></pre>
</div>
<p>The <code>--use-on-cd</code> hook is what makes this worth doing: entering a directory that declares a version switches to it, and leaving switches back.</p>
<h3>The nvm-windows alternative</h3>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · NVM-WINDOWS</div>
  <pre><code>winget install CoreyButler.NVMforWindows

nvm install lts
nvm use lts
nvm list</code></pre>
</div>
<p>nvm-windows does not switch automatically on directory change, so you run <code>nvm use</code> yourself. That is the main practical difference between the two.</p>
<div class="note note-warn">
  <p><strong>Close every terminal after installing.</strong> PATH changes are read at process start, so an open shell keeps the old environment and produces contradictory results while you debug. This wastes more time than any other step here.</p>
</div>`,
      },
      {
        id: 'pinning',
        nav: 'Pin per project',
        label: '04 · PINNING',
        title: 'Put the version in the repository, not in your head.',
        body: `
<p class="lede">A version manager only helps if the project says which version it wants. Three mechanisms, and you can use more than one.</p>
<h3>1. A version file</h3>
<div class="cmd">
  <div class="cmd-head">PROJECT ROOT</div>
  <pre><code># .nvmrc  — read by nvm, fnm and most CI actions
22

# .node-version — the same idea, understood by more tools
22.11.0</code></pre>
</div>
<p>Commit it. Every clone, every colleague and most CI providers will now resolve to the same runtime without being told.</p>
<h3>2. The engines field</h3>
<div class="cmd">
  <div class="cmd-head">PACKAGE.JSON</div>
  <pre><code>{
  "engines": {
    "node": "&gt;=22.0.0 &lt;23"
  },
  "packageManager": "pnpm@9.12.0"
}</code></pre>
</div>
<p><code>engines</code> documents the requirement and lets package managers warn or fail on mismatch. <code>packageManager</code> is the field Corepack reads, and it is the cleanest way to guarantee that everyone uses the same pnpm or Yarn version.</p>
<h3>3. Corepack for the package manager</h3>
<div class="cmd">
  <div class="cmd-head">POWERSHELL</div>
  <pre><code># Ships with Node. Enables pnpm and Yarn from the packageManager field
corepack enable

# In a project with packageManager set, this uses the pinned version
pnpm install</code></pre>
</div>
<p>This removes the second half of the version problem. Pinning Node while everyone runs a different pnpm still produces lockfile churn and mysterious install differences.</p>`,
      },
      {
        id: 'native',
        nav: 'Native modules',
        label: '05 · NATIVE MODULES',
        title: 'When a package needs a compiler on Windows.',
        body: `
<p class="lede">Most installs are pure JavaScript. The ones that are not fail loudly, with a wall of C++ output, and the fix is nearly always the same.</p>
<p>Packages that build native code use node-gyp, which needs a C++ toolchain and Python. On Windows that means the Visual Studio Build Tools with the desktop C++ workload:</p>
<div class="cmd">
  <div class="cmd-head">POWERSHELL (ADMIN)</div>
  <pre><code># Install the C++ build tools node-gyp expects
winget install Microsoft.VisualStudio.2022.BuildTools --override "--quiet --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"

# Confirm Python is available to node-gyp
python --version</code></pre>
</div>
<ul>
  <li><strong>Prefer a prebuilt package.</strong> Many popular native modules now ship prebuilt binaries or have a pure-JavaScript alternative. Check before installing a compiler you will never otherwise use.</li>
  <li><strong>Long paths.</strong> Deep dependency trees still hit the Windows path limit. Enable long paths in Group Policy, or keep repositories close to the drive root.</li>
  <li><strong>Antivirus.</strong> Real-time scanning over node_modules is a large and invisible tax on installs. Exclude your projects directory.</li>
  <li><strong>WSL2 as an escape hatch.</strong> If a package is simply hostile to Windows, building it in Linux is often faster than fixing it — see the <a href="wsl2-setup-windows-guide.html">WSL2 guide</a>.</li>
</ul>`,
      },
      {
        id: 'errors',
        nav: 'Common errors',
        label: '06 · ERRORS',
        title: 'Six messages and what they actually mean.',
        body: `
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Symptom</th><th>Cause</th><th>Fix</th></tr>
    </thead>
    <tbody>
      <tr><td>node -v shows the wrong version</td><td>A leftover plain installation earlier on PATH</td><td>Uninstall Node from Apps, then reopen the terminal</td></tr>
      <tr><td>EPERM or EACCES on a global install</td><td>Writing into a protected directory</td><td>Let the version manager own the install location; never elevate npm</td></tr>
      <tr><td>A global CLI vanished after switching</td><td>Globals are per version by design</td><td>Reinstall it under the new version, or use npx</td></tr>
      <tr><td>gyp ERR! find VS</td><td>No C++ toolchain</td><td>Install the Visual Studio Build Tools with the desktop C++ workload</td></tr>
      <tr><td>Unsupported engine warning</td><td>Runtime outside the declared engines range</td><td>Switch to the declared version rather than ignoring the warning</td></tr>
      <tr><td>Install works, CI fails</td><td>Nothing pins the version in the repository</td><td>Commit .nvmrc and set packageManager, then have CI read them</td></tr>
    </tbody>
  </table>
</div>
<div class="note note-good">
  <p><strong>A clean setup, in one line:</strong> one version manager, a committed version file, Corepack enabled, and no globally installed CLIs that a project actually depends on. Everything on this page follows from those four.</p>
</div>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '07 · QUICK ANSWERS',
    faqHeading: 'Node on Windows, briefly.',
    faqs: [
      [
        'Should I install Node.js from the official installer?',
        'For a single project, it is fine. For a machine that builds more than one, install a version manager instead: fnm, nvm-windows or Volta. The version then becomes a property of the project rather than of the computer, which prevents the whole class of problems where an old repository will not install.',
      ],
      [
        'What is the difference between nvm-windows and fnm?',
        'fnm is a fast native binary that can switch versions automatically when you enter a directory containing a .nvmrc file, using a hook in your shell profile. nvm-windows symlinks the active version into a fixed path and requires you to run nvm use yourself. Both work; fnm needs less manual switching.',
      ],
      [
        'How do I pin a Node version for a project?',
        'Commit a .nvmrc or .node-version file with the major version, and add an engines field to package.json. Add a packageManager field as well and run corepack enable, so pnpm or Yarn is pinned too. Most CI providers read these files automatically, which keeps local and pipeline builds aligned.',
      ],
      [
        'Why do I get EPERM errors installing global npm packages?',
        'The install is trying to write into a protected directory. Do not fix this by running the terminal as administrator. Let a version manager own the Node installation directory instead, so global packages land in a user-writable path. Where possible, avoid global installs entirely and run tools with npx.',
      ],
      [
        'Why does npm install fail with C++ compiler errors?',
        'A dependency contains native code and needs node-gyp, which requires a C++ toolchain and Python. On Windows, install the Visual Studio Build Tools with the desktop development with C++ workload. Before that, check whether the package offers a prebuilt binary or a pure-JavaScript alternative.',
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
      text: 'Written from a working Windows setup that ships real apps, not from a fresh virtual machine.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'install-flutter-windows-guide.html',
    kicker: 'WORKSHOP—10 · DEVELOPER SETUP · 12 MIN READ',
    title: 'Install Flutter and the Android SDK on Windows · Nyxelium',
    ogTitle: 'Install Flutter and the Android SDK on Windows',
    description:
      'A Flutter setup on Windows that builds Android releases: the SDK, command line tools, the JDK version that matches your Gradle, and the errors that block first builds.',
    twitterDescription:
      'Flutter on Windows, set up so the first Android release build actually succeeds.',
    keywords:
      'install Flutter Windows, Android SDK command line tools, flutter doctor, JAVA_HOME JDK 17 Gradle, FVM Flutter version management, Android licenses accepted',
    articleSection: 'Developer tooling',
    audience: 'Mobile developers setting up Flutter',
    proficiency: 'Intermediate',
    headline: 'A Flutter setup on Windows that reaches a release build.',
    deck: 'Getting <em>flutter doctor</em> to show green ticks is the easy half. The half that stops people is the Android toolchain underneath it — command line tools, licences, and a JDK version that has to match whatever Gradle your project pins. This is the whole path, in order, with the failures named.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Written from practice',
      text: 'This is the setup behind the Android apps on this site, minus the parts specific to them.',
      facts: [
        'FLUTTER + ANDROID SDK',
        'JDK AND GRADLE MATCHING',
        'FVM VERSION PINNING',
        'SEVEN FAILURES NAMED',
      ],
    },
    howTo: {
      name: 'Install Flutter and the Android toolchain on Windows',
      description:
        'Install the Flutter SDK, the Android SDK command line tools and a matching JDK, then accept the Android licences and verify with flutter doctor.',
      totalTime: 'PT45M',
      anchor: 'install',
      tools: ['Flutter SDK', 'Android Studio or the Android command line tools', 'A JDK matching your Gradle version'],
      steps: [
        ['Install the Flutter SDK', 'Extract the Flutter SDK to a short path without spaces and add its bin directory to PATH.'],
        ['Install the Android SDK', 'Install Android Studio, or the standalone command line tools, and install a platform and build tools through the SDK manager.'],
        ['Install a matching JDK', 'Install a JDK version compatible with the Gradle release your project uses and set JAVA_HOME to it.'],
        ['Point Flutter at the JDK', 'Run flutter config --jdk-dir so Flutter uses the same JDK as your Gradle builds.'],
        ['Accept the Android licences', 'Run flutter doctor --android-licenses and accept each licence.'],
        ['Verify the toolchain', 'Run flutter doctor -v and resolve anything that is not a tick before building.'],
      ],
    },
    sections: [
      {
        id: 'pieces',
        nav: 'What you install',
        label: '01 · THE PIECES',
        title: 'Five separate things, one of which everyone forgets.',
        body: `
<p class="lede">Flutter on Windows is not one download. Understanding what each piece does turns most setup errors into obvious ones.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Component</th><th>What it is</th><th>Needed for</th></tr>
    </thead>
    <tbody>
      <tr><td>Flutter SDK</td><td>The framework, the Dart SDK and the flutter tool</td><td>Everything</td></tr>
      <tr><td>Android SDK platform</td><td>The API level your app compiles against</td><td>Any Android build</td></tr>
      <tr><td>Android build tools and platform tools</td><td>The packaging tools, plus adb</td><td>Building and installing to devices</td></tr>
      <tr><td>A JDK</td><td>Java runtime and compiler that Gradle runs on</td><td>Every Gradle build. This is the piece people forget.</td></tr>
      <tr><td>Command line tools</td><td>sdkmanager and the licence machinery</td><td>Accepting licences, installing SDK packages without the IDE</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Android Studio bundles most of this</strong>, which is why it remains the easiest route even if you intend to work in another editor. The alternative — the standalone command line tools — is leaner and better for CI, but you install and wire each piece yourself.</p>`,
      },
      {
        id: 'install',
        nav: 'The install order',
        label: '02 · INSTALLATION',
        title: 'Install in this order, and check after each step.',
        body: `
<div class="step-grid">
  <div class="step">
    <span class="step-num">STEP—01</span>
    <strong>Flutter SDK</strong>
    <p>Extract to a short path with no spaces, such as <code>C:\\src\\flutter</code>. Never under Program Files: the tool writes into its own directory and will hit permission errors there.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—02</span>
    <strong>PATH</strong>
    <p>Add <code>C:\\src\\flutter\\bin</code> to the user PATH, then open a new terminal. <code>flutter --version</code> should answer.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—03</span>
    <strong>Android SDK</strong>
    <p>Install Android Studio and, in the SDK Manager, add a platform, the build tools and — on the SDK Tools tab — the <em>Android SDK Command-line Tools</em>. That last checkbox is the most commonly missed item in the entire setup.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—04</span>
    <strong>JDK</strong>
    <p>Install a JDK that matches the Gradle version your projects use, and set <code>JAVA_HOME</code>. Section three explains how to pick the number.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—05</span>
    <strong>Licences</strong>
    <p>Run <code>flutter doctor --android-licenses</code> and accept them all. Builds fail with an unhelpful message until you do.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—06</span>
    <strong>Verify</strong>
    <p>Run <code>flutter doctor -v</code>. Resolve everything that is not a tick before writing any code — a warning here becomes a confusing build error later.</p>
  </div>
</div>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · VERIFY AND CONFIGURE</div>
  <pre><code>flutter --version
flutter doctor -v

# Tell Flutter which JDK to use for Gradle builds
flutter config --jdk-dir "C:\\Program Files\\Eclipse Adoptium\\jdk-21"

# Tell Flutter where the Android SDK lives, if it did not find it
flutter config --android-sdk "C:\\Users\\you\\AppData\\Local\\Android\\Sdk"

# Accept every Android licence
flutter doctor --android-licenses</code></pre>
</div>`,
      },
      {
        id: 'jdk',
        nav: 'The JDK question',
        label: '03 · THE JDK',
        title: 'Match the JDK to Gradle, not to the newest release.',
        body: `
<p class="lede">More Flutter build failures trace back to a JDK and Gradle mismatch than to anything in Dart. The rule is simple: Gradle decides, not you.</p>
<p>Each Gradle release supports a bounded range of Java versions, and the Android Gradle Plugin adds its own minimum on top. Installing the newest JDK because it is newest produces the error people paste into search engines most often: <em>Unsupported class file major version</em>.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Situation</th><th>Do this</th></tr>
    </thead>
    <tbody>
      <tr><td>New project, current Flutter</td><td>Use the JDK bundled with your Android Studio version, or a current LTS release, and let the template pick Gradle</td></tr>
      <tr><td>Older project that will not build</td><td>Read the Gradle version in gradle-wrapper.properties, then install the JDK that release supports</td></tr>
      <tr><td>Unsupported class file major version</td><td>Your JDK is newer than Gradle supports. Point at an older JDK or upgrade Gradle and the Android Gradle Plugin together.</td></tr>
      <tr><td>Several projects on different Gradle versions</td><td>Install more than one JDK and switch JAVA_HOME per project rather than upgrading everything at once</td></tr>
    </tbody>
  </table>
</div>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · FIND OUT WHAT A PROJECT ACTUALLY USES</div>
  <pre><code># The Gradle version the project pins
Get-Content android\\gradle\\wrapper\\gradle-wrapper.properties

# Which JDK Gradle is currently running on
cd android; .\\gradlew --version; cd ..

# Which JDK is on PATH right now
java -version
echo $env:JAVA_HOME</code></pre>
</div>
<div class="note note-warn">
  <p><strong>Do not upgrade Gradle to fix a JDK error on a project that ships.</strong> Raising Gradle usually forces an Android Gradle Plugin upgrade, which can force plugin and dependency updates across the project. Install the older JDK, get a green build, and schedule the upgrade as its own piece of work.</p>
</div>`,
      },
      {
        id: 'versions',
        nav: 'Managing Flutter versions',
        label: '04 · VERSION MANAGEMENT',
        title: 'Pin the Flutter SDK per project once you have two.',
        body: `
<p class="lede">Flutter upgrades occasionally change behaviour that a shipped app depends on. Pinning the SDK per project makes that a scheduled decision rather than a surprise.</p>
<h3>The built-in route</h3>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · CHANNELS AND VERSIONS</div>
  <pre><code>flutter channel stable
flutter upgrade

# Pin the global SDK to a specific release
flutter downgrade 3.24.0</code></pre>
</div>
<h3>The per-project route</h3>
<p>FVM (Flutter Version Management) installs SDK versions side by side and selects one per repository, in the same spirit as a Node version manager:</p>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · FVM</div>
  <pre><code>dart pub global activate fvm

# In the project directory: pin and use a version
fvm use 3.24.0

# Run commands against the pinned SDK
fvm flutter pub get
fvm flutter build appbundle --release</code></pre>
</div>
<p>Commit the FVM configuration file. Point your editor&rsquo;s Flutter SDK path at the project&rsquo;s <code>.fvm</code> directory so analysis and the command line agree — a mismatch there produces analyser errors that do not reproduce in a build, which is a genuinely irritating way to lose an afternoon.</p>
<div class="note">
  <p><strong>Pin the SDK before your first release, not after.</strong> Reproducing a build from six months ago is only possible if you wrote down which SDK made it.</p>
</div>`,
      },
      {
        id: 'devices',
        nav: 'Emulator or device',
        label: '05 · RUNNING IT',
        title: 'Emulator, physical device, or both.',
        body: `
<h3>The emulator</h3>
<ul>
  <li><strong>Enable hardware acceleration.</strong> On Windows this means the Windows Hypervisor Platform feature. Without it the emulator is slow enough to be useless.</li>
  <li><strong>Use an x86_64 system image.</strong> ARM images run under translation and are dramatically slower.</li>
  <li><strong>Give it a realistic device profile.</strong> A phone-sized window catches layout problems that a large emulator hides.</li>
  <li><strong>Cold boot when something is stuck.</strong> A corrupted snapshot explains a surprising share of &ldquo;the emulator will not start&rdquo; reports.</li>
</ul>
<h3>A physical device</h3>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · CONNECT A PHONE</div>
  <pre><code># Enable developer options and USB debugging on the phone first
adb devices
flutter devices
flutter run

# Wireless, on Android 11 and later
adb pair 192.168.1.50:41234
adb connect 192.168.1.50:5555</code></pre>
</div>
<p>Always test on real hardware before release. Emulators do not reproduce actual performance, real notification behaviour, aggressive vendor battery optimisation, or how the app behaves when the system reclaims memory. The <a href="android-adb-setup-guide.html">ADB guide</a> covers the device side in more detail.</p>`,
      },
      {
        id: 'failures',
        nav: 'Common failures',
        label: '06 · FAILURES',
        title: 'Seven errors, and what each one actually means.',
        body: `
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Message</th><th>Meaning</th><th>Fix</th></tr>
    </thead>
    <tbody>
      <tr><td>cmdline-tools component is missing</td><td>The command line tools package was not installed</td><td>SDK Manager, SDK Tools tab, tick Android SDK Command-line Tools</td></tr>
      <tr><td>Android licence status unknown</td><td>Licences not accepted for this SDK installation</td><td>flutter doctor --android-licenses, then accept each one</td></tr>
      <tr><td>Unsupported class file major version</td><td>JDK newer than the project Gradle supports</td><td>Install a matching JDK and set JAVA_HOME and the Flutter jdk-dir</td></tr>
      <tr><td>Gradle task assembleDebug failed</td><td>A generic wrapper around the real error</td><td>Run gradlew assembleDebug --stacktrace inside android for the actual cause</td></tr>
      <tr><td>Filename too long</td><td>Windows path limit inside a deep build tree</td><td>Move the project near the drive root, or enable long paths</td></tr>
      <tr><td>Waiting for another flutter command to release the startup lock</td><td>A stale lock file from a killed process</td><td>Close every editor, then delete the lockfile in the Flutter SDK bin cache</td></tr>
      <tr><td>Builds are extremely slow</td><td>Antivirus scanning the build output</td><td>Exclude the project, the Flutter SDK and the Gradle cache from real-time scanning</td></tr>
    </tbody>
  </table>
</div>
<div class="note note-good">
  <p><strong>When a build fails, read the Gradle error, not the Flutter one.</strong> Change into the <code>android</code> directory and run the Gradle task directly with <code>--stacktrace</code>. Flutter summarises; Gradle tells you which dependency, which plugin and which line.</p>
</div>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '07 · QUICK ANSWERS',
    faqHeading: 'Flutter on Windows, briefly.',
    faqs: [
      [
        'Do I need Android Studio to use Flutter?',
        'You need the Android SDK, and Android Studio is the simplest way to get it along with the emulator and SDK manager. You can install the standalone command line tools instead and work entirely in another editor, which is leaner and better suited to CI, but you then wire up each component yourself.',
      ],
      [
        'Which JDK version should I use with Flutter?',
        'The one your project Gradle version supports, not necessarily the newest. Check the Gradle version in android/gradle/wrapper/gradle-wrapper.properties, install a JDK in its supported range, set JAVA_HOME, and point Flutter at it with flutter config --jdk-dir. Installing the newest JDK is the usual cause of the unsupported class file major version error.',
      ],
      [
        'What does the cmdline-tools component is missing error mean?',
        'The Android SDK Command-line Tools package is not installed. Open the SDK Manager in Android Studio, go to the SDK Tools tab, tick Android SDK Command-line Tools and apply. This package provides sdkmanager and the licence machinery, so licence acceptance also fails without it.',
      ],
      [
        'Should I use FVM for Flutter versions?',
        'Once you maintain more than one app, yes. FVM installs Flutter SDK versions side by side and pins one per repository, so upgrading the SDK becomes a deliberate per-project decision instead of a global change. Commit the configuration and point your editor at the project SDK path so the analyser and the build agree.',
      ],
      [
        'Why are my Flutter builds so slow on Windows?',
        'Usually antivirus real-time scanning over the build output, the Gradle cache and the Flutter SDK, which are all directories full of thousands of small files. Add exclusions for the project directory, the Flutter SDK and the Gradle home directory. A deep path near the Windows path length limit is the second most common cause.',
      ],
    ],
    related: [
      ['android-adb-setup-guide.html', 'Set up ADB and use it properly'],
      ['git-ssh-keys-github-guide.html', 'SSH keys and signed commits for GitHub'],
      ['wsl2-setup-windows-guide.html', 'Set up WSL2 properly on Windows'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'Every app on this site is built with exactly this toolchain and shipped from a Windows machine.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'python-virtual-environment-guide.html',
    kicker: 'WORKSHOP—11 · DEVELOPER SETUP · 10 MIN READ',
    title: 'Python Virtual Environments Without the Mess · Nyxelium',
    ogTitle: 'Python Virtual Environments Without the Mess',
    description:
      'How Python environments actually work, when to use venv, uv, Poetry, pipx or conda, and how to make a project reproducible on someone else machine.',
    twitterDescription:
      'venv, uv, Poetry, pipx and conda — which one solves your problem, and how to keep a project reproducible.',
    keywords:
      'Python virtual environment, venv tutorial, uv package manager, Poetry vs pip, pipx CLI tools, conda vs pip, requirements.txt lockfile, pyproject.toml',
    articleSection: 'Developer tooling',
    audience: 'Python developers',
    proficiency: 'Beginner',
    headline: 'Python environments, explained once so they stop biting.',
    deck: 'Every Python problem that starts with &ldquo;it works on my machine&rdquo; is an environment problem. This is what a virtual environment actually is, which of the five popular tools solves which problem, and the small set of habits that make a project rebuild identically somewhere else.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'Tool-agnostic',
      text: 'The habits matter more than the tool. Any of these works if you follow the last section.',
      facts: [
        'VENV · UV · POETRY',
        'PIPX FOR CLI TOOLS',
        'WHEN CONDA IS RIGHT',
        'SIX REPRODUCIBILITY HABITS',
      ],
    },
    sections: [
      {
        id: 'model',
        nav: 'How it works',
        label: '01 · THE MODEL',
        title: 'A virtual environment is a directory and a path trick.',
        body: `
<p class="lede">There is no magic here, and knowing the mechanism makes the failures obvious instead of mysterious.</p>
<p>A virtual environment is a directory containing a link to a Python interpreter, its own <code>site-packages</code> folder, and scripts that put its <code>bin</code> or <code>Scripts</code> directory first on your PATH. Activating it means adjusting PATH for that shell. Nothing more.</p>
<p>Which explains the classic failures:</p>
<ul>
  <li><strong>&ldquo;I installed it but Python cannot import it&rdquo;</strong> — the install went to a different environment than the interpreter you ran.</li>
  <li><strong>&ldquo;It works in the terminal but not in the editor&rdquo;</strong> — the editor selected a different interpreter.</li>
  <li><strong>&ldquo;It broke after I installed something unrelated&rdquo;</strong> — a shared global environment where one package upgraded another package&rsquo;s dependency.</li>
  <li><strong>&ldquo;sudo pip install fixed it&rdquo;</strong> — it did not. It modified the system Python that your operating system depends on.</li>
</ul>
<div class="note note-warn">
  <p><strong>Never install into the system Python.</strong> On Linux and macOS, package managers and OS tooling depend on it. Modern Python even refuses by default, and the correct response to that error is to make an environment, not to override the protection.</p>
</div>`,
      },
      {
        id: 'venv',
        nav: 'venv, the baseline',
        label: '02 · THE BASELINE',
        title: 'venv ships with Python and is enough for many projects.',
        body: `
<div class="cmd">
  <div class="cmd-head">POWERSHELL · VENV ON WINDOWS</div>
  <pre><code># Create an environment in the project directory
py -3.12 -m venv .venv

# Activate it for this shell
.\\.venv\\Scripts\\Activate.ps1

# Install into it, then record what you installed
pip install requests
pip freeze &gt; requirements.txt

deactivate</code></pre>
</div>
<div class="cmd">
  <div class="cmd-head">BASH · THE SAME THING ON LINUX OR MACOS</div>
  <pre><code>python3 -m venv .venv
source .venv/bin/activate
pip install requests
pip freeze &gt; requirements.txt
deactivate</code></pre>
</div>
<h3>Conventions that prevent most confusion</h3>
<ul>
  <li><strong>Name it <code>.venv</code>, inside the project.</strong> Editors detect that name automatically, and it keeps the environment next to what it belongs to.</li>
  <li><strong>Add it to <code>.gitignore</code>.</strong> Environments are built artefacts, not source. They are also not portable between machines.</li>
  <li><strong>Use <code>python -m pip</code> rather than bare <code>pip</code></strong> when in doubt. It guarantees the install goes to the interpreter you think it does.</li>
  <li><strong>Select the interpreter in your editor</strong> explicitly, and check the status bar rather than assuming.</li>
</ul>
<p><strong>Where venv stops being enough:</strong> <code>requirements.txt</code> from <code>pip freeze</code> records what you happened to have, not what you asked for. It mixes direct dependencies with transitive ones, does not capture hashes, and does not distinguish development tools from runtime requirements. That is the gap the next section fills.</p>`,
      },
      {
        id: 'tools',
        nav: 'The tool landscape',
        label: '03 · THE TOOLS',
        title: 'Five tools, five different problems.',
        body: `
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Tool</th><th>Solves</th><th>Use it when</th></tr>
    </thead>
    <tbody>
      <tr><td>venv + pip</td><td>Isolation</td><td>Small projects, scripts, and anywhere you want zero extra tooling</td></tr>
      <tr><td>uv</td><td>Isolation, resolution, locking, Python version installs — quickly</td><td>Most new projects. It replaces several tools and is dramatically faster.</td></tr>
      <tr><td>Poetry</td><td>Dependency management and packaging with a lockfile</td><td>Libraries you publish, and teams that want one opinionated workflow</td></tr>
      <tr><td>pipx</td><td>Installing command line applications in isolation</td><td>Anything you run rather than import: linters, formatters, generators</td></tr>
      <tr><td>conda / mamba</td><td>Non-Python binary dependencies and scientific stacks</td><td>Data and scientific work where compiled libraries are the hard part</td></tr>
    </tbody>
  </table>
</div>
<h3>A default worth adopting</h3>
<div class="cmd">
  <div class="cmd-head">SHELL · UV, END TO END</div>
  <pre><code># Start a project with a pyproject.toml
uv init my-project
cd my-project

# Add dependencies; the lockfile updates automatically
uv add requests
uv add --dev pytest ruff

# Run inside the environment without activating it
uv run pytest

# Reproduce the exact environment elsewhere
uv sync</code></pre>
</div>
<p>The important part is not the speed, it is <code>uv.lock</code>: an exact, hashed resolution of every package that <code>uv sync</code> reproduces on another machine. That is the difference between a project that rebuilds and one that merely usually rebuilds.</p>
<h3>pipx for tools, always</h3>
<div class="cmd">
  <div class="cmd-head">SHELL · COMMAND LINE TOOLS</div>
  <pre><code>pipx install ruff
pipx install httpie
pipx list

# Or run something once without installing it
pipx run cowsay hello</code></pre>
</div>
<p>Each tool gets its own environment and a shim on PATH, so installing two applications with conflicting dependencies stops being a problem. If you have ever broken a linter by installing an unrelated CLI, this is the fix.</p>`,
      },
      {
        id: 'versions',
        nav: 'Python versions',
        label: '04 · INTERPRETERS',
        title: 'The version of Python is part of the environment.',
        body: `
<p class="lede">An environment pins packages. It does not pin the interpreter that created it, which is the second half of reproducibility.</p>
<ul>
  <li><strong>Windows: use the <code>py</code> launcher.</strong> <code>py -3.12 -m venv .venv</code> selects the interpreter explicitly rather than relying on PATH order.</li>
  <li><strong>uv can install interpreters</strong> — <code>uv python install 3.12</code> — which removes the need for a separate version manager entirely.</li>
  <li><strong>pyenv and mise</strong> manage multiple interpreters on Unix-like systems; pyenv-win exists but is rougher than the alternatives.</li>
  <li><strong>Commit a <code>.python-version</code> file</strong> so the next person, and CI, resolve the same interpreter.</li>
  <li><strong>Declare <code>requires-python</code> in <code>pyproject.toml</code></strong> so resolution fails loudly rather than installing something incompatible.</li>
</ul>
<div class="note">
  <p><strong>Do not delete the system Python to install a newer one.</strong> On Linux, package management depends on it. Install additional versions alongside and select them per project — the same principle as Node version managers, for the same reason.</p>
</div>`,
      },
      {
        id: 'conda',
        nav: 'When to use conda',
        label: '05 · THE SCIENTIFIC CASE',
        title: 'conda solves a different problem, and mixing is where it hurts.',
        body: `
<p class="lede">conda manages non-Python binaries — compilers, CUDA runtimes, linear algebra libraries — which is exactly the part pip historically could not handle.</p>
<p>Wheels have narrowed that gap considerably, so plain pip now works for many scientific stacks. conda still wins when you need specific compiled toolchains, a pinned CUDA runtime, or a stack that is genuinely painful to build from source.</p>
<ul>
  <li><strong>Use mamba, or conda&rsquo;s modern solver.</strong> The classic solver is slow enough to change how you work.</li>
  <li><strong>Prefer conda-forge</strong> and be consistent about channels. Mixing channels is where unexplainable conflicts come from.</li>
  <li><strong>Do not mix pip and conda casually.</strong> If you must, install everything available through conda first, then pip for the remainder, and never install a package with both.</li>
  <li><strong>Export properly.</strong> <code>conda env export --from-history</code> records what you asked for, not the entire resolved graph including platform-specific builds.</li>
</ul>
<div class="note">
  <p><strong>If nothing in your project needs a compiled toolchain, you do not need conda.</strong> Many people carry it for years out of habit from one tutorial, and pay for it in resolution time and channel conflicts.</p>
</div>`,
      },
      {
        id: 'reproducible',
        nav: 'Reproducibility',
        label: '06 · REPRODUCIBILITY',
        title: 'Six habits that make the environment rebuildable.',
        body: `
<div class="step-grid">
  <div class="step">
    <span class="step-num">HABIT—01</span>
    <strong>Commit the lockfile</strong>
    <p>uv.lock, poetry.lock or a compiled requirements file with hashes. Without it, &ldquo;install the dependencies&rdquo; is a different operation every week.</p>
  </div>
  <div class="step">
    <span class="step-num">HABIT—02</span>
    <strong>Separate direct from transitive</strong>
    <p>Declare what you actually import in pyproject.toml. Let the lockfile hold the rest.</p>
  </div>
  <div class="step">
    <span class="step-num">HABIT—03</span>
    <strong>Split dev dependencies</strong>
    <p>Test and lint tools do not belong in a production install. Every modern tool supports a dev group.</p>
  </div>
  <div class="step">
    <span class="step-num">HABIT—04</span>
    <strong>Pin the interpreter</strong>
    <p>.python-version plus requires-python. An environment built on a different Python is a different environment.</p>
  </div>
  <div class="step">
    <span class="step-num">HABIT—05</span>
    <strong>Rebuild from scratch periodically</strong>
    <p>Delete .venv and reinstall from the lockfile. It is the only way to find the dependency you installed manually and never declared.</p>
  </div>
  <div class="step">
    <span class="step-num">HABIT—06</span>
    <strong>Write down the setup</strong>
    <p>Three lines in the README beat any tooling. Someone, including future you, will arrive without context.</p>
  </div>
</div>
<div class="note note-good">
  <p><strong>The test that matters:</strong> clone the repository into a new directory on a machine that has never seen it, run your documented setup command, and run the test suite. If that fails, the environment is not reproducible regardless of which tool produced it.</p>
</div>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '07 · QUICK ANSWERS',
    faqHeading: 'Python environments, briefly.',
    faqs: [
      [
        'What is a Python virtual environment?',
        'A directory containing a link to a Python interpreter, its own site-packages folder and activation scripts that put it first on your PATH. Activating one adjusts PATH for that shell so installs and imports resolve to that environment rather than to the system Python.',
      ],
      [
        'Should I use venv, Poetry or uv?',
        'venv and pip are enough for small projects and require nothing extra. uv is the best default for new projects: it creates environments, resolves and locks dependencies, and can install Python versions, all considerably faster. Poetry suits libraries you publish and teams that want one opinionated workflow. All three are fine if you commit a lockfile.',
      ],
      [
        'Do I need conda?',
        'Only if you need non-Python binary dependencies such as specific compiled toolchains or a pinned CUDA runtime. Wheels have made plain pip viable for most scientific stacks. If nothing in your project needs a compiler, conda adds resolution time and channel conflicts without solving a problem you have.',
      ],
      [
        'Why does pip install work but the import still fail?',
        'The install and the import used different interpreters. Check which environment is active, run python -m pip install rather than bare pip so the install targets the interpreter you are running, and confirm your editor has selected the same interpreter as your terminal.',
      ],
      [
        'Should I commit the virtual environment to Git?',
        'No. Environments are built artefacts, contain absolute paths and platform-specific binaries, and are not portable between machines. Add .venv to .gitignore and commit the lockfile instead, which is what allows the environment to be rebuilt identically.',
      ],
    ],
    related: [
      ['run-local-llm-offline-guide.html', 'Run a language model locally and offline'],
      ['install-nodejs-windows-nvm.html', 'Install Node.js the way that survives version changes'],
      ['docker-desktop-alternatives-windows.html', 'Docker Desktop alternatives on Windows'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'Small tools that do one job properly. Same philosophy, different platform.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════════════════════════════════════════ */
  {
    file: 'git-ssh-keys-github-guide.html',
    kicker: 'WORKSHOP—12 · DEVELOPER SETUP · 9 MIN READ',
    title: 'GitHub SSH Keys and Signed Commits, Set Up Once · Nyxelium',
    ogTitle: 'GitHub SSH Keys and Signed Commits, Set Up Once',
    description:
      'Generate an SSH key properly, handle several GitHub accounts on one machine, sign commits without GPG, and know what to do the day a key leaks.',
    twitterDescription:
      'SSH keys, multiple accounts, SSH commit signing and key rotation — the whole GitHub auth setup.',
    keywords:
      'GitHub SSH key, ed25519 ssh-keygen, ssh config multiple accounts, sign commits SSH, verified commits GitHub, personal access token scopes, rotate SSH key',
    articleSection: 'Developer tooling',
    audience: 'Developers using GitHub',
    proficiency: 'Beginner',
    headline: 'Authentication and signing, configured once and then forgotten.',
    deck: 'SSH keys, multiple accounts on one machine, and the verified badge on your commits are three small configurations that people redo badly every time they get a new laptop. Here is each of them in full, plus the part nobody plans for: what to do the day a key ends up somewhere it should not be.',
    aside: {
      label: 'WORKSHOP NOTE',
      strong: 'One machine, one key',
      text: 'Per-machine keys make revocation possible. Copying one key everywhere makes it impossible.',
      facts: [
        'ED25519 KEYS',
        'TWO ACCOUNTS, ONE MACHINE',
        'SSH COMMIT SIGNING',
        'KEY ROTATION PLAN',
      ],
    },
    howTo: {
      name: 'Set up an SSH key for GitHub',
      description:
        'Generate an ed25519 SSH key, add it to the agent and to your GitHub account, and verify the connection.',
      totalTime: 'PT10M',
      anchor: 'keys',
      tools: ['Git', 'OpenSSH client'],
      steps: [
        ['Generate a key', 'Run ssh-keygen -t ed25519 with a comment identifying the machine, and set a passphrase.'],
        ['Start the agent', 'Start the SSH agent so the passphrase is entered once per session rather than per operation.'],
        ['Add the key to the agent', 'Run ssh-add against the new private key.'],
        ['Add the public key to GitHub', 'Copy the .pub file contents into the SSH keys section of your GitHub account settings.'],
        ['Test the connection', 'Run ssh -T git@github.com and confirm GitHub greets you by username.'],
        ['Switch remotes to SSH', 'Update existing repository remotes from HTTPS to the SSH URL.'],
      ],
    },
    sections: [
      {
        id: 'choice',
        nav: 'SSH, HTTPS or CLI',
        label: '01 · THE CHOICE',
        title: 'Three ways to authenticate, and when each is right.',
        body: `
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Method</th><th>How it works</th><th>Best for</th><th>Watch out for</th></tr>
    </thead>
    <tbody>
      <tr><td>SSH keys</td><td>A key pair per machine; the public half lives on your account</td><td>Your own machines, long-lived setups, servers</td><td>Blocked outbound on some corporate networks, though port 443 works around it</td></tr>
      <tr><td>HTTPS with a token</td><td>A personal access token stored in a credential helper</td><td>Restricted networks, CI, short-lived access</td><td>Tokens expire, and scopes are easy to over-grant</td></tr>
      <tr><td>GitHub CLI</td><td>Browser sign-in that configures Git for you</td><td>Getting productive in two minutes</td><td>You still want a key for servers and automation</td></tr>
    </tbody>
  </table>
</div>
<p><strong>The pragmatic answer for a personal machine is SSH.</strong> There is nothing to expire, nothing to paste, and revoking access to one machine is a single click that does not affect anything else.</p>`,
      },
      {
        id: 'keys',
        nav: 'Generate a key',
        label: '02 · THE KEY',
        title: 'One ed25519 key, per machine, with a passphrase.',
        body: `
<div class="cmd">
  <div class="cmd-head">SHELL · GENERATE AND REGISTER</div>
  <pre><code># The comment identifies the machine, not you. It appears in GitHub.
ssh-keygen -t ed25519 -C "desktop-windows-2026"

# Start the agent and load the key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy the PUBLIC half into GitHub, Settings, SSH and GPG keys
cat ~/.ssh/id_ed25519.pub

# Confirm it works
ssh -T git@github.com</code></pre>
</div>
<p>On Windows, PowerShell has OpenSSH built in. Start the agent as a service once and it will hold your key across sessions:</p>
<div class="cmd">
  <div class="cmd-head">POWERSHELL (ADMIN) · PERSISTENT AGENT</div>
  <pre><code>Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
ssh-add $env:USERPROFILE\\.ssh\\id_ed25519</code></pre>
</div>
<h3>Four rules worth following</h3>
<ul>
  <li><strong>ed25519, not RSA.</strong> Shorter, faster and the current default. Use RSA only for a system that genuinely cannot accept anything else.</li>
  <li><strong>Set a passphrase.</strong> The agent means you type it once per session. A key without one is a plaintext credential in a predictable location.</li>
  <li><strong>One key per machine.</strong> Copying a key between computers means you can never revoke one without breaking the others.</li>
  <li><strong>Never commit a private key.</strong> Automated scanners find them within minutes of a push, including in a repository you later make private.</li>
</ul>
<div class="note">
  <p><strong>If SSH is blocked on your network</strong>, GitHub accepts SSH over port 443. Add a host entry for <code>ssh.github.com</code> on port 443 in your SSH config and it behaves identically.</p>
</div>`,
      },
      {
        id: 'multiple',
        nav: 'Several accounts',
        label: '03 · MULTIPLE ACCOUNTS',
        title: 'Work and personal on one machine, without confusion.',
        body: `
<p class="lede">The reliable approach is one key per account plus SSH host aliases, so the remote URL itself selects the identity.</p>
<div class="cmd">
  <div class="cmd-head">~/.SSH/CONFIG</div>
  <pre><code>Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal
  IdentitiesOnly yes

Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_work
  IdentitiesOnly yes</code></pre>
</div>
<div class="cmd">
  <div class="cmd-head">SHELL · USING THE ALIAS</div>
  <pre><code># Clone through the alias to use the work identity
git clone git@github-work:company/project.git

# Fix an existing repository
git remote set-url origin git@github-work:company/project.git
git remote -v</code></pre>
</div>
<p><code>IdentitiesOnly yes</code> matters more than it looks: without it, the agent offers every loaded key in turn, and the server accepts the first one that works — which may not be the account you intended.</p>
<h3>Getting the commit author right too</h3>
<div class="cmd">
  <div class="cmd-head">~/.GITCONFIG · CONDITIONAL IDENTITY</div>
  <pre><code>[user]
  name = Your Name
  email = personal@example.com

[includeIf "gitdir:~/work/"]
  path = ~/.gitconfig-work</code></pre>
</div>
<p>Every repository under <code>~/work/</code> then picks up the work name and email automatically. This prevents the other half of the problem: correct authentication with the wrong author on the commit.</p>`,
      },
      {
        id: 'signing',
        nav: 'Signed commits',
        label: '04 · SIGNING',
        title: 'Sign with the SSH key you already have.',
        body: `
<p class="lede">Commit signing proves a commit came from you rather than from anyone who can set a name and email — which is anyone. Modern Git can sign with an SSH key, so there is no reason to set up GPG unless you already use it.</p>
<div class="cmd">
  <div class="cmd-head">SHELL · SSH COMMIT SIGNING</div>
  <pre><code>git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
git config --global tag.gpgsign true

# Verify locally
git log --show-signature -1</code></pre>
</div>
<p>Then add the <strong>same public key a second time</strong> in your GitHub settings, with the type set to <em>Signing Key</em> rather than Authentication Key. One key, two registrations, two purposes. Commits then show the verified badge.</p>
<ul>
  <li><strong>Enable vigilant mode</strong> in your GitHub settings once every machine signs. Unsigned commits attributed to you are then flagged as unverified rather than silently trusted.</li>
  <li><strong>Register every machine&rsquo;s key</strong> as a signing key, or commits from the others will show as unverified.</li>
  <li><strong>Web edits sign automatically</strong> with GitHub&rsquo;s own key, which is expected and fine.</li>
</ul>
<div class="note">
  <p><strong>Signing is not a formality on a public repository.</strong> Anyone can author a commit under your name and email. The signature is the only thing that distinguishes your work from an impersonation of it.</p>
</div>`,
      },
      {
        id: 'tokens',
        nav: 'Tokens and scopes',
        label: '05 · TOKENS',
        title: 'When you do need a token, scope it narrowly.',
        body: `
<p class="lede">Automation and restricted networks still need HTTPS with a token. The failure mode there is not leakage so much as over-permission.</p>
<ul>
  <li><strong>Prefer fine-grained tokens.</strong> They target specific repositories with specific permissions, instead of granting a scope across everything you can see.</li>
  <li><strong>Set an expiry.</strong> A token that never expires is a permanent credential you will forget about. Ninety days is a reasonable default.</li>
  <li><strong>One token per purpose.</strong> Separate tokens for CI, a local script and a deployment mean you can revoke one without an outage everywhere else.</li>
  <li><strong>Never put a token in a URL.</strong> It ends up in shell history, in logs, and in the repository configuration file.</li>
  <li><strong>Use the credential manager.</strong> Git Credential Manager on Windows stores tokens in the OS credential store rather than in a plaintext file.</li>
  <li><strong>In CI, use the provided identity.</strong> GitHub Actions supplies a scoped token for the workflow run; a long-lived personal token is a downgrade in both security and convenience.</li>
</ul>`,
      },
      {
        id: 'rotation',
        nav: 'When a key leaks',
        label: '06 · ROTATION',
        title: 'The five minutes after a credential is exposed.',
        body: `
<p class="lede">Committed a private key, pushed a token, or lost a laptop. In that order, immediately:</p>
<div class="step-grid">
  <div class="step">
    <span class="step-num">STEP—01</span>
    <strong>Revoke first</strong>
    <p>Delete the key or token in GitHub settings before anything else. Cleaning history while the credential is still valid is the wrong order.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—02</span>
    <strong>Generate a replacement</strong>
    <p>New key pair, new passphrase, registered for both authentication and signing.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—03</span>
    <strong>Audit the account</strong>
    <p>Review security log, active sessions, authorised applications and deploy keys. Look for anything you did not create.</p>
  </div>
  <div class="step">
    <span class="step-num">STEP—04</span>
    <strong>Then clean the history</strong>
    <p>Rewrite it out of the repository, force-push, and ask GitHub support to expire cached views of the old objects.</p>
  </div>
</div>
<div class="note note-warn">
  <p><strong>Treat any exposed secret as compromised, permanently.</strong> Public repositories are scanned continuously by automated systems; a key pushed and deleted a minute later has been collected. Rotate it rather than hoping.</p>
</div>
<h3>Routine hygiene</h3>
<ul>
  <li>Review your registered SSH keys twice a year and remove machines you no longer own.</li>
  <li>Give each key a comment that identifies the machine, so the list is meaningful later.</li>
  <li>Enable secret scanning and push protection on repositories that accept contributions.</li>
  <li>Keep two-factor recovery codes somewhere that does not depend on the account they protect.</li>
</ul>`,
      },
    ],
    faqNav: 'Quick answers',
    faqLabel: '07 · QUICK ANSWERS',
    faqHeading: 'GitHub authentication, briefly.',
    faqs: [
      [
        'Should I use SSH or HTTPS for GitHub?',
        'SSH for your own machines: nothing expires, nothing gets pasted, and revoking one machine does not affect the others. HTTPS with a token is better on restricted networks where outbound SSH is blocked, and in automation. If SSH is blocked, GitHub also accepts SSH over port 443.',
      ],
      [
        'What type of SSH key should I create?',
        'ed25519. It is shorter, faster and the current default, and GitHub has supported it for years. Use RSA with at least 4096 bits only when you need to talk to a system that genuinely cannot accept ed25519. Always set a passphrase and let the SSH agent hold it for the session.',
      ],
      [
        'How do I use two GitHub accounts on one machine?',
        'Create a separate key per account, define a host alias for each in your SSH config with IdentitiesOnly set to yes, and clone through the alias. Add a conditional include in your global Git config so repositories under a work directory automatically use the work name and email on commits.',
      ],
      [
        'How do I get the verified badge on my commits?',
        'Configure Git to sign with SSH: set gpg.format to ssh, point user.signingkey at your public key, and enable commit.gpgsign. Then add the same public key to GitHub a second time with the type set to Signing Key. Register every machine key you use, or commits from the others will show as unverified.',
      ],
      [
        'I committed a private key. What now?',
        'Revoke it in GitHub settings immediately, before cleaning anything. Generate a replacement, review your account security log, active sessions, authorised applications and deploy keys, and only then rewrite the repository history. Assume the exposed key was collected by automated scanners regardless of how quickly you deleted it.',
      ],
    ],
    related: [
      ['deploy-static-site-github-pages.html', 'Deploy a static site on GitHub Pages'],
      ['install-flutter-windows-guide.html', 'Install Flutter and the Android SDK on Windows'],
      ['local-backup-3-2-1-guide.html', 'A 3-2-1 backup you will actually run'],
    ],
    callout: {
      label: 'FROM THE STUDIO',
      strong: 'Nyxelium — offline-first Android apps',
      text: 'This site is a static repository on GitHub Pages, signed and deployed with exactly this setup.',
      cta: 'See the apps',
      href: 'index.html#apps',
    },
  },
];
