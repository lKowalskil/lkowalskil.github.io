import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = 'https://lkowalskil.github.io';
const published = '2026-07-24';

const apps = {
  chrono: {
    name: 'Chrono',
    icon: 'assets/img/chrono-icon.png',
    screenshot: 'assets/img/chrono-01.png',
    playUrl: 'https://play.google.com/store/apps/details?id=com.nyxelium.chronotimetracker',
    privacyUrl: 'privacy-policy-chrono.html',
    category: 'ProductivityApplication',
    description: 'Offline Pomodoro timer and time tracker for Android.',
    facts: ['NO ACCOUNT REQUIRED', 'POMODORO + OPEN TIMER', 'CSV & CALENDAR EXPORT', 'LOCAL TIME HISTORY'],
  },
  mossby: {
    name: 'Mossby',
    icon: 'assets/img/mossby-icon.png',
    screenshot: 'assets/img/mossby-01.png',
    playUrl: 'https://play.google.com/store/apps/details?id=com.nyxelium.mossby',
    privacyUrl: 'privacy-policy-mossby.html',
    category: 'LifestyleApplication',
    description: 'Plant care tracker and watering reminder for Android.',
    facts: ['7-DAY WATERING FORECAST', 'CARE HISTORY & STREAKS', 'LIGHT-AWARE PLACEMENT', 'WORKS OFFLINE'],
  },
  cult: {
    name: 'Pocket Cult',
    icon: 'assets/img/cult-icon.png',
    screenshot: 'assets/img/cult-01.png',
    playUrl: 'https://play.google.com/store/apps/details?id=com.nyxelium.culttycoon',
    privacyUrl: 'privacy-policy-cult.html',
    category: 'GameApplication',
    description: 'Offline idle dungeon RPG and dark fantasy management game for Android.',
    facts: ['FULL OFFLINE PROGRESS', 'NO FORCED ADS', '15 BUILDINGS · 10 MINIONS', 'PRESTIGE & ASCENSION'],
  },
};

const pages = [
  {
    file: 'freelancer-time-tracker-android.html',
    app: 'chrono',
    guide: 'GUIDE—04 · FREELANCE WORK · 8 MIN READ',
    title: 'Freelancer Time Tracker for Android: Billable Hours & CSV · Nyxelium',
    ogTitle: 'A Practical Android Time Tracker for Freelancers',
    description: 'Track freelance billable hours on Android with an offline timesheet, client categories and CSV export. No account required.',
    headline: 'Turn working hours into a timesheet you can actually invoice.',
    deck: 'A low-admin time-tracking workflow for freelancers, consultants and solo contractors who need reliable billable hours without moving every session into the cloud.',
    audience: 'Freelancers, consultants and solo contractors',
    keywords: 'freelancer time tracker Android, billable hours tracker app, timesheet app Android, work hours tracker, CSV timesheet export, invoice time tracking',
    sections: [
      {
        id: 'billable-system',
        label: '01 · THE BILLABLE SYSTEM',
        title: 'A freelancer time tracker should answer one question: what can I bill?',
        body: `
          <p>The best freelance time-tracking setup is usually the smallest one that produces a defensible timesheet. You need the client, the kind of work, the duration and enough context to recognize the session later. Everything else is optional administration.</p>
          <p>On Android, a manual work-hours tracker is especially useful when your day moves between a desk, a client site and travel. An offline timer keeps running without depending on a browser tab or a stable connection, while a short note preserves the reason for the charge.</p>
          <div class="note"><p><strong>Start with billing categories, not task lists:</strong> Client A, Client B, internal admin and business development are often enough. Add project tags only when they change how you invoice or review the work.</p></div>`,
      },
      {
        id: 'daily-workflow',
        label: '02 · DAILY WORKFLOW',
        title: 'Use four habits to keep tracked hours accurate.',
        body: `
          <div class="step-grid">
            <div class="step"><span class="step-num">STEP—01</span><strong>Start at commitment</strong><p>Begin the timer when you open the client file, join the call or start the work—not after you remember.</p></div>
            <div class="step"><span class="step-num">STEP—02</span><strong>Name the outcome</strong><p>Add a short note such as “landing-page revisions” or “discovery call” so the entry survives contact with invoice day.</p></div>
            <div class="step"><span class="step-num">STEP—03</span><strong>Stop at the boundary</strong><p>End the session before switching clients. Clean boundaries matter more than second-by-second precision.</p></div>
            <div class="step"><span class="step-num">STEP—04</span><strong>Repair once daily</strong><p>Correct a forgotten stop time while the day is still fresh instead of guessing at the end of the month.</p></div>
          </div>`,
      },
      {
        id: 'csv-timesheet',
        label: '03 · CSV & INVOICING',
        title: 'Export a CSV timesheet before invoice details become a memory test.',
        body: `
          <p>A CSV export turns local timer history into a portable timesheet. Open it in Excel, Google Sheets or another spreadsheet, filter by client or project, then calculate the billable total using your normal rate. Keep the original export beside the invoice as a private audit trail.</p>
          <p>Calendar export serves a different purpose: it lets you compare tracked focus time with meetings and scheduled commitments. Use CSV for arithmetic and records; use calendar views for planning and explaining where a week went.</p>
          <h3>A five-minute weekly check</h3>
          <ul><li>Look for sessions with no client or vague notes.</li><li>Correct obvious overnight or forgotten timers.</li><li>Separate billable delivery from unbilled admin.</li><li>Export completed periods before sending invoices.</li></ul>`,
      },
      {
        id: 'choose-tracker',
        label: '04 · CHOOSING AN APP',
        title: 'Choose local simplicity when you do not need team surveillance.',
        body: `
          <p>A team platform is useful for approvals, payroll and shared project budgets. A solo freelancer may only need an Android timer, editable history, client tags and an exportable timesheet. Requiring an account for that workflow adds another password without improving the record.</p>
          <p>Chrono combines an open work timer with Pomodoro cycles, categories, tags, analytics and CSV export. It is designed for a personal record rather than employee monitoring, making it a practical fit for contractors who own their process.</p>`,
      },
    ],
    faqs: [
      ['What should a freelancer track for each work session?', 'Track the client or project, duration and a short description of the outcome. Add tags only when they help with an invoice or review.'],
      ['Can Chrono export billable hours?', 'Chrono exports time entries as CSV so you can filter and total them in Excel, Google Sheets or another spreadsheet.'],
      ['Does a freelance time tracker need an internet connection?', 'Not for Chrono’s core timer and local history. You can record work offline and export the data later.'],
      ['Is Chrono an invoicing app?', 'No. Chrono records and exports time; you use the resulting timesheet with your existing invoicing workflow.'],
    ],
    related: ['private-time-tracker-no-account.html', 'pomodoro-study-timer-android.html', 'offline-time-tracker-android.html'],
  },
  {
    file: 'pomodoro-study-timer-android.html',
    app: 'chrono',
    guide: 'GUIDE—05 · STUDY · 8 MIN READ',
    title: 'Pomodoro Study Timer for Android: Track Study Hours · Nyxelium',
    ogTitle: 'Pomodoro Study Timer and Study-Hours Tracker for Android',
    description: 'Use a Pomodoro study timer on Android to track study hours by subject, prepare for exams and review weekly focus time offline.',
    headline: 'Make study time visible—by subject, session and week.',
    deck: 'A practical Pomodoro study-timer system for students who want help starting, sensible breaks and an honest record of hours spent preparing.',
    audience: 'School, university and exam-preparation students',
    keywords: 'Pomodoro study timer Android, study hours tracker, exam study timer, focus timer for students, subject time tracker, offline study app',
    sections: [
      {
        id: 'study-structure',
        label: '01 · STUDY STRUCTURE',
        title: 'A study timer works best when every session has one subject and one outcome.',
        body: `
          <p>“Study chemistry” is too large to create a useful starting point. “Complete ten equilibrium problems” fits inside a focus session and leaves a visible result. Choose the subject, write the outcome and then start the timer.</p>
          <p>Tracking study hours by subject gives you a reality check before an exam. It shows whether the difficult course is receiving attention or merely occupying mental space. The goal is not to maximize the number—it is to distribute deliberate practice where it matters.</p>
          <div class="note"><p><strong>Do not reward timer theatre:</strong> paused videos, open books and a running clock are not focused study. Stop or pause when the session stops being intentional.</p></div>`,
      },
      {
        id: 'pomodoro-length',
        label: '02 · TIMER LENGTH',
        title: 'Use 25/5 to begin; extend the interval when the work needs depth.',
        body: `
          <p>The classic Pomodoro rhythm—25 minutes of focus and a 5-minute break—is excellent when procrastination is the main obstacle. The short commitment makes beginning less dramatic. After several cycles, a longer break helps prevent the session from turning into low-quality endurance.</p>
          <p>For essays, coding and difficult problem sets, 45/10 or 50/10 may preserve context better. A customizable study timer should support the work rather than force every subject into one interval.</p>
          <ul><li><strong>Use 25/5</strong> for recall drills, reading starts and resistant days.</li><li><strong>Use 45/10 or 50/10</strong> for writing, problem solving and deep revision.</li><li><strong>Use an open timer</strong> when you are already in productive flow.</li></ul>`,
      },
      {
        id: 'subjects',
        label: '03 · SUBJECT TRACKING',
        title: 'Keep categories broad and notes specific.',
        body: `
          <p>Create one activity for each active subject: Mathematics, Biology, History or the course code you actually recognize. Put the chapter, assignment or practice set in the session note. This keeps the subject-level chart readable while preserving detail.</p>
          <p>At the end of the week, compare hours with upcoming deadlines and confidence. If one subject consumed many hours without improving recall, change the study method—not just the target number.</p>
          <div class="step-grid">
            <div class="step"><span class="step-num">REVIEW—01</span><strong>Hours by subject</strong><p>Find neglected courses and accidental over-investment.</p></div>
            <div class="step"><span class="step-num">REVIEW—02</span><strong>Session quality</strong><p>Notice which interval lengths produced finished work.</p></div>
            <div class="step"><span class="step-num">REVIEW—03</span><strong>Next deadline</strong><p>Move the next week’s time toward the nearest important assessment.</p></div>
            <div class="step"><span class="step-num">REVIEW—04</span><strong>One adjustment</strong><p>Change one subject allocation or focus method at a time.</p></div>
          </div>`,
      },
      {
        id: 'offline-study',
        label: '04 · OFFLINE & PRIVATE',
        title: 'An offline study timer removes one more reason to open a distracting browser.',
        body: `
          <p>A local Android timer remains available in libraries, trains and rooms with unreliable Wi-Fi. No-account setup also lets you begin the first session immediately instead of turning preparation into another onboarding task.</p>
          <p>Chrono stores study sessions locally, supports Pomodoro and open timers, and shows daily, weekly and monthly time distribution. Students can use categories for subjects, notes for topics and CSV export for a private study log.</p>`,
      },
    ],
    faqs: [
      ['What is a good Pomodoro length for studying?', 'Start with 25 minutes of focus and a 5-minute break. Try 45–50 minute sessions for work that needs more context.'],
      ['Can I track study hours by subject?', 'Yes. In Chrono, create activities for subjects and use notes or tags for chapters, assignments and exam topics.'],
      ['Does Chrono work as an offline study timer?', 'Yes. Core timers and locally stored study history work without a permanent internet connection.'],
      ['Is Pomodoro useful for every study task?', 'No. It is especially useful for starting and sustaining repetitive work. Use an open timer when a fixed break would interrupt productive flow.'],
    ],
    related: ['offline-time-tracker-android.html', 'private-time-tracker-no-account.html', 'freelancer-time-tracker-android.html'],
  },
  {
    file: 'private-time-tracker-no-account.html',
    app: 'chrono',
    guide: 'GUIDE—06 · PRIVACY · 7 MIN READ',
    title: 'Private Time Tracker for Android: Offline, No Account · Nyxelium',
    ogTitle: 'A Private Offline Time Tracker With No Account',
    description: 'Track activities and work hours privately on Android with local storage, offline timers and no account. Learn what to check before choosing an app.',
    headline: 'Track your time without turning your day into cloud data.',
    deck: 'What “offline,” “local” and “no account” should mean in a personal time tracker—and how to keep a useful record without building a surveillance system for yourself.',
    audience: 'Privacy-conscious workers, students and personal trackers',
    keywords: 'private time tracker Android, offline time tracker no account, local time tracking app, no cloud timesheet, activity tracker privacy',
    sections: [
      {
        id: 'definitions',
        label: '01 · DEFINITIONS',
        title: 'No account and offline are related, but they are not the same promise.',
        body: `
          <p><strong>No account required</strong> means you can begin without an email address or login. <strong>Offline tracking</strong> means the core timer and history remain useful without a connection. <strong>Local storage</strong> means the working record lives on the device rather than depending on a remote dashboard.</p>
          <p>A private time tracker should state these boundaries clearly. Some apps work offline temporarily but synchronize later; others keep the main database local while using optional services for ads, purchases or diagnostics. Read the privacy page and the store’s Data safety section rather than relying on one slogan.</p>`,
      },
      {
        id: 'threat-model',
        label: '02 · YOUR USE CASE',
        title: 'Decide what you are protecting before comparing feature lists.',
        body: `
          <p>A student may simply want study history that is not tied to an identity. A freelancer may want client notes to remain on a personal phone. A worker may need to follow an employer’s device and records policy. These are different requirements.</p>
          <ul><li>Check whether an account is optional or mandatory.</li><li>Confirm that timers and history work in airplane mode.</li><li>Look for an export option before trusting months of records to one app.</li><li>Use a device lock and backups appropriate to the sensitivity of your notes.</li></ul>
          <div class="note"><p><strong>Local does not mean indestructible:</strong> if the phone is lost or reset, a local-only record may disappear. Export important periods regularly.</p></div>`,
      },
      {
        id: 'minimal-log',
        label: '03 · MINIMAL DATA',
        title: 'Collect less detail and you will have less detail to protect.',
        body: `
          <p>Most personal reviews need an activity name, duration and perhaps a short outcome. Avoid putting passwords, confidential client material or sensitive personal notes into a timer description. A useful log is not a diary of everything that happened.</p>
          <p>Broad categories such as Work, Study, Exercise and Reading can reveal time allocation without recording unnecessary specifics. When you need client or subject detail, tags keep it structured and easier to remove from an export.</p>`,
      },
      {
        id: 'chrono-local',
        label: '04 · CHRONO',
        title: 'Chrono keeps the core workflow on the Android device.',
        body: `
          <p>Chrono lets you start an open timer or Pomodoro session without creating an account. Activities, time entries and the working history are stored locally, and CSV export provides a portable copy for your own archive or analysis.</p>
          <p>That makes it suitable for a personal offline timesheet, study-hours log or activity tracker. As with any app, review the current privacy policy and Google Play Data safety disclosure for the complete picture.</p>`,
      },
    ],
    faqs: [
      ['Can I use a time tracker without creating an account?', 'Yes. Chrono allows core time tracking without an account or login.'],
      ['Will an offline time tracker lose data when the internet disconnects?', 'A properly local tracker continues writing to its on-device database. Device loss or reset is a separate risk, so export important records.'],
      ['Does private time tracking mean I should record confidential details?', 'No. Keep notes minimal and avoid passwords, private client content and other sensitive information.'],
      ['Can I export local time history?', 'Chrono supports CSV export, giving you a portable copy for spreadsheets, invoices or archives.'],
    ],
    related: ['offline-time-tracker-android.html', 'freelancer-time-tracker-android.html', 'pomodoro-study-timer-android.html'],
  },
  {
    file: 'houseplant-watering-schedule-app.html',
    app: 'mossby',
    guide: 'GUIDE—07 · WATERING · 8 MIN READ',
    title: 'Houseplant Watering Schedule App for Android · Nyxelium',
    ogTitle: 'Build a Better Houseplant Watering Schedule',
    description: 'Create a flexible houseplant watering schedule on Android with reminders, a seven-day forecast and care history for indoor plants.',
    headline: 'Give every houseplant a schedule—without watering by the calendar alone.',
    deck: 'A flexible indoor-plant watering system for busy plant owners who need reminders but still want to check the soil, season and room before pouring.',
    audience: 'Busy indoor gardeners with several houseplants',
    keywords: 'houseplant watering schedule app, indoor plant watering schedule, plant watering calendar Android, watering reminder app, when to water houseplants',
    sections: [
      {
        id: 'schedule-not-command',
        label: '01 · SCHEDULES',
        title: 'Treat a watering date as a check day, not an automatic command.',
        body: `
          <p>A fixed “water every seven days” rule ignores temperature, light, pot size, soil and season. A useful houseplant watering schedule tells you when to inspect a plant. You still decide whether the soil and plant actually need water.</p>
          <p>This distinction prevents two common failures: forgetting a thirsty plant for weeks and overwatering a slow-growing plant simply because a notification appeared.</p>
          <div class="note"><p><strong>Reminder language matters:</strong> read “check the plant today,” then water, snooze or skip based on what you find.</p></div>`,
      },
      {
        id: 'first-interval',
        label: '02 · FIRST INTERVAL',
        title: 'Start from a reasonable interval, then correct it from real observations.',
        body: `
          <p>Use a trusted care profile or your existing routine as the first interval. After each check, note whether the plant was dry, still moist or showing stress. Shorten or lengthen the schedule gradually instead of reacting to one unusual day.</p>
          <div class="step-grid">
            <div class="step"><span class="step-num">CHECK—01</span><strong>Soil</strong><p>Test below the surface rather than judging only the top layer.</p></div>
            <div class="step"><span class="step-num">CHECK—02</span><strong>Pot weight</strong><p>Learn how the container feels shortly after watering and when nearly dry.</p></div>
            <div class="step"><span class="step-num">CHECK—03</span><strong>Leaves</strong><p>Look for changes in firmness, droop, color or growth.</p></div>
            <div class="step"><span class="step-num">CHECK—04</span><strong>Season</strong><p>Expect many indoor plants to use water more slowly during darker months.</p></div>
          </div>`,
      },
      {
        id: 'many-plants',
        label: '03 · MULTIPLE PLANTS',
        title: 'Group the work by room while keeping each plant’s own interval.',
        body: `
          <p>When you own ten or twenty plants, one universal watering day becomes tempting—and risky. Organize plants into real zones such as Kitchen Window, Bedroom Shelf and Balcony, then retain an individual schedule for each pot.</p>
          <p>A seven-day watering forecast helps you see which days are likely to be busy. On the day itself, a due list reduces the mental load to a small route through the relevant rooms.</p>`,
      },
      {
        id: 'care-history',
        label: '04 · HISTORY',
        title: 'Use care history to tune the schedule rather than trust memory.',
        body: `
          <p>A plant watering tracker records what you did, not just what was planned. Over time, completed, snoozed and skipped tasks reveal whether the original interval matches the home.</p>
          <p>Mossby combines recurring watering reminders, a Today list, a seven-day forecast, zone organization and care history. It also schedules fertilizing, misting, rotating and repotting independently so watering does not become a stand-in for every kind of care.</p>`,
      },
    ],
    faqs: [
      ['How often should I water a houseplant?', 'There is no universal interval. Species, light, season, soil, pot and room conditions all affect how quickly water is used.'],
      ['Should I water whenever a reminder appears?', 'Use the reminder as a prompt to check. Water, snooze or skip after inspecting the soil and plant.'],
      ['Can one app manage different schedules for different plants?', 'Yes. Mossby keeps recurring care tasks per plant and shows due work in a shared daily view.'],
      ['Does Mossby show upcoming watering days?', 'Yes. Mossby includes a seven-day watering forecast organized across your plant zones.'],
    ],
    related: ['plant-care-tracker-android.html', 'plant-light-placement-guide-app.html', 'plant-watering-reminder-android.html'],
  },
  {
    file: 'plant-care-tracker-android.html',
    app: 'mossby',
    guide: 'GUIDE—08 · PLANT ORGANIZATION · 8 MIN READ',
    title: 'Plant Care Tracker for Android: Water, Mist & Repot · Nyxelium',
    ogTitle: 'Organize Houseplant Care on Android',
    description: 'Use a plant care tracker on Android for watering, fertilizing, misting, rotating and repotting schedules, organized by room and pot.',
    headline: 'Put the whole indoor garden into one calm care queue.',
    deck: 'A plant-care tracking method for collectors who have outgrown memory, scattered notes and one reminder that treats every plant the same.',
    audience: 'Houseplant collectors and people managing multiple rooms',
    keywords: 'plant care tracker Android, houseplant care app, plant care planner, plant care schedule, watering tracker, fertilizer reminder, repotting reminder',
    sections: [
      {
        id: 'care-types',
        label: '01 · CARE TYPES',
        title: 'Watering is only one recurring job in a plant-care planner.',
        body: `
          <p>A complete plant care schedule may include watering, fertilizing, misting, rotating and repotting. Those tasks operate at different rhythms. Combining them into one generic reminder makes it harder to know what is actually due.</p>
          <p>Give each plant only the tasks it needs. A cactus may need little beyond watering checks and occasional feeding; a fast-growing tropical plant may benefit from rotation, humidity attention and more frequent review.</p>`,
      },
      {
        id: 'zones-pots',
        label: '02 · ORGANIZATION',
        title: 'Model the garden the way you walk through the home.',
        body: `
          <p>Zones should be real places with meaningful conditions: South Window, Shaded Office, Bathroom Shelf or Balcony. Pots live inside those zones, and plants live inside the pots. That structure makes a morning care route obvious.</p>
          <p>It also prevents location context from disappearing. If a plant moves to a darker room, the tracker should help you reconsider placement and care rather than silently preserving the old assumptions.</p>
          <div class="note"><p><strong>Name places, not aesthetics:</strong> “Bedroom north window” is more useful than “Green corner” when you later evaluate light.</p></div>`,
      },
      {
        id: 'daily-queue',
        label: '03 · DAILY QUEUE',
        title: 'A useful plant reminder app shows what needs attention—and lets the rest stay quiet.',
        body: `
          <p>The Today list should separate due work from the full catalog. Complete a task when it is done, snooze it when the plant needs more time, or skip it when the care is unnecessary. Each action improves the history.</p>
          <div class="step-grid">
            <div class="step"><span class="step-num">ACTION—01</span><strong>Water</strong><p>Complete only after checking the plant and soil.</p></div>
            <div class="step"><span class="step-num">ACTION—02</span><strong>Snooze</strong><p>Move the check forward when the plant is not ready.</p></div>
            <div class="step"><span class="step-num">ACTION—03</span><strong>Skip</strong><p>Record that the planned task was intentionally not needed.</p></div>
            <div class="step"><span class="step-num">ACTION—04</span><strong>Review</strong><p>Adjust intervals when snoozes or overdue tasks become a pattern.</p></div>
          </div>`,
      },
      {
        id: 'offline-garden',
        label: '04 · PRIVATE GARDEN',
        title: 'Local plant records keep the routine available without an account.',
        body: `
          <p>A houseplant care app does not need to turn every leaf into an online profile. Mossby works offline, keeps plants and photos on the device, and lets you organize zones, pots, care tasks and history without creating an account.</p>
          <p>Its Smart Advisor adds a preventative layer: it checks a plant against the light in a chosen zone and warns about incompatible plants sharing a pot. That makes the tracker useful before a care mistake, not only after one.</p>`,
      },
    ],
    faqs: [
      ['What should a plant care tracker record?', 'Record the plant, its location, recurring care tasks, intervals and completed, snoozed or skipped actions.'],
      ['Can Mossby remind me about more than watering?', 'Yes. Mossby supports watering, fertilizing, misting, rotating and repotting tasks on separate schedules.'],
      ['Can I organize plants by room?', 'Yes. Mossby uses zones for real places and light conditions, with pots and plants organized inside them.'],
      ['Does Mossby require an account?', 'No. The core plant-care workflow works offline without creating an account.'],
    ],
    related: ['houseplant-watering-schedule-app.html', 'plant-light-placement-guide-app.html', 'plant-watering-reminder-android.html'],
  },
  {
    file: 'plant-light-placement-guide-app.html',
    app: 'mossby',
    guide: 'GUIDE—09 · PLANT LIGHT · 8 MIN READ',
    title: 'Plant Light & Placement Guide App for Indoor Plants · Nyxelium',
    ogTitle: 'Match Indoor Plants to the Light in Your Home',
    description: 'Learn how to place indoor plants by bright, medium or low light and use a plant app that warns when a room is too dark or too bright.',
    headline: 'Choose the room before the plant starts struggling.',
    deck: 'A practical indoor-plant placement system for beginners who are unsure whether a shelf, window or shaded corner provides the right light.',
    audience: 'Beginner plant owners choosing locations indoors',
    keywords: 'plant light guide app, indoor plant placement app, low light houseplant guide, bright indirect light plants, where to put houseplants',
    sections: [
      {
        id: 'room-light',
        label: '01 · ROOM LIGHT',
        title: 'Describe the real spot—not the room in general.',
        body: `
          <p>A living room can contain direct sun beside one window and deep shade two metres away. Plant placement should be evaluated at the exact shelf, sill or corner where the pot will live.</p>
          <p>Mossby uses three understandable zone levels: bright light, medium light and low light. They are a planning aid rather than a laboratory measurement, but they make the mismatch visible before a plant spends weeks stretching or scorching.</p>`,
      },
      {
        id: 'light-levels',
        label: '02 · LIGHT LEVELS',
        title: 'Use simple categories consistently.',
        body: `
          <div class="step-grid">
            <div class="step"><span class="step-num">BRIGHT</span><strong>Direct sun or very bright exposure</strong><p>Often near a strong south-facing window; check whether the species tolerates direct rays.</p></div>
            <div class="step"><span class="step-num">MEDIUM</span><strong>Bright, indirect light</strong><p>Well-lit without sustained harsh sun on the foliage.</p></div>
            <div class="step"><span class="step-num">LOW</span><strong>Shaded or north-facing</strong><p>Usable for shade-tolerant plants, but not the same as a room with no natural light.</p></div>
            <div class="step"><span class="step-num">RECHECK</span><strong>Seasonal change</strong><p>Sun angles and day length change; review important placements across the year.</p></div>
          </div>
          <div class="note"><p><strong>“Low light” is not “no light”:</strong> a plant still needs enough usable light to grow. Move it or add appropriate grow lighting when the location is effectively dark.</p></div>`,
      },
      {
        id: 'mismatch',
        label: '03 · MISMATCHES',
        title: 'Too little and too much light fail in different ways.',
        body: `
          <p>A plant with insufficient light may stretch toward the window, produce smaller growth or use water more slowly. A plant receiving harsh direct sun beyond its tolerance may develop scorched leaves and dry faster. Watering more cannot correct the wrong light.</p>
          <p>When symptoms appear, consider placement alongside watering, pests and soil. Changing several variables at once makes it difficult to learn what helped.</p>`,
      },
      {
        id: 'advisor',
        label: '04 · SMART ADVISOR',
        title: 'Use the app as an early warning, then observe the real plant.',
        body: `
          <p>In Mossby, you create a zone for a real spot and record its light level. When placing a catalog plant, the Smart Advisor compares the plant’s light appetite with the zone and warns when the location is too dark or too bright.</p>
          <p>The same placement flow can warn when two plants sharing a pot have known compatibility problems. It does not replace observation, but it catches preventable mismatches before they become a rescue project.</p>`,
      },
    ],
    faqs: [
      ['What does bright indirect light mean?', 'It is a well-lit position where the plant receives abundant light without prolonged harsh direct sun on its leaves.'],
      ['Can a low-light plant live in a room with no windows?', 'Low light still means usable light. A windowless location generally needs suitable grow lighting.'],
      ['How does Mossby check plant placement?', 'You assign a light level to a real zone, then Mossby compares it with the selected plant’s light needs.'],
      ['Does changing plant location affect watering?', 'Often yes. Light and temperature influence how quickly a plant uses water, so review its schedule after a move.'],
    ],
    related: ['plant-care-tracker-android.html', 'houseplant-watering-schedule-app.html', 'plant-watering-reminder-android.html'],
  },
  {
    file: 'offline-idle-rpg-android.html',
    app: 'cult',
    guide: 'GUIDE—10 · OFFLINE GAMES · 8 MIN READ',
    title: 'Offline Idle RPG for Android With Real Progress · Nyxelium',
    ogTitle: 'An Offline Idle RPG That Keeps Progressing',
    description: 'Looking for an offline idle RPG on Android? Learn what real offline progress, active decisions and meaningful prestige should include.',
    headline: 'An idle RPG should keep moving offline—and give you choices when you return.',
    deck: 'A player-first checklist for Android gamers who want offline progress without turning every return into ad collection and energy timers.',
    audience: 'Android players seeking deep offline progression',
    keywords: 'offline idle RPG Android, idle game without internet, offline progress game, incremental RPG Android, AFK game offline, idle dungeon game',
    sections: [
      {
        id: 'real-offline',
        label: '01 · OFFLINE PROGRESS',
        title: 'Real offline progress is more than a welcome-back timer.',
        body: `
          <p>An offline idle RPG should calculate meaningful production while the app is closed and make the result understandable when you return. The resources should connect to the same economy used during active play, not exist as a detached daily gift.</p>
          <p>Pocket Cult’s buildings and assigned minions continue producing resources offline. Returning gives you material for upgrades, hiring and strategic changes rather than merely another screen to dismiss.</p>`,
      },
      {
        id: 'active-decisions',
        label: '02 · ACTIVE PLAY',
        title: 'The best return loop asks you to make decisions, not just tap every red dot.',
        body: `
          <p>Idle progress creates a pile of possibility. Active play should decide how that possibility is spent: which building to upgrade, which minion to hire, where workers are most efficient and whether the economy can support their upkeep.</p>
          <p>Random events, raids and resource pressure keep the dungeon from becoming a straight line. Gold, Souls, Meat and Dark Knowledge interact, so maximizing one number without feeding the system can backfire.</p>`,
      },
      {
        id: 'no-internet',
        label: '03 · NO INTERNET',
        title: 'Offline play matters on trains, flights and unreliable connections.',
        body: `
          <p>A game that requires a server check at every launch is not truly available when the connection disappears. For travel-friendly Android games, verify that the core simulation, upgrades and returns work after the initial download.</p>
          <div class="note"><p><strong>Practical test:</strong> launch the installed game in airplane mode before a trip. Confirm that the save opens, progress continues and essential menus remain available.</p></div>
          <p>Pocket Cult is designed for offline play and has no energy system forcing you to wait for a server-controlled refill.</p>`,
      },
      {
        id: 'prestige-depth',
        label: '04 · LONG-TERM DEPTH',
        title: 'Prestige should turn a reset into a new strategy.',
        body: `
          <p>A meaningful prestige layer trades short-term progress for a permanent advantage. The next run should accelerate, but ideally it should also unlock different priorities or build paths.</p>
          <p>In Pocket Cult, Ascension resets the dungeon in exchange for Corruption, a permanent currency that strengthens future runs. Six progression tiers, fifteen buildings and ten minion types give that acceleration somewhere to go.</p>`,
      },
    ],
    faqs: [
      ['Can Pocket Cult be played without internet?', 'Yes. The core dungeon-management game and idle progress are designed to work offline.'],
      ['Does the game progress while closed?', 'Yes. Assigned production generates offline gains that are calculated when you return.'],
      ['Is Pocket Cult only a clicker?', 'No. You manage buildings, minion assignments, upkeep, multiple resources, events, raids and prestige decisions.'],
      ['Does Pocket Cult have an energy system?', 'No. There is no energy gate controlling when you are allowed to play.'],
    ],
    related: ['dungeon-keeper-game-android.html', 'idle-game-no-forced-ads.html', 'offline-idle-dungeon-game-android.html'],
  },
  {
    file: 'dungeon-keeper-game-android.html',
    app: 'cult',
    guide: 'GUIDE—11 · DUNGEON MANAGEMENT · 8 MIN READ',
    title: 'Dungeon Keeper Game for Android: Build the Villain Lair · Nyxelium',
    ogTitle: 'Build and Manage an Evil Dungeon on Android',
    description: 'Play the villain in an Android dungeon keeper game: build rooms, summon minions, manage resources and defend your lair offline.',
    headline: 'Stop saving the kingdom. Build the dungeon that defeats it.',
    deck: 'For players searching for a dungeon builder, evil-lair manager or villain simulator where rooms, minions and resources form one working machine.',
    audience: 'Dungeon-management and villain-simulator fans',
    keywords: 'dungeon keeper game Android, dungeon builder game, evil lair simulator, villain game Android, dark fantasy manager, demon summoner game',
    sections: [
      {
        id: 'keeper-fantasy',
        label: '01 · THE FANTASY',
        title: 'A dungeon keeper game puts the player behind the traps and monsters.',
        body: `
          <p>The appeal is inversion: heroes become intruders, skeletons become staff and the underground lair becomes a management problem. Good dungeon builders let the comedy and strategy reinforce each other.</p>
          <p>Pocket Cult casts you as the Dark One growing an abandoned lair into a functioning evil empire. The goal is not to explore somebody else’s dungeon—it is to construct, staff and defend your own.</p>`,
      },
      {
        id: 'rooms',
        label: '02 · BUILDINGS',
        title: 'Rooms should change production, capacity and strategic options.',
        body: `
          <p>A room is more satisfying when it belongs to an economy. Altars, Libraries, Bone Forges, Soul Wells, Torture Chambers and the Hellgate create or multiply different resources and capabilities across six tiers.</p>
          <p>Fifteen buildings make expansion a sequence of tradeoffs. Upgrading current production may be safer; unlocking the next tier may open stronger minions and better long-term growth.</p>`,
      },
      {
        id: 'minions',
        label: '03 · MINION MANAGEMENT',
        title: 'Summoned minions are workers, defenders and expenses.',
        body: `
          <p>Pocket Cult includes ten minion types, from Skeletons and Cultists to Demons, Necromancers, Liches and Pit Fiends. Each has different power, upkeep and building affinity.</p>
          <p>Assigning the right creature to the right building improves production, but every army consumes resources. If Meat collapses, loyalty and survival become part of the management problem. You are building a system, not collecting portraits.</p>
          <div class="note"><p><strong>Useful priority:</strong> stabilize production before hiring the most impressive creature you can afford. Purchase price is only the beginning; upkeep determines whether the dungeon can sustain it.</p></div>`,
      },
      {
        id: 'defense',
        label: '04 · DEFEND & ASCEND',
        title: 'Heroes, events and prestige stop the lair from becoming a spreadsheet.',
        body: `
          <p>Inquisitors, enemy raids, plagues, famines and eclipses interrupt the plan. Responding to those events gives your production choices consequences outside the upgrade menu.</p>
          <p>When a run reaches its limit, Ascension converts progress into permanent Corruption. The dungeon resets stronger, creating the long arc expected from an idle dungeon RPG while preserving the villain-management fantasy.</p>`,
      },
    ],
    faqs: [
      ['Do you play as the villain in Pocket Cult?', 'Yes. You manage an evil underground cult, build the lair and defend it from heroes and Inquisitors.'],
      ['How many buildings and minions are available?', 'Pocket Cult has fifteen buildings across six tiers and ten distinct minion types.'],
      ['Can minions work in buildings?', 'Yes. Minions can be assigned to worker slots, with different affinities and efficiency.'],
      ['Is Pocket Cult playable offline?', 'Yes. Core management and idle progress work without an internet connection.'],
    ],
    related: ['offline-idle-rpg-android.html', 'idle-game-no-forced-ads.html', 'offline-idle-dungeon-game-android.html'],
  },
  {
    file: 'idle-game-no-forced-ads.html',
    app: 'cult',
    guide: 'GUIDE—12 · PLAYER-FRIENDLY GAMES · 7 MIN READ',
    title: 'Idle Game for Android With No Forced Ads or Energy · Nyxelium',
    ogTitle: 'An Idle Android Game Without Forced Ads',
    description: 'Find an Android idle game with no forced ads, no energy system and full offline play. Learn what player-friendly monetization looks like.',
    headline: 'Let the dungeon idle—not the player behind an advertisement.',
    deck: 'A simple standard for players who want an idle Android game with optional rewards, offline progress and no mandatory commercial break between decisions.',
    audience: 'Mobile players tired of forced ads and energy gates',
    keywords: 'idle game no forced ads Android, offline game without ads interruption, no energy idle game, player friendly idle RPG, optional rewarded ads',
    sections: [
      {
        id: 'forced-vs-optional',
        label: '01 · AD DESIGN',
        title: 'A rewarded ad is a choice; a forced interstitial is an interruption.',
        body: `
          <p>Optional rewarded ads exchange attention for a clearly stated benefit. Forced interstitials take over between normal actions, often without a meaningful choice. The difference determines whether the game respects the player’s session.</p>
          <p>Pocket Cult does not force ads between builds, upgrades or returns. Rewarded opportunities are optional, and a one-time Remove Ads purchase is available for players who want to remove standard advertising.</p>`,
      },
      {
        id: 'energy-gates',
        label: '02 · ENERGY SYSTEMS',
        title: 'Energy gates manufacture stopping points that do not belong to the game.',
        body: `
          <p>An energy meter restricts how many actions you can take before waiting or paying. That can fit some online games, but it conflicts with an offline management game meant for flexible short sessions.</p>
          <p>Pocket Cult has cooldowns and economic constraints inside the simulation, but no global energy currency deciding whether you may play. You stop when you are finished, not when a monetization meter empties.</p>`,
      },
      {
        id: 'offline-value',
        label: '03 · OFFLINE VALUE',
        title: 'Idle progress should reward absence without demanding a video on return.',
        body: `
          <p>The satisfying moment is seeing what the dungeon produced and deciding what to change next. Making the basic offline payout depend on an advertisement turns the core promise into a toll booth.</p>
          <p>Pocket Cult calculates offline production from the working dungeon. Optional boosts may exist, but the underlying return belongs to the player’s buildings and minions.</p>
          <div class="note"><p><strong>Look for honest wording:</strong> “no ads” and “no forced ads” are different claims. Pocket Cult uses optional and limited ad surfaces; it does not claim to contain no advertising at all.</p></div>`,
      },
      {
        id: 'fair-checklist',
        label: '04 · PLAYER CHECKLIST',
        title: 'Judge the first hour by how often monetization interrupts intention.',
        body: `
          <ul><li>Can you complete the tutorial without a forced video?</li><li>Does closing an offer return you directly to play?</li><li>Are rewarded ads clearly optional and tied to a known reward?</li><li>Can the game launch and progress offline?</li><li>Is there an energy system or paywall blocking ordinary play?</li></ul>
          <p>Pocket Cult is free to start, works offline, avoids forced ads and has no energy gate. Its progression is driven by resources, minion upkeep, building choices and Ascension rather than mandatory ad viewing.</p>`,
      },
    ],
    faqs: [
      ['Does Pocket Cult contain ads?', 'Yes, but it does not force ads between ordinary gameplay actions. Rewarded ads are optional, and a Remove Ads purchase is available.'],
      ['Does Pocket Cult use an energy system?', 'No. There is no global energy meter limiting when you can play.'],
      ['Do I have to watch an ad to collect offline progress?', 'No. Base offline production comes from your dungeon. Optional rewards do not replace the core payout.'],
      ['Can I play Pocket Cult in airplane mode?', 'The core game is designed for offline play after installation.'],
    ],
    related: ['offline-idle-rpg-android.html', 'dungeon-keeper-game-android.html', 'offline-idle-dungeon-game-android.html'],
  },
];

function esc(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function relatedTitle(file) {
  const page = pages.find((candidate) => candidate.file === file);
  const existing = {
    'offline-time-tracker-android.html': 'How to track time offline on Android',
    'plant-watering-reminder-android.html': 'Build a better plant-watering routine',
    'offline-idle-dungeon-game-android.html': 'What makes an offline idle game satisfying?',
  };
  return page ? page.ogTitle : existing[file];
}

function render(page) {
  const app = apps[page.app];
  const canonical = `${siteUrl}/${page.file}`;
  const faqEntities = page.faqs.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  }));
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: page.ogTitle,
        description: page.description,
        datePublished: published,
        dateModified: published,
        mainEntityOfPage: canonical,
        keywords: page.keywords,
        audience: { '@type': 'Audience', audienceType: page.audience },
        author: { '@type': 'Organization', name: 'Nyxelium', url: `${siteUrl}/` },
        publisher: { '@type': 'Organization', name: 'Nyxelium', url: `${siteUrl}/` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqEntities,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Nyxelium', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${siteUrl}/guides.html` },
          { '@type': 'ListItem', position: 3, name: page.ogTitle, item: canonical },
        ],
      },
      {
        '@type': 'MobileApplication',
        name: app.name,
        operatingSystem: 'ANDROID',
        applicationCategory: app.category,
        installUrl: app.playUrl,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    ],
  };

  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${esc(page.description)}">
    <meta name="theme-color" content="#101318">
    <title>${esc(page.title)}</title>

    <meta property="og:type" content="article">
    <meta property="og:title" content="${esc(page.ogTitle)}">
    <meta property="og:description" content="${esc(page.description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${siteUrl}/${app.screenshot}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="canonical" href="${canonical}">

    <link rel="icon" type="image/png" href="${app.icon}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500;700&amp;display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/guides.css">

    <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
    </script>
</head>

<body class="guide-page">
    <a class="skip-link" href="#article">Skip to the guide</a>
    <header class="site-header">
        <a class="header-brand" href="index.html"><span class="mark" aria-hidden="true"></span>NYXELIUM</a>
        <a class="header-back" href="guides.html">← ALL GUIDES</a>
        <nav class="header-nav" aria-label="Primary">
            <a href="index.html#apps">Apps</a>
            <a href="guides.html">Guides</a>
        </nav>
        <a class="header-cta" href="${app.playUrl}" target="_blank" rel="noopener">Get ${app.name} <span aria-hidden="true">→</span></a>
    </header>

    <main>
        <section class="guide-hero">
            <div class="guide-hero-copy">
                <p class="guide-kicker">${page.guide}</p>
                <h1 class="guide-title">${page.headline}</h1>
                <p class="guide-deck">${page.deck}</p>
            </div>
            <aside class="guide-hero-aside" aria-label="Featured app">
                <div class="guide-product">
                    <img src="${app.icon}" alt="${app.name} app icon">
                    <div>
                        <span class="guide-label">FEATURED TOOL</span>
                        <strong>${app.name}</strong>
                        <p>${app.description}</p>
                    </div>
                </div>
                <ul class="guide-facts">
${app.facts.map((fact) => `                    <li>${fact}</li>`).join('\n')}
                </ul>
            </aside>
        </section>

        <div id="article" class="article-shell">
            <aside class="article-rail" aria-label="On this page">
                <div class="article-rail-inner">
                    <p class="guide-label">ON THIS PAGE</p>
                    <nav>
${page.sections.map((section) => `                        <a href="#${section.id}">${section.title}</a>`).join('\n')}
                        <a href="#answers">Quick answers</a>
                    </nav>
                </div>
            </aside>

            <article class="article-body">
${page.sections.map((section) => `                <section id="${section.id}" class="article-section">
                    <p class="guide-label">${section.label}</p>
                    <h2>${section.title}</h2>
${section.body}
                </section>`).join('\n\n')}

                <section id="answers" class="article-section">
                    <p class="guide-label">05 · QUICK ANSWERS</p>
                    <h2>${page.ogTitle}, briefly.</h2>
                    <div class="quick-answers">
${page.faqs.map(([question, answer]) => `                        <div class="quick-answer">
                            <strong>${question}</strong>
                            <p>${answer}</p>
                        </div>`).join('\n')}
                    </div>
                </section>

                <aside class="related-guides" aria-label="Related guides">
                    <span class="guide-label">KEEP READING</span>
                    <div class="related-guide-grid">
${page.related.map((file) => `                        <a href="${file}"><strong>${relatedTitle(file)}</strong><span aria-hidden="true">→</span></a>`).join('\n')}
                    </div>
                </aside>

                <aside class="product-callout">
                    <img src="${app.icon}" alt="">
                    <div>
                        <span class="guide-label">TRY THE WORKFLOW</span>
                        <strong>${app.name}</strong>
                        <p>${app.description}</p>
                    </div>
                    <a class="btn btn-accent btn-sm" href="${app.playUrl}" target="_blank" rel="noopener">Open Google Play →</a>
                </aside>
            </article>
        </div>
    </main>

    <footer class="guide-footer">
        <div class="footer-bottom">
            <span class="footer-copy"><span class="mark" aria-hidden="true"></span>© 2026 NYXELIUM</span>
            <div class="footer-legal">
                <a href="guides.html">ALL GUIDES</a>
                <a href="index.html">STUDIO HOME</a>
                <a href="${app.privacyUrl}">${app.name.toUpperCase()} PRIVACY</a>
            </div>
            <span>LAST REVIEWED · JULY 2026</span>
        </div>
    </footer>

    <script src="assets/js/main.js"></script>
</body>

</html>
`;
}

for (const page of pages) {
  await writeFile(resolve(root, page.file), render(page), 'utf8');
}

console.log(`Generated ${pages.length} targeted SEO guides.`);
