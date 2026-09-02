/* Workshop cluster 5 — translated editions of the two guides with the
   widest non-English demand. Full translations, not machine-shortened
   summaries: the chrome, the schema language and the FAQ text all move
   with the article. */

export const translatedGuides = [
  /* ═══════════════════ DLSS 5 · RUSSIAN ═══════════════════ */
  {
    file: 'dlss-5-neural-rendering-guide-ru.html',
    lang: 'ru',
    ogLocale: 'ru_RU',
    kicker: 'WORKSHOP—01 · GPU · 12 МИН ЧТЕНИЯ',
    title: 'Как установить мод DLSS 5 Neural Rendering · Nyxelium',
    ogTitle: 'Как установить мод DLSS 5 Neural Rendering (2026)',
    description:
      'Безопасный способ поставить утёкшую сборку DLSS 5 через RHI и ReShade: реальная цена в кадрах, правило про античит и четыре альтернативы, которые лучше попробовать раньше.',
    twitterDescription:
      'DLSS 5 без сомнительных инсталляторов из Discord, с честными цифрами производительности.',
    keywords:
      'DLSS 5, мод DLSS 5, нейрорендеринг, RHI ReShade HDR Installer, RenoDX, установка DLSS 5, ReShade аддон, RTX 50',
    articleSection: 'Видеокарты и апскейлинг',
    audience: 'Игроки на ПК с видеокартой NVIDIA RTX',
    proficiency: 'Expert',
    headline: 'DLSS 5 без сомнительного «установщика в один клик».',
    deck: 'Предрелизная библиотека DLSS 5 разошлась по сети за несколько дней до официального запуска — в основном внутри инсталляторов, которые запускать не стоит никому. Здесь прозрачный путь установки, правило про античит и та самая цена в кадрах, которую не пишут в заголовках.',
    aside: {
      label: 'ЗАМЕТКА МАСТЕРСКОЙ',
      strong: 'Экспериментальный мод',
      text: 'Предрелизная библиотека в играх, для которых её не писали. Обратимо, но только в одиночных играх.',
      facts: [
        'РЕЛИЗ · 3 СЕНТЯБРЯ 2026',
        'ПУТЬ · RHI + RENODX',
        'ЦЕНА · ДО -50% FPS',
        'ТОЛЬКО ОДИНОЧНЫЕ ИГРЫ',
      ],
    },
    sections: [
      {
        id: 'what-it-is',
        nav: 'Что меняет DLSS 5',
        label: '01 · ТЕХНОЛОГИЯ',
        title: 'DLSS 5 — это не апскейлер. Он дорисовывает кадр.',
        body: `
<p class="lede">Все прошлые версии DLSS отвечали на один вопрос: как отрисовать меньше пикселей и восстановить остальное. DLSS 5 отвечает на другой — как добавить детали, которых в игре никогда не было.</p>
<p>NVIDIA называет это <strong>3D-guided neural rendering</strong>: модель получает готовый кадр вместе с трёхмерной информацией движка и заново синтезирует материалы, кожу, волосы, ткань и реакцию на освещение. DLSS 4 восстанавливал то, что задумал рендер. DLSS 5 придумывает правдоподобные детали, которых у рендера не было.</p>
<p><strong>Из этого следует главное: это первая функция DLSS, которая забирает кадры, а не добавляет их.</strong> Super Resolution, Ray Reconstruction и Frame Generation были функциями производительности с побочным эффектом для картинки. Нейрорендеринг — функция картинки со счётом за производительность, и счёт большой.</p>
<h3>Что официально, а что нет</h3>
<p>NVIDIA запускает DLSS 5 <strong>3 сентября 2026 года</strong>, первой игрой становится NBA 2K27, поддержка заявлена для всех настольных и мобильных видеокарт GeForce RTX 50 Series и для GeForce NOW. Официальной поддержки RTX 40 и более старых карт не объявлено.</p>
<p>То, что ставят сейчас, — это не оно. Библиотеку нейрорендеринга нашли внутри раннего билда NBA 2K27, разработчик RenoDX подключил её к Control, и за считанные дни она оказалась в десятке других игр через аддоны ReShade. Оно работает — в том смысле, что выдаёт кадры. Но это предрелизная библиотека вне той интеграции, для которой её писали.</p>
<div class="note">
  <p><strong>Ожидания стройте отсюда.</strong> Сцены, которые модели «идут», выглядят заметно лучше оригинала. Сцены, которые не идут, превращают нарисованного вручную персонажа в пластиковый портрет из соцсетей. Потюнить это по играм нельзя: мода изначально не предполагалось.</p>
</div>`,
      },
      {
        id: 'risks',
        nav: 'Прочитайте сначала',
        label: '02 · ДО УСТАНОВКИ',
        title: 'Четыре факта, которые решают, стоит ли вообще это делать.',
        body: `
<p class="lede">Это не аргументы против экспериментов. Это аргументы за то, чтобы экспериментировать на правильной машине, в правильной игре и из правильного источника.</p>
<div class="step-grid">
  <div class="step">
    <span class="step-num">РИСК—01</span>
    <strong>Античит</strong>
    <p>ReShade с поддержкой аддонов перехватывает графическое устройство. Предупреждение самого RHI однозначно: только одиночные игры, перед мультиплеером удалять.</p>
  </div>
  <div class="step">
    <span class="step-num">РИСК—02</span>
    <strong>Неподписанная DLL</strong>
    <p>Вы кладёте рядом с исполняемым файлом игры неподписанную библиотеку, которая перехватывает Direct3D. Берите её только там, где публикуют контрольную сумму.</p>
  </div>
  <div class="step">
    <span class="step-num">РИСК—03</span>
    <strong>Установщик «в один клик»</strong>
    <p>Полезная нагрузка маленькая и легко переупаковывается — именно сборки «1 CLICK DLSS 5» из Discord и Telegram здесь настоящая угроза, а не сама технология.</p>
  </div>
  <div class="step">
    <span class="step-num">РИСК—04</span>
    <strong>Счёт за кадры</strong>
    <p>Первые замеры сообщества — около половины частоты кадров. Если у вас сейчас 50 FPS, будет 25. Планируйте это заранее.</p>
  </div>
</div>
<div class="note note-warn">
  <p><strong>Если в игре есть античит — закройте страницу.</strong> Соревновательные шутеры, сервисные игры и всё с EAC, BattlEye или драйвером уровня ядра не стоят риска. Нет такого улучшения картинки, которое переживёт потерю аккаунта.</p>
</div>`,
      },
      {
        id: 'install',
        nav: 'Установка через RHI',
        label: '03 · ЧИСТЫЙ ПУТЬ',
        title: 'Открытый установщик вместо перепакованного бинарника.',
        body: `
<p class="lede">RHI — ReShade HDR Installer от RankFTW — это открытый менеджер ровно для такого класса графических модов, и это единственное звено цепочки, которое можно проверить самому.</p>
<p>Он находит игры в восьми магазинах (Steam, GOG, Epic, EA App, Ubisoft Connect, Xbox и Game Pass, Battle.net, Rockstar) и управляет примерно десятью компонентами: сам ReShade, RenoDX, OptiScaler, DXVK, Display Commander, ReLimiter, RE Framework, Luma Framework, а также независимой подменой DLL DLSS и Streamline. Нужны Windows 10 или 11 (x64) и .NET 8 Desktop Runtime.</p>
<div class="step-grid">
  <div class="step">
    <span class="step-num">ШАГ—01</span>
    <strong>Скачайте из первоисточника</strong>
    <p>Только со <a href="https://github.com/RankFTW/RHI" target="_blank" rel="noopener">страницы релизов RankFTW/RHI</a> на GitHub. Не зеркало, не перезалив, не ссылка из чата.</p>
  </div>
  <div class="step">
    <span class="step-num">ШАГ—02</span>
    <strong>Выберите ручной режим</strong>
    <p>При первом запуске берите вариант с установкой в выбранные игры. Не разворачивайте на всю библиотеку — так мод и попадает в онлайновую игру, о которой вы забыли.</p>
  </div>
  <div class="step">
    <span class="step-num">ШАГ—03</span>
    <strong>Установите ReShade</strong>
    <p>Выберите одиночную игру слева и нажмите Install ReShade. Нужна сборка с поддержкой аддонов: обычная не загрузит RenoDX вообще.</p>
  </div>
  <div class="step">
    <span class="step-num">ШАГ—04</span>
    <strong>Добавьте RenoDX DLSS 5</strong>
    <p>Откройте <em>Add-ons</em>, нажмите <em>Select</em> и выберите <em>RenoDX DLSS 5</em>. Именно этот аддон выводит нейрорендеринг в оверлей.</p>
  </div>
  <div class="step">
    <span class="step-num">ШАГ—05</span>
    <strong>Разверните DLL</strong>
    <p>Откройте <em>Neural Rendering</em> и нажмите <em>Deploy DLL</em>. RHI положит рядом с игрой библиотеку нейрорендеринга и файлы Streamline для вашего поколения видеокарты.</p>
  </div>
  <div class="step">
    <span class="step-num">ШАГ—06</span>
    <strong>Откройте оверлей</strong>
    <p>Запустите игру и нажмите <strong>Home</strong> (на немецкой раскладке — <strong>Pos1</strong>). Нейрорендеринг появится во вкладке Add-ons.</p>
  </div>
</div>
<h3>Проверяйте всё, что скачали вручную</h3>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · ПРОВЕРКА БИБЛИОТЕКИ</div>
  <pre><code># Посчитать хеш скачанного файла
Get-FileHash .\\nvngx_dlssnr.dll -Algorithm SHA256

# Сравните с опубликованным значением до того, как копировать куда-либо.
# Отличается хотя бы одним символом — удаляйте.</code></pre>
</div>
<div class="note">
  <p><strong>Держите путь удаления коротким.</strong> RHI помнит, что именно записал в каждую игру, поэтому удаление — это одна кнопка, а не поиск библиотек вручную. Недоудалённый ReShade — обычная причина того, что игра начинает падать через три патча.</p>
</div>`,
      },
      {
        id: 'tuning',
        nav: 'Настройка в игре',
        label: '04 · В ОВЕРЛЕЕ',
        title: 'Что менять, когда оверлей открылся.',
        body: `
<p class="lede">Значение по умолчанию — не то, что вам нужно. Нейрорендеринг ломается громко, а не незаметно, и именно ползунок интенсивности отделяет «лучшие материалы» от «все стали манекенами».</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Пресет</th><th>Что обычно делает</th><th>Когда брать</th></tr>
    </thead>
    <tbody>
      <tr><td>Default</td><td>Базовая реконструкция деталей по материалам, коже и волосам.</td><td>Первый взгляд: понять, отзывается ли игра вообще.</td></tr>
      <tr><td>Natural</td><td>Сдержанная реконструкция, ближе к художественному стилю игры.</td><td>Почти всегда. Для стилизованных игр — только он.</td></tr>
      <tr><td>Cinematic</td><td>Более агрессивный пересвет и отклик материалов; самый заметный и самый искусственный.</td><td>Скриншоты и фоторежим, редко для игры.</td></tr>
      <tr><td>Интенсивность</td><td>Насколько далеко модели разрешено уходить от исходного кадра.</td><td>Снижайте, пока лица не перестанут выглядеть отретушированными.</td></tr>
    </tbody>
  </table>
</div>
<h3>Судите по лицам и волосам, а не по листве</h3>
<p>Листва и камни украшают любую модель синтеза деталей. Провал виден на персонажах: поры, которых не было в текстуре, волосы, придуманные по силуэту, и кожа, которая выглядит обработанной. Загрузите катсцену, переключите аддон и смотрите на одно лицо. Если лицо перестало принадлежать игре — настройка слишком сильная, как бы хорошо ни выглядело окружение.</p>
<h3>Как убрать начисто</h3>
<ul>
  <li>Удаляйте через RHI для конкретной игры, а не файлами вручную.</li>
  <li>Проверьте папку игры на остатки: <code>dxgi.dll</code>, <code>d3d12.dll</code>, <code>ReShade.ini</code>, каталог <code>reshade-shaders</code>.</li>
  <li>Запустите проверку файлов в магазине, если у игры есть контроль целостности со стороны лаунчера.</li>
  <li>Удаляйте перед любой сессией в мультиплеере, даже если играли в одиночный режим той же игры.</li>
</ul>`,
      },
      {
        id: 'performance',
        nav: 'Цена в кадрах',
        label: '05 · СЧЁТ',
        title: 'Готовьтесь отдать примерно половину частоты кадров.',
        body: `
<p class="lede">Это ранние замеры сообщества на внедрённой предрелизной сборке. Они достаточно согласованы между видеокартами, чтобы на них планировать.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Видеокарта</th><th>Сценарий</th><th>До</th><th>После</th></tr>
    </thead>
    <tbody>
      <tr><td>RTX 5070 Ti</td><td>Control, 4K</td><td>71 FPS</td><td>35 FPS</td></tr>
      <tr><td>RTX 5090</td><td>Демонстрация в 4K</td><td>91 FPS</td><td>50 FPS</td></tr>
      <tr><td>RTX 5070</td><td>Cyberpunk 2077, 1440p, растр</td><td>138 FPS</td><td>68 FPS</td></tr>
      <tr><td>RTX 5070</td><td>Cyberpunk 2077, 1440p, RT Ultra</td><td>111 FPS</td><td>55 FPS</td></tr>
      <tr><td>RTX 5070</td><td>Cyberpunk 2077, 1440p, path tracing</td><td>71 FPS</td><td>45 FPS</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Обратите внимание на последнюю строку.</strong> В процентах путь-трейсинг теряет меньше всех, потому что кадр и так был дорогим. Чем дешевле ваш кадр, тем крупнее в нём нейропроход — это противоположно тому, как вели себя все прошлые функции DLSS.</p>
<div class="note">
  <p><strong>Это не прогноз для финальной версии.</strong> Цифры сняты с неоптимизированного внедрения без контроля над внутренним разрешением. NVIDIA заявляет, что внутренняя сборка стала примерно в пять раз быстрее за полгода разработки. Считайте таблицу ценой мода, а не ценой DLSS 5.</p>
</div>
<h3>Как всё-таки сделать это играбельным</h3>
<ul>
  <li><strong>Сначала снижайте внутреннее разрешение.</strong> Комбинируйте нейрорендеринг с DLSS Super Resolution в режиме Balanced или Performance.</li>
  <li><strong>Ограничьте частоту кадров.</strong> Стабильные 40 читаются лучше, чем скачки между 35 и 55: чувствуется разброс времени кадра, а не среднее.</li>
  <li><strong>Выключите то, что дублирует нейропроход:</strong> тяжёлый пост-шарпенинг, зерно, хроматические аберрации.</li>
  <li><strong>Frame Generation оставьте на потом.</strong> Генерация кадров поверх вдвое просевшей базы поднимает задержку сильнее, чем плавность.</li>
</ul>`,
      },
      {
        id: 'alternatives',
        nav: 'Альтернативы',
        label: '06 · АЛЬТЕРНАТИВЫ',
        title: 'Четыре варианта, которые почти наверняка лучше.',
        body: `
<h3>1. Дождаться официального релиза</h3>
<p>DLSS 5 выходит 3 сентября 2026 года для карт RTX 50, начиная с NBA 2K27. Официально — значит подписанные библиотеки, никакого контакта с античитом и интеграция, которая может выбирать внутреннее разрешение так, как мод не умеет. Если у вас карта 50-й серии, ожидание стоит нескольких дней.</p>
<h3>2. Подменить модель DLSS в старых играх</h3>
<p>Самое ценное изменение, которое большинство никогда не делало. Трансформерная модель Super Resolution работает <strong>на всех картах RTX начиная с 20-й серии</strong>, а сотни вышедших игр до сих пор вызывают пресет, скомпилированный годы назад. Override в приложении NVIDIA или подмена DLL через DLSS Swapper это исправляет. Обновление игры 2021 года со старого свёрточного пресета на текущую трансформерную модель обычно убирает больше мерцания и шлейфов, чем нейрорендеринг добавляет деталей, — и это бесплатно, подписано и обратимо.</p>
<h3>3. OptiScaler, если у вас не NVIDIA</h3>
<p>Когда игра предлагает единственный апскейлер и он не тот, OptiScaler транслирует между входами DLSS, FSR и XeSS, чтобы работала та реконструкция, которую ускоряет ваше железо. RHI управляет им тоже.</p>
<h3>4. Просто ReShade или RenoDX без нейроаддона</h3>
<p>Тонмаппинг, полноценный HDR для игры, вышедшей без него, и умеренная резкость — предсказуемо, обратимо и почти бесплатно. Для большинства старых игр именно это делает картинку современной, а не синтез деталей.</p>
<div class="note note-good">
  <p><strong>Если делать только одно:</strong> проверьте, какой пресет DLSS использует ваша любимая игра, и переключите его на текущую модель. Пять минут, работает на шестилетней видеокарте и не требует неподписанных DLL.</p>
</div>`,
      },
      {
        id: 'sources',
        nav: 'Источники',
        label: '07 · ИСТОЧНИКИ',
        title: 'Откуда взяты эти данные.',
        body: `
<p>Страница описывает быстро меняющийся мод сообщества и ещё не вышедший продукт. К моменту чтения изменится и то, и другое — проверяйте перед установкой и доверяйте первоисточнику больше, чем любому руководству, включая это.</p>
<ul>
  <li><a href="https://github.com/RankFTW/RHI" target="_blank" rel="noopener">RankFTW/RHI на GitHub</a> — сам установщик, список компонентов, требования и предупреждение про одиночные игры.</li>
  <li><a href="https://www.tomshardware.com/pc-components/gpus/nvidias-controversial-dlss-5-will-launch-september-3-with-nba2k27-available-on-all-rtx-50-series-gpus" target="_blank" rel="noopener">Tom’s Hardware</a> — дата запуска 3 сентября 2026 года, NBA 2K27 и поддержка RTX 50 Series.</li>
  <li><a href="https://www.tomshardware.com/pc-components/gpus/modders-get-leaked-dlss-5-running-in-control-early-blackwell-test-drops-rtx-5070-ti-from-71-to-35-fps-at-4k" target="_blank" rel="noopener">Tom’s Hardware</a> — тест в Control, где RTX 5070 Ti упала с 71 до 35 FPS в 4K.</li>
  <li><a href="https://videocardz.com/newz/nvidia-dlss-5-gets-5x-faster-in-six-months-launches-september-3-on-all-rtx-50-gpus" target="_blank" rel="noopener">VideoCardz</a> — заявление NVIDIA об ускорении внутренней сборки примерно в пять раз.</li>
</ul>
<p>Сайт не связан с NVIDIA, RankFTW или RenoDX. Партнёрских ссылок здесь нет, материал не спонсирован.</p>`,
      },
    ],
    faqNav: 'Коротко',
    faqLabel: '08 · КОРОТКИЕ ОТВЕТЫ',
    faqHeading: 'DLSS 5 — коротко.',
    faqs: [
      [
        'Безопасно ли ставить мод DLSS 5?',
        'Сама техника обратима, но риск сосредоточен в источнике загрузки. Используйте открытый установщик RHI со страницы релизов на GitHub, а не исполняемый файл из Discord или Telegram, проверяйте контрольную сумму любой скачанной библиотеки вручную и ставьте только в одиночные игры. ReShade с поддержкой аддонов перехватывает графическое устройство и может сработать на античите.',
      ],
      [
        'Работает ли DLSS 5 на RTX 40?',
        'Официально нет. NVIDIA объявила DLSS 5 для всех настольных и мобильных карт GeForce RTX 50 Series и для GeForce NOW, без поддержки RTX 40 и более старых поколений. Моды сообщества запускали на другом железе с разными результатами, но это не поддерживается, а цена в кадрах на старых картах выше, а не ниже.',
      ],
      [
        'Могут ли забанить за мод DLSS 5?',
        'В онлайновой игре с античитом — да, это реальный исход. Сам RHI предупреждает, что ReShade с поддержкой аддонов может сработать на античите, и рекомендует удалять его перед мультиплеером. Считайте это модом исключительно для одиночных игр.',
      ],
      [
        'Повышает ли DLSS 5 производительность, как DLSS 4?',
        'Нет, и это ключевое отличие. Super Resolution и Frame Generation были функциями производительности. Нейрорендеринг — визуальная функция, которая стоит кадров: ранние тесты показывают примерно половину частоты кадров, например падение с 71 до 35 FPS на RTX 5070 Ti в 4K в Control. Финальная версия ожидается заметно быстрее внедрённой сборки.',
      ],
      [
        'У меня уже DLSS 4. Стоит ли добавлять нейрорендеринг?',
        'Большинству пока нет. Принудительная подмена текущей трансформерной модели Super Resolution в играх со старым пресетом бесплатна, работает на всех картах RTX начиная с 20-й серии и обычно даёт больший видимый выигрыш при несопоставимо меньшей цене. Возвращайтесь к нейрорендерингу, когда игры получат официальную интеграцию.',
      ],
    ],
    related: [
      ['run-local-llm-offline-guide-ru.html', 'Как запустить LLM локально и офлайн'],
      ['dlss-vs-fsr-vs-xess-upscaling.html', 'DLSS vs FSR vs XeSS (EN)'],
      ['reduce-input-lag-pc-gaming.html', 'Как уменьшить задержку ввода (EN)'],
    ],
    callout: {
      label: 'ОТ СТУДИИ',
      strong: 'Nyxelium — офлайн-приложения для Android',
      text: 'Другой экран, тот же принцип: софт должен быть локальным, обратимым и легко удаляемым.',
      cta: 'Посмотреть приложения',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════ DLSS 5 · GERMAN ═══════════════════ */
  {
    file: 'dlss-5-neural-rendering-guide-de.html',
    lang: 'de',
    ogLocale: 'de_DE',
    kicker: 'WORKSHOP—01 · GPU · 12 MIN LESEZEIT',
    title: 'DLSS 5 Neural Rendering installieren: Anleitung · Nyxelium',
    ogTitle: 'DLSS 5 Neural Rendering installieren: die saubere Anleitung',
    description:
      'Der sichere Weg zur geleakten DLSS-5-Version mit RHI und ReShade: die echten Bildratenkosten, die Anti-Cheat-Regel und vier Alternativen, die meist die bessere Wahl sind.',
    twitterDescription:
      'DLSS 5 ohne dubiose Ein-Klick-Installer, mit ehrlichen Zahlen zur Performance.',
    keywords:
      'DLSS 5, DLSS 5 Mod, Neural Rendering, RHI ReShade HDR Installer, RenoDX, DLSS 5 installieren, ReShade Add-on, RTX 50',
    articleSection: 'Grafikkarten und Upscaling',
    audience: 'PC-Spieler mit NVIDIA-RTX-Grafikkarte',
    proficiency: 'Expert',
    headline: 'DLSS 5, ohne fremde Ein-Klick-Installer auszuführen.',
    deck: 'Eine Vorabversion der DLSS-5-Laufzeit kursiert seit Tagen, meist verpackt in Installer, die niemand ausführen sollte. Hier steht der nachvollziehbare Weg, die Anti-Cheat-Regel, die vorab entscheidet, ob sich das überhaupt lohnt, und die Bildratenkosten, die in keiner Überschrift auftauchen.',
    aside: {
      label: 'WORKSHOP-NOTIZ',
      strong: 'Experimenteller Mod',
      text: 'Eine Vorabbibliothek in Spielen, für die sie nie gedacht war. Umkehrbar, aber nur für Einzelspieler.',
      facts: [
        'RELEASE · 3. SEPTEMBER 2026',
        'WEG · RHI + RENODX',
        'KOSTEN · BIS -50% FPS',
        'NUR EINZELSPIELER',
      ],
    },
    sections: [
      {
        id: 'what-it-is',
        nav: 'Was DLSS 5 ändert',
        label: '01 · DIE TECHNIK',
        title: 'DLSS 5 ist kein weiterer Upscaler. Es übermalt das Bild.',
        body: `
<p class="lede">Jede bisherige DLSS-Version beantwortete eine Frage: Wie rendern wir weniger Pixel und rekonstruieren den Rest? DLSS 5 beantwortet eine andere — wie fügen wir Details hinzu, die das Spiel nie hatte?</p>
<p>NVIDIA nennt es <strong>3D-guided Neural Rendering</strong>. Ein Modell erhält das gerenderte Bild zusammen mit den dreidimensionalen Informationen der Engine und synthetisiert Materialien, Haut, Haare, Stoffe und Lichtverhalten neu. DLSS 4 rekonstruierte, was der Renderer beabsichtigte. DLSS 5 erfindet plausible Details, die der Renderer nie hatte.</p>
<p><strong>Daraus folgt das Entscheidende: Es ist die erste DLSS-Funktion, die Bilder kostet, statt welche zu liefern.</strong> Super Resolution, Ray Reconstruction und Frame Generation waren Performance-Funktionen mit Nebenwirkung auf die Bildqualität. Neural Rendering ist eine Bildqualitätsfunktion mit einer Rechnung für die Performance — und die Rechnung ist hoch.</p>
<h3>Was offiziell ist und was nicht</h3>
<p>NVIDIA bringt DLSS 5 am <strong>3. September 2026</strong>, zuerst in NBA 2K27, für alle Desktop- und Notebook-GPUs der GeForce RTX 50 Series sowie für GeForce NOW. Für RTX 40 und älter wurde keine offizielle Unterstützung angekündigt.</p>
<p>Was diese Woche installiert wird, ist etwas anderes. Die Laufzeitbibliothek fand sich in einem Early-Access-Build von NBA 2K27, ein RenoDX-Entwickler brachte sie in Control zum Laufen, und binnen Tagen wurde sie über ReShade-Add-ons in ein Dutzend weitere Spiele injiziert. Es funktioniert in dem Sinne, dass Bilder entstehen. Es bleibt eine Vorabbibliothek außerhalb der Integration, für die sie geschrieben wurde.</p>
<div class="note">
  <p><strong>Stellen Sie Ihre Erwartungen darauf ein.</strong> Szenen, die dem Modell liegen, sehen deutlich besser aus als das Original. Szenen, die es nicht tun, machen aus einer handgestalteten Figur ein Plastikporträt. Eine spielspezifische Abstimmung gibt es nicht, weil ein Mod nie vorgesehen war.</p>
</div>`,
      },
      {
        id: 'risks',
        nav: 'Zuerst lesen',
        label: '02 · VOR DER INSTALLATION',
        title: 'Vier Fakten, die vorab entscheiden.',
        body: `
<p class="lede">Das sind keine Gründe, nicht zu experimentieren. Es sind Gründe, auf dem richtigen Rechner, im richtigen Spiel und aus der richtigen Quelle zu experimentieren.</p>
<div class="step-grid">
  <div class="step">
    <span class="step-num">RISIKO—01</span>
    <strong>Anti-Cheat</strong>
    <p>ReShade mit Add-on-Unterstützung hängt sich in das Grafikgerät ein. RHI warnt selbst unmissverständlich: nur Einzelspieler, vor dem Mehrspieler deinstallieren.</p>
  </div>
  <div class="step">
    <span class="step-num">RISIKO—02</span>
    <strong>Eine unsignierte DLL</strong>
    <p>Sie legen eine unsignierte Bibliothek neben die Spieldatei, die Direct3D abfängt. Nur aus einer Quelle beziehen, die eine Prüfsumme veröffentlicht.</p>
  </div>
  <div class="step">
    <span class="step-num">RISIKO—03</span>
    <strong>Der Ein-Klick-Installer</strong>
    <p>Die Nutzlast ist klein und leicht neu zu verpacken. Genau die „1 CLICK DLSS 5“-Builds aus Discord und Telegram sind hier die eigentliche Gefahr.</p>
  </div>
  <div class="step">
    <span class="step-num">RISIKO—04</span>
    <strong>Die Bildratenrechnung</strong>
    <p>Erste Messungen liegen bei etwa der Hälfte der Bildrate. Wer bei 50 fps startet, landet bei 25. Planen Sie das vorher ein.</p>
  </div>
</div>
<div class="note note-warn">
  <p><strong>Hat das Spiel ein Anti-Cheat, hören Sie hier auf.</strong> Kompetitive Shooter, Live-Service-Titel und alles mit EAC, BattlEye oder einem Kernel-Treiber sind das Risiko nicht wert. Keine Bildverbesserung überlebt einen gesperrten Account.</p>
</div>`,
      },
      {
        id: 'install',
        nav: 'Installation mit RHI',
        label: '03 · DER SAUBERE WEG',
        title: 'Den offenen Installer nutzen, nicht ein neu gepacktes Binärpaket.',
        body: `
<p class="lede">RHI — der ReShade HDR Installer von RankFTW — ist ein quelloffener Manager für genau diese Art Grafik-Mods und damit das einzige Glied der Kette, das Sie selbst prüfen können.</p>
<p>Er erkennt Spiele aus acht Stores (Steam, GOG, Epic, EA App, Ubisoft Connect, Xbox und Game Pass, Battle.net, Rockstar) und verwaltet rund zehn Komponenten: ReShade selbst, RenoDX, OptiScaler, DXVK, Display Commander, ReLimiter, RE Framework, Luma Framework sowie den unabhängigen Tausch von DLSS- und Streamline-DLLs. Voraussetzung sind Windows 10 oder 11 (x64) und die .NET 8 Desktop Runtime.</p>
<div class="step-grid">
  <div class="step">
    <span class="step-num">SCHRITT—01</span>
    <strong>Von der Quelle laden</strong>
    <p>Nur von der <a href="https://github.com/RankFTW/RHI" target="_blank" rel="noopener">Releases-Seite von RankFTW/RHI</a> auf GitHub. Kein Spiegel, kein Re-Upload, kein weitergeleiteter Link.</p>
  </div>
  <div class="step">
    <span class="step-num">SCHRITT—02</span>
    <strong>Manuell, pro Spiel</strong>
    <p>Beim ersten Start die Variante wählen, die ReShade nur für ausgewählte Spiele installiert. Keine Sammelinstallation über die ganze Bibliothek.</p>
  </div>
  <div class="step">
    <span class="step-num">SCHRITT—03</span>
    <strong>ReShade installieren</strong>
    <p>Einzelspielertitel links wählen, dann ReShade installieren. Die Add-on-Version ist Pflicht; die einfache Version lädt RenoDX gar nicht.</p>
  </div>
  <div class="step">
    <span class="step-num">SCHRITT—04</span>
    <strong>RenoDX DLSS 5 hinzufügen</strong>
    <p><em>Add-ons</em> öffnen, <em>Select</em> wählen, <em>RenoDX DLSS 5</em> auswählen. Dieses Add-on blendet Neural Rendering im Overlay ein.</p>
  </div>
  <div class="step">
    <span class="step-num">SCHRITT—05</span>
    <strong>DLL bereitstellen</strong>
    <p><em>Neural Rendering</em> öffnen und <em>Deploy DLL</em> wählen. RHI legt die Laufzeit und die Streamline-Bibliotheken für Ihre GPU-Generation neben die Spieldatei.</p>
  </div>
  <div class="step">
    <span class="step-num">SCHRITT—06</span>
    <strong>Overlay öffnen</strong>
    <p>Spiel starten und <strong>Pos1</strong> drücken (auf englischen Layouts <strong>Home</strong>). Neural Rendering erscheint unter Add-ons.</p>
  </div>
</div>
<h3>Manuell geladene Dateien selbst prüfen</h3>
<div class="cmd">
  <div class="cmd-head">POWERSHELL · BIBLIOTHEK PRÜFEN</div>
  <pre><code># Hash der geladenen Datei berechnen
Get-FileHash .\\nvngx_dlssnr.dll -Algorithm SHA256

# Mit dem veröffentlichten Wert vergleichen, bevor Sie irgendetwas kopieren.
# Weicht ein Zeichen ab, löschen Sie die Datei.</code></pre>
</div>
<div class="note">
  <p><strong>Halten Sie den Deinstallationsweg kurz.</strong> RHI merkt sich pro Spiel, was geschrieben wurde. Ein halb entferntes ReShade ist der übliche Grund dafür, dass ein Spiel drei Patches später abstürzt.</p>
</div>`,
      },
      {
        id: 'tuning',
        nav: 'Im Spiel einstellen',
        label: '04 · IM OVERLAY',
        title: 'Was Sie ändern, sobald das Overlay offen ist.',
        body: `
<p class="lede">Die Standardeinstellung ist nicht die, die Sie wollen. Neural Rendering scheitert laut statt subtil, und der Intensitätsregler trennt „bessere Materialien“ von „alle sehen aus wie Schaufensterpuppen“.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Preset</th><th>Wirkung</th><th>Wann</th></tr>
    </thead>
    <tbody>
      <tr><td>Default</td><td>Breite Detailrekonstruktion über Materialien, Haut und Haare.</td><td>Erster Blick, um zu sehen, ob ein Spiel überhaupt reagiert.</td></tr>
      <tr><td>Natural</td><td>Zurückhaltend, näher an der Bildsprache des Spiels.</td><td>Fast immer. Bei stilisierten Spielen ausschließlich.</td></tr>
      <tr><td>Cinematic</td><td>Stärkere Neubeleuchtung und Materialantwort; am sichtbarsten und am künstlichsten.</td><td>Screenshots und Fotomodus, selten zum Spielen.</td></tr>
      <tr><td>Intensität</td><td>Wie weit sich das Modell vom Ausgangsbild entfernen darf.</td><td>Senken, bis Gesichter nicht mehr retuschiert wirken.</td></tr>
    </tbody>
  </table>
</div>
<h3>Beurteilen Sie Gesichter und Haare, nicht Laub</h3>
<p>Laub und Gestein schmeicheln jedem Detailmodell. Der Fehler zeigt sich an Figuren: Poren, die in keiner Textur standen, Haarsträhnen, die an der Silhouette erfunden wurden, und Haut, die retuschiert aussieht. Laden Sie eine Zwischensequenz, schalten Sie das Add-on um und beobachten Sie ein einziges Gesicht.</p>
<h3>Sauber entfernen</h3>
<ul>
  <li>Über RHI deinstallieren, spielbezogen, nicht per Hand.</li>
  <li>Ordner danach auf Reste prüfen: <code>dxgi.dll</code>, <code>d3d12.dll</code>, <code>ReShade.ini</code>, <code>reshade-shaders</code>.</li>
  <li>Dateiprüfung des Stores ausführen, wenn der Launcher Integrität prüft.</li>
  <li>Vor jeder Mehrspielersitzung entfernen, auch wenn Sie den Einzelspielermodus desselben Spiels genutzt haben.</li>
</ul>`,
      },
      {
        id: 'performance',
        nav: 'Die Bildratenkosten',
        label: '05 · DIE RECHNUNG',
        title: 'Rechnen Sie mit etwa der halben Bildrate.',
        body: `
<p class="lede">Frühe Community-Messungen einer injizierten Vorabversion. Sie sind über Grafikkarten hinweg konsistent genug, um damit zu planen.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>GPU</th><th>Szenario</th><th>Vorher</th><th>Nachher</th></tr>
    </thead>
    <tbody>
      <tr><td>RTX 5070 Ti</td><td>Control, 4K</td><td>71 fps</td><td>35 fps</td></tr>
      <tr><td>RTX 5090</td><td>4K-Demonstration</td><td>91 fps</td><td>50 fps</td></tr>
      <tr><td>RTX 5070</td><td>Cyberpunk 2077, 1440p, Raster</td><td>138 fps</td><td>68 fps</td></tr>
      <tr><td>RTX 5070</td><td>Cyberpunk 2077, 1440p, RT Ultra</td><td>111 fps</td><td>55 fps</td></tr>
      <tr><td>RTX 5070</td><td>Cyberpunk 2077, 1440p, Path Tracing</td><td>71 fps</td><td>45 fps</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Die letzte Zeile ist die interessante.</strong> Prozentual verliert der Path-Tracing-Fall am wenigsten, weil das Bild ohnehin teuer war. Je günstiger Ihr Bild, desto größer fällt der neuronale Durchlauf ins Gewicht — genau umgekehrt zu allen bisherigen DLSS-Funktionen.</p>
<div class="note">
  <p><strong>Das ist keine Prognose für die finale Fassung.</strong> Die Zahlen stammen aus einer unoptimierten Injektion ohne Kontrolle über die interne Auflösung. NVIDIA gibt an, der interne Build sei in sechs Monaten rund fünfmal schneller geworden.</p>
</div>
<h3>Trotzdem spielbar machen</h3>
<ul>
  <li><strong>Zuerst die interne Auflösung senken.</strong> Neural Rendering mit DLSS Super Resolution auf Balanced oder Performance kombinieren.</li>
  <li><strong>Bildrate begrenzen.</strong> Stabile 40 fps lesen sich besser als ein Schwanken zwischen 35 und 55.</li>
  <li><strong>Abschalten, was der neuronale Durchlauf doppelt macht:</strong> starkes Nachschärfen, Filmkorn, chromatische Aberration.</li>
  <li><strong>Frame Generation zunächst weglassen.</strong> Erzeugte Bilder auf halbierter Basis erhöhen die Latenz stärker als die Flüssigkeit.</li>
</ul>`,
      },
      {
        id: 'alternatives',
        nav: 'Bessere Alternativen',
        label: '06 · ALTERNATIVEN',
        title: 'Vier Optionen, die den Abend besser nutzen.',
        body: `
<h3>1. Auf die offizielle Version warten</h3>
<p>DLSS 5 erscheint am 3. September 2026 für RTX-50-Karten, beginnend mit NBA 2K27. Offiziell bedeutet signierte Bibliotheken, kein Anti-Cheat-Risiko und eine Integration, die interne Auflösungen wählen kann, wie es ein Mod nicht vermag.</p>
<h3>2. Das neueste DLSS-Modell in ältere Spiele zwingen</h3>
<p>Die wertvollste Änderung, die die meisten nie vorgenommen haben. Das Transformer-Modell für Super Resolution läuft auf <strong>jeder RTX-Karte ab der 20er-Serie</strong>, während hunderte veröffentlichte Spiele weiterhin ein Jahre altes Preset aufrufen. Das Überschreiben in der NVIDIA-App oder ein DLL-Tausch pro Spiel mit DLSS Swapper ändert das — kostenlos, signiert und umkehrbar.</p>
<h3>3. OptiScaler, wenn Sie keine NVIDIA-Karte haben</h3>
<p>Bietet ein Spiel nur einen Upscaler an und ist es der falsche, übersetzt OptiScaler zwischen DLSS-, FSR- und XeSS-Eingaben. RHI verwaltet auch das.</p>
<h3>4. ReShade allein oder RenoDX ohne das neuronale Add-on</h3>
<p>Tone Mapping, echtes HDR für Spiele ohne HDR und maßvolles Schärfen sind deterministisch, umkehrbar und nahezu kostenlos. Für die meisten älteren Spiele macht genau das den größten Unterschied.</p>
<div class="note note-good">
  <p><strong>Wenn Sie nur eine Sache tun:</strong> Prüfen Sie, welches DLSS-Preset Ihr Lieblingsspiel verwendet, und stellen Sie es auf das aktuelle Modell um. Fünf Minuten, läuft auf sechs Jahre alten Karten, keine unsignierte DLL nötig.</p>
</div>`,
      },
      {
        id: 'sources',
        nav: 'Quellen',
        label: '07 · QUELLEN',
        title: 'Woher diese Angaben stammen.',
        body: `
<p>Diese Seite beschreibt einen schnelllebigen Community-Mod und ein noch unveröffentlichtes Produkt. Beides ändert sich — prüfen Sie vor der Installation und vertrauen Sie der Primärquelle mehr als jeder Anleitung, auch dieser.</p>
<ul>
  <li><a href="https://github.com/RankFTW/RHI" target="_blank" rel="noopener">RankFTW/RHI auf GitHub</a> — Installer, Komponentenliste, Voraussetzungen und der Einzelspieler-Hinweis.</li>
  <li><a href="https://www.tomshardware.com/pc-components/gpus/nvidias-controversial-dlss-5-will-launch-september-3-with-nba2k27-available-on-all-rtx-50-series-gpus" target="_blank" rel="noopener">Tom’s Hardware</a> — Starttermin 3. September 2026, NBA 2K27 und RTX 50 Series.</li>
  <li><a href="https://www.tomshardware.com/pc-components/gpus/modders-get-leaked-dlss-5-running-in-control-early-blackwell-test-drops-rtx-5070-ti-from-71-to-35-fps-at-4k" target="_blank" rel="noopener">Tom’s Hardware</a> — der Control-Test mit 71 auf 35 fps auf einer RTX 5070 Ti in 4K.</li>
  <li><a href="https://videocardz.com/newz/nvidia-dlss-5-gets-5x-faster-in-six-months-launches-september-3-on-all-rtx-50-gpus" target="_blank" rel="noopener">VideoCardz</a> — NVIDIAs Angabe zur fünffachen Beschleunigung des internen Builds.</li>
</ul>
<p>Diese Seite steht in keiner Verbindung zu NVIDIA, RankFTW oder RenoDX. Es gibt hier keine Affiliate-Links und keine gesponserten Inhalte.</p>`,
      },
    ],
    faqNav: 'Kurz gefasst',
    faqLabel: '08 · KURZE ANTWORTEN',
    faqHeading: 'DLSS 5 Neural Rendering, kurz gefasst.',
    faqs: [
      [
        'Ist der DLSS-5-Mod sicher?',
        'Das Verfahren ist umkehrbar, das Risiko liegt im Download. Nutzen Sie den quelloffenen RHI-Installer von seiner GitHub-Releases-Seite statt einer Ein-Klick-Datei aus Discord oder Telegram, prüfen Sie jede DLL selbst gegen eine veröffentlichte SHA-256-Prüfsumme und installieren Sie ausschließlich in Einzelspielertitel. ReShade mit Add-on-Unterstützung hängt sich in das Grafikgerät ein und kann Anti-Cheat auslösen.',
      ],
      [
        'Funktioniert DLSS 5 auf der RTX-40-Serie?',
        'Offiziell nein. NVIDIA hat DLSS 5 für alle Desktop- und Notebook-GPUs der GeForce RTX 50 Series sowie GeForce NOW angekündigt, ohne Unterstützung für RTX 40 oder ältere Karten. Community-Mods wurden auf anderer Hardware mit gemischten Ergebnissen betrieben, das ist jedoch nicht unterstützt und kostet auf älteren Karten mehr Leistung, nicht weniger.',
      ],
      [
        'Kann ich für den DLSS-5-Mod gesperrt werden?',
        'In einem Online-Spiel mit Anti-Cheat ist das ein realistisches Ergebnis. RHI warnt selbst, dass ReShade mit Add-on-Unterstützung Anti-Cheat auslösen kann, und empfiehlt die Deinstallation vor dem Mehrspielermodus. Behandeln Sie das als reine Einzelspieler-Modifikation.',
      ],
      [
        'Verbessert DLSS 5 die Leistung wie DLSS 4?',
        'Nein, und das ist der entscheidende Unterschied. Super Resolution und Frame Generation waren Performance-Funktionen. Neural Rendering ist eine Bildfunktion, die Bilder kostet: Frühe Tests zeigen etwa die halbe Bildrate, etwa 71 auf 35 fps auf einer RTX 5070 Ti in 4K in Control. Die finale Fassung dürfte deutlich schneller sein.',
      ],
      [
        'Ich nutze bereits DLSS 4. Lohnt sich Neural Rendering?',
        'Für die meisten noch nicht. Das aktuelle Transformer-Modell in Spiele zu zwingen, die ein älteres Preset ausliefern, ist kostenlos, läuft auf jeder RTX-Karte ab der 20er-Serie und bringt meist mehr sichtbare Verbesserung bei einem Bruchteil der Kosten. Warten Sie mit Neural Rendering auf die offizielle Integration.',
      ],
    ],
    related: [
      ['dlss-vs-fsr-vs-xess-upscaling.html', 'DLSS vs FSR vs XeSS (EN)'],
      ['reduce-input-lag-pc-gaming.html', 'Eingabeverzögerung reduzieren (EN)'],
      ['clean-gpu-driver-install-windows.html', 'GPU-Treiber sauber installieren (EN)'],
    ],
    callout: {
      label: 'AUS DEM STUDIO',
      strong: 'Nyxelium — Offline-Apps für Android',
      text: 'Anderer Bildschirm, dieselbe Regel wie in diesem Guide: Software soll lokal, umkehrbar und leicht entfernbar sein.',
      cta: 'Apps ansehen',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════ LOCAL LLM · RUSSIAN ═══════════════════ */
  {
    file: 'run-local-llm-offline-guide-ru.html',
    lang: 'ru',
    ogLocale: 'ru_RU',
    kicker: 'WORKSHOP—08 · ЛОКАЛЬНЫЙ ИИ · 12 МИН ЧТЕНИЯ',
    title: 'Как запустить LLM локально и полностью офлайн · Nyxelium',
    ogTitle: 'Как запустить LLM локально и полностью офлайн',
    description:
      'Требования к железу по размеру модели, что реально стоит квантование, какой запускатор выбрать и как убедиться, что модель работает без сети.',
    twitterDescription:
      'Локальные модели без фантазий: таблицы по VRAM, квантование, запускаторы и проверка офлайна.',
    keywords:
      'локальная LLM, запустить модель офлайн, Ollama, LM Studio, llama.cpp, GGUF квантование, требования VRAM, приватный ИИ',
    articleSection: 'Локальный ИИ',
    audience: 'Разработчики и люди, которым важна приватность',
    proficiency: 'Intermediate',
    headline: 'Языковая модель на своей машине, с выдернутым сетевым кабелем.',
    deck: 'Локальные модели стали по-настоящему полезными, а руководства о них по большей части остались фантазиями о железе. Здесь честная версия: что влезет в вашу видеопамять, чего стоит квантование, какой запускатор брать под какую задачу и как убедиться, что всё действительно работает офлайн, а не тихо ходит в чужой API.',
    aside: {
      label: 'ЗАМЕТКА МАСТЕРСКОЙ',
      strong: 'Офлайн, с проверкой',
      text: 'Последний раздел — проверка того, что модель работает при физически отключённой сети.',
      facts: [
        'ТАБЛИЦА ПАМЯТИ ПО РАЗМЕРАМ',
        'КВАНТОВАНИЕ ОБЪЯСНЕНО',
        'OLLAMA · LM STUDIO',
        'ПРОВЕРКА ОФЛАЙНА',
      ],
    },
    sections: [
      {
        id: 'why',
        nav: 'Зачем локально',
        label: '01 · АРГУМЕНТЫ',
        title: 'Три веских причины и ограничения, о которых молчат.',
        body: `
<p class="lede">Локальная модель хуже топовой облачной почти в любой задаче. И это единственный вариант, когда данные не должны покидать машину — этот размен стоит понимать точно, а не эмоционально.</p>
<h3>Что локальный запуск действительно даёт</h3>
<ul>
  <li><strong>Данные не уходят.</strong> Никаких условий использования, политик хранения и вопросов про обучение. Для клиентских материалов, медицинских записей, юридических черновиков и всего под NDA это и есть весь аргумент.</li>
  <li><strong>Работает без соединения.</strong> В самолёте, в лаборатории, на объекте без связи или во время аварии у провайдера.</li>
  <li><strong>Нет платы за токены и лимитов.</strong> Массовая классификация, пакетная суммаризация и повторяющиеся эксперименты становятся бесплатными после электричества.</li>
  <li><strong>Модель не устареет под вами.</strong> Сохранённая модель через два года ведёт себя так же. Облачные меняют поведение без предупреждения.</li>
</ul>
<h3>Чего он не даёт</h3>
<ul>
  <li><strong>Топового уровня рассуждений.</strong> Модель, влезающая в потребительскую видеопамять, не конкурирует с крупнейшими облачными на сложных задачах и редких знаниях. Ждите способного помощника, а не замену.</li>
  <li><strong>Скорости на длинном контексте.</strong> Обработка большого документа — как раз то, где потребительское железо ощущается медленнее всего.</li>
  <li><strong>Меньше уверенных ошибок.</strong> Маленькие модели галлюцинируют больше, а не меньше. «Локально» не значит «аккуратно».</li>
  <li><strong>Бесплатной памяти.</strong> Всё, что занимает модель, не достаётся остальной работе.</li>
</ul>`,
      },
      {
        id: 'hardware',
        nav: 'Что потянет железо',
        label: '02 · БЮДЖЕТ ПАМЯТИ',
        title: 'Всё решает память. Вот арифметика.',
        body: `
<p class="lede">Размер модели в миллиардах параметров, умноженный на число байт на параметр при вашем квантовании, плюс место под контекст. Это весь расчёт.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Размер модели</th><th>4 бита</th><th>8 бит</th><th>Реалистично на</th></tr>
    </thead>
    <tbody>
      <tr><td>3B</td><td>около 2 ГБ</td><td>около 3,5 ГБ</td><td>Любая современная видеокарта или процессор</td></tr>
      <tr><td>7B–8B</td><td>около 4,5 ГБ</td><td>около 8,5 ГБ</td><td>8 ГБ видеопамяти комфортно; 16 ГБ ОЗУ на процессоре</td></tr>
      <tr><td>13B–14B</td><td>около 8 ГБ</td><td>около 15 ГБ</td><td>12 ГБ видеопамяти; на процессоре медленно, но работает</td></tr>
      <tr><td>30B–34B</td><td>около 19 ГБ</td><td>около 36 ГБ</td><td>24 ГБ видеопамяти или ноутбук с единой памятью</td></tr>
      <tr><td>70B</td><td>около 40 ГБ</td><td>около 75 ГБ</td><td>Две крупные видеокарты или 64 ГБ единой памяти, медленно</td></tr>
    </tbody>
  </table>
</div>
<p><strong>К каждой цифре добавляйте запас.</strong> Кэш ключей и значений растёт вместе с объёмом поданного текста, и длинный контекст на большой модели съедает ещё несколько гигабайт. Модель, которая едва влезла с пустым контекстом, упадёт на середине длинного документа.</p>
<h3>Квантование в одном абзаце</h3>
<p>Веса хранятся с пониженной точностью, чтобы модель занимала меньше. Переход с 16 бит на 8 почти бесплатен по качеству. С 8 на 4 — та самая золотая середина: небольшая, обычно приемлемая потеря за примерно вдвое меньший объём. Ниже 4 бит деградация становится очевидной: первым страдает следование инструкциям, затем связность длинных ответов. <strong>Более крупная модель в 4 битах обычно лучше меньшей в 8</strong> — это самое полезное правило во всей теме.</p>
<div class="note">
  <p><strong>Видеокарта или процессор?</strong> Видеокарта примерно на порядок быстрее при генерации. Процессорный вывод вполне пригоден для моделей 3B–8B, если устраивает скорость чтения. Машины с единой памятью здесь необычно хороши.</p>
</div>`,
      },
      {
        id: 'runners',
        nav: 'Выбор запускатора',
        label: '03 · ИНСТРУМЕНТЫ',
        title: 'Четыре способа запустить одни и те же файлы модели.',
        body: `
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Инструмент</th><th>Формат</th><th>Кому подходит</th><th>Компромисс</th></tr>
    </thead>
    <tbody>
      <tr><td>Ollama</td><td>Командная строка плюс локальный HTTP API</td><td>Разработчикам. Одна команда, чтобы скачать и запустить, и API для других инструментов.</td><td>Меньше тонкого контроля, чем у llama.cpp напрямую</td></tr>
      <tr><td>LM Studio</td><td>Настольное приложение</td><td>Тем, кто пробует и сравнивает модели, и нетехническим пользователям.</td><td>Графический процесс работы, более тяжёлая установка</td></tr>
      <tr><td>llama.cpp</td><td>Движок под всем остальным</td><td>Максимальный контроль над квантованием, выгрузкой слоёв и сэмплированием.</td><td>Рабочий процесс собираете сами</td></tr>
      <tr><td>Jan / GPT4All</td><td>Настольные приложения</td><td>Приватный ассистент для тех, кто не хочет терминал</td><td>Меньше настроек, новые форматы появляются позже</td></tr>
    </tbody>
  </table>
</div>
<p>Все четыре работают с одними и теми же квантованными файлами, так что выбор — про рабочий процесс, а не про возможности. Частая схема: Ollama как движок и отдельный чат-интерфейс, направленный на его API.</p>`,
      },
      {
        id: 'install',
        nav: 'Установка и первый запуск',
        label: '04 · ПОШАГОВО',
        title: 'От нуля до работающей модели примерно за десять минут.',
        body: `
<div class="cmd">
  <div class="cmd-head">SHELL · OLLAMA, ПЕРВЫЙ ЗАПУСК</div>
  <pre><code># Скачать модель под ваше железо и начать диалог
ollama run llama3.1:8b

# Посмотреть, что скачано и сколько занимает
ollama list

# Удалить ненужное
ollama rm llama3.1:8b

# Поднять локальный API для других инструментов
ollama serve</code></pre>
</div>
<p>API слушает localhost — именно к нему подключаются плагины редакторов, приложения для заметок и скрипты. Наружу ничего не уходит.</p>
<div class="cmd">
  <div class="cmd-head">SHELL · ВЫЗОВ ЛОКАЛЬНОГО API</div>
  <pre><code>curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1:8b",
  "prompt": "Сократи до трёх пунктов: ...",
  "stream": false
}'</code></pre>
</div>
<h3>Какую модель взять первой</h3>
<ul>
  <li><strong>Общий помощник, 8 ГБ видеопамяти</strong> — современная инструктивная модель 7B–8B в 4 битах. Ответ по умолчанию, и он хороший.</li>
  <li><strong>Код</strong> — специализированная модель того же размера. Заметно лучше в дополнении и рефакторинге, чем общая модель того же объёма.</li>
  <li><strong>Маленькая и быстрая</strong> — 3B для классификации, извлечения данных и разметки, где диалог не нужен.</li>
  <li><strong>Максимум качества</strong> — сначала растите число параметров, потом точность.</li>
</ul>
<div class="note">
  <p><strong>Проверьте лицензию, прежде чем строить на модели продукт.</strong> Открытые веса — не то же самое, что открытый исходный код: несколько популярных семейств ограничивают коммерческое использование или ставят условия на производные модели.</p>
</div>`,
      },
      {
        id: 'tuning',
        nav: 'Настройка скорости',
        label: '05 · НАСТРОЙКА',
        title: 'Четыре параметра, от которых зависит, будет ли это удобно.',
        body: `
<ul>
  <li><strong>Выгрузка слоёв на видеокарту.</strong> Самый важный параметр, когда модель не влезает целиком. Отдавайте видеокарте столько слоёв, сколько позволяет память; остальное считает процессор. Один лишний слой — и получите ошибку нехватки памяти.</li>
  <li><strong>Размер контекста.</strong> Больший контекст стоит памяти и замедляет генерацию. Ставьте столько, сколько реально нужно: 4K для диалога, больше — только когда действительно подаёте документы.</li>
  <li><strong>Размер батча при обработке промпта.</strong> Влияет на скорость поглощения длинного запроса отдельно от скорости выдачи. Если вставка большого документа тормозит, а ответы идут нормально — это оно.</li>
  <li><strong>Уровень квантования.</strong> Не влезает — сначала снижайте с 5 бит до 4, и только потом берите модель поменьше.</li>
</ul>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Конфигурация</th><th>7B–8B в 4 битах</th><th>Ощущается как</th></tr>
    </thead>
    <tbody>
      <tr><td>Современная дискретная видеокарта, все слои выгружены</td><td>Быстро, заметно выше скорости чтения</td><td>Сопоставимо с облачным чатом</td></tr>
      <tr><td>Старая или слабая видеокарта, частичная выгрузка</td><td>Примерно скорость чтения</td><td>Годится для диалога, утомительно для длинных ответов</td></tr>
      <tr><td>Только процессор, современный многоядерный</td><td>Ниже скорости чтения</td><td>Нормально для фоновых и пакетных задач</td></tr>
      <tr><td>Ноутбук с единой памятью</td><td>Уверенно выше скорости чтения</td><td>Лучший опыт на ватт из доступных сегодня</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Если генерация сильно медленнее таблицы</strong>, модель почти наверняка вылезает из видеопамяти в системную. Проверьте выгрузку слоёв, прежде чем винить железо, — именно эта ошибка объясняет большинство разочарований с первого раза.</p>`,
      },
      {
        id: 'offline',
        nav: 'Проверка офлайна',
        label: '06 · ПРОВЕРКА',
        title: 'Докажите, что модель работает без сети.',
        body: `
<p class="lede">Это шаг, который отделяет действительно локальную установку от локального интерфейса перед удалённым API. Сделайте его один раз и осознанно.</p>
<div class="step-grid">
  <div class="step">
    <span class="step-num">ШАГ—01</span>
    <strong>Сначала всё скачайте</strong>
    <p>Загрузите все модели, пока есть сеть. Файлы моделей — единственное, что действительно требует соединения.</p>
  </div>
  <div class="step">
    <span class="step-num">ШАГ—02</span>
    <strong>Отключитесь по-настоящему</strong>
    <p>Выключите Wi-Fi и выньте кабель. Режим полёта подойдёт. Не полагайтесь на правило файрвола для самой проверки.</p>
  </div>
  <div class="step">
    <span class="step-num">ШАГ—03</span>
    <strong>Задайте реальный запрос</strong>
    <p>Не одно слово. Попросите достаточно длинный ответ, чтобы тихий переход на облако провалился заметно.</p>
  </div>
  <div class="step">
    <span class="step-num">ШАГ—04</span>
    <strong>Смотрите на загрузку</strong>
    <p>Загрузка видеокарты или процессора должна расти во время генерации. Если локально ничего не шевелится — отвечает кто-то другой.</p>
  </div>
</div>
<h3>Как удержать офлайн дальше</h3>
<ul>
  <li><strong>Заблокируйте исходящий трафик</strong> для запускатора в брандмауэре Windows после того, как модели скачаны. Обновляйтесь осознанно.</li>
  <li><strong>Отключите телеметрию и проверку обновлений</strong> в выбранном инструменте.</li>
  <li><strong>Держите файлы моделей в резервной копии.</strong> Они большие, но не бесконечные, а отозванная или перелицензированная модель без копии не восстанавливается.</li>
  <li><strong>Осторожнее с чат-интерфейсами.</strong> Многие настольные оболочки поддерживают и локальных, и облачных провайдеров, а переключение — один выпадающий список. Проверьте, что выбрано, прежде чем вставлять что-то чувствительное.</li>
</ul>
<div class="note note-good">
  <p><strong>Заявление о приватности не крепче самого слабого звена.</strong> Локальная модель за интерфейсом, который синхронизирует историю переписки в облачный аккаунт, — это не приватная установка. Проверяйте каждый компонент отдельно.</p>
</div>`,
      },
    ],
    faqNav: 'Коротко',
    faqLabel: '07 · КОРОТКИЕ ОТВЕТЫ',
    faqHeading: 'Локальные модели — коротко.',
    faqs: [
      [
        'Какое железо нужно, чтобы запустить LLM локально?',
        'Для модели 7B–8B в 4-битном квантовании нужно около 4,5 ГБ видеопамяти, то есть комфортно на видеокарте с 8 ГБ. Только на процессоре работает при примерно 16 ГБ оперативной памяти, но генерация будет медленнее скорости чтения. Машины с единой памятью показывают себя необычно хорошо.',
      ],
      [
        'Локальная модель так же хороша, как облачная?',
        'Нет, не в тех размерах, которые влезают в потребительское железо. Ждите способного помощника для суммаризации, черновиков, извлечения данных и рутинной работы с кодом, и отставания на сложных рассуждениях и редких знаниях. Причина запускать локально — приватность, работа без сети и стоимость, а не сила модели.',
      ],
      [
        'Чего стоит квантование по качеству?',
        'Переход с 16 бит на 8 почти бесплатен. С 8 на 4 стоит небольшой, обычно приемлемой потери за примерно вдвое меньший объём, поэтому большинство работает в 4 битах. Ниже 4 бит деградация очевидна, начиная со следования инструкциям. Правило: более крупная модель в 4 битах лучше меньшей в 8.',
      ],
      [
        'Какой инструмент выбрать для локального запуска?',
        'Ollama, если нужна командная строка и локальный API для других инструментов. LM Studio, если нужно настольное приложение с каталогом моделей и встроенным чатом. llama.cpp напрямую, если нужен полный контроль над квантованием и выгрузкой слоёв. Все работают с одними и теми же файлами моделей.',
      ],
      [
        'Как убедиться, что модель действительно работает офлайн?',
        'Скачайте модели, пока есть сеть, затем полностью отключите её и задайте объёмный запрос. Смотрите, как растёт загрузка видеокарты или процессора во время генерации. После этого заблокируйте исходящий трафик запускатора в брандмауэре и проверьте, что чат-интерфейс не переключается на облачного провайдера.',
      ],
    ],
    related: [
      ['dlss-5-neural-rendering-guide-ru.html', 'DLSS 5 Neural Rendering: честная версия'],
      ['local-backup-3-2-1-guide.html', 'Резервное копирование по правилу 3-2-1 (EN)'],
      ['wsl2-setup-windows-guide.html', 'Настройка WSL2 на Windows (EN)'],
    ],
    callout: {
      label: 'ОТ СТУДИИ',
      strong: 'Nyxelium — офлайн-приложения для Android',
      text: 'Та же идея на телефоне: приложение работает с выключенной сетью, и написанное вами никуда не загружается.',
      cta: 'Посмотреть приложения',
      href: 'index.html#apps',
    },
  },

  /* ═══════════════════ LOCAL LLM · SPANISH ═══════════════════ */
  {
    file: 'run-local-llm-offline-guide-es.html',
    lang: 'es',
    ogLocale: 'es_ES',
    kicker: 'WORKSHOP—08 · IA LOCAL · 12 MIN DE LECTURA',
    title: 'Cómo ejecutar un LLM en local y sin conexión · Nyxelium',
    ogTitle: 'Cómo ejecutar un LLM en local y totalmente sin conexión',
    description:
      'Requisitos de memoria por tamaño de modelo, qué cuesta realmente la cuantización, qué motor elegir y cómo verificar que funciona sin red.',
    twitterDescription:
      'Modelos locales sin humo: tablas de VRAM, cuantización, motores y una verificación real de que funciona sin conexión.',
    keywords:
      'ejecutar LLM local, IA sin conexión, Ollama, LM Studio, llama.cpp, cuantización GGUF, requisitos VRAM, asistente IA privado',
    articleSection: 'IA local',
    audience: 'Desarrolladores y personas preocupadas por la privacidad',
    proficiency: 'Intermediate',
    headline: 'Un modelo de lenguaje en tu equipo, con la red desconectada.',
    deck: 'Los modelos locales ya son realmente útiles, y la mayoría de las guías sobre ellos siguen siendo fantasía sobre hardware. Esta es la versión honesta: qué cabe en tu memoria de vídeo, qué te cuesta la cuantización, qué motor elegir según la tarea y cómo confirmar que todo funciona sin conexión en lugar de llamar en silencio a una API.',
    aside: {
      label: 'NOTA DEL TALLER',
      strong: 'Sin conexión, verificado',
      text: 'La última sección comprueba que el modelo funciona con la red físicamente desconectada.',
      facts: [
        'TABLA DE VRAM POR MODELO',
        'CUANTIZACIÓN EXPLICADA',
        'OLLAMA · LM STUDIO',
        'VERIFICACIÓN SIN CONEXIÓN',
      ],
    },
    sections: [
      {
        id: 'why',
        nav: 'Por qué en local',
        label: '01 · EL ARGUMENTO',
        title: 'Tres buenas razones y los límites que nadie menciona.',
        body: `
<p class="lede">Un modelo local es peor que un modelo alojado de primera línea en casi cualquier tarea. También es la única opción cuando los datos no pueden salir del equipo, y conviene entender ese intercambio con precisión.</p>
<h3>Lo que sí te da lo local</h3>
<ul>
  <li><strong>Los datos no salen.</strong> Sin términos de servicio, sin política de retención, sin dudas sobre entrenamiento. Para material de clientes, notas médicas, borradores legales o cualquier cosa bajo acuerdo de confidencialidad, ese es todo el argumento.</li>
  <li><strong>Funciona sin conexión.</strong> En un avión, en un laboratorio, en una obra sin cobertura o durante una caída del proveedor.</li>
  <li><strong>Sin coste por token ni límites de uso.</strong> Clasificación masiva, resúmenes por lotes y experimentos repetidos salen gratis después de la electricidad.</li>
  <li><strong>No lo pueden retirar bajo tus pies.</strong> El modelo que guardaste se comporta igual dentro de dos años. Los modelos alojados cambian sin avisar.</li>
</ul>
<h3>Lo que no te da</h3>
<ul>
  <li><strong>Razonamiento de frontera.</strong> Un modelo que cabe en memoria de vídeo de consumo no compite con los mayores modelos alojados en razonamiento difícil ni en conocimiento poco común.</li>
  <li><strong>Velocidad con contexto largo.</strong> Procesar un documento grande es justo donde el hardware de consumo se nota más lento.</li>
  <li><strong>Menos errores con aplomo.</strong> Los modelos pequeños alucinan más, no menos. Local no significa cuidadoso.</li>
  <li><strong>Memoria gratis.</strong> Lo que ocupa el modelo es memoria que no tiene el resto de tu trabajo.</li>
</ul>`,
      },
      {
        id: 'hardware',
        nav: 'Qué mueve tu equipo',
        label: '02 · EL PRESUPUESTO',
        title: 'La memoria lo decide todo. Esta es la aritmética.',
        body: `
<p class="lede">Tamaño del modelo en miles de millones de parámetros, multiplicado por los bytes por parámetro de tu cuantización, más espacio para la ventana de contexto. Ese es todo el cálculo.</p>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Tamaño</th><th>A 4 bits</th><th>A 8 bits</th><th>Realista en</th></tr>
    </thead>
    <tbody>
      <tr><td>3B</td><td>unos 2 GB</td><td>unos 3,5 GB</td><td>Cualquier GPU moderna, o solo CPU</td></tr>
      <tr><td>7B a 8B</td><td>unos 4,5 GB</td><td>unos 8,5 GB</td><td>8 GB de VRAM con holgura; 16 GB de RAM en CPU</td></tr>
      <tr><td>13B a 14B</td><td>unos 8 GB</td><td>unos 15 GB</td><td>12 GB de VRAM; lento pero usable en CPU</td></tr>
      <tr><td>30B a 34B</td><td>unos 19 GB</td><td>unos 36 GB</td><td>24 GB de VRAM, o un portátil de memoria unificada</td></tr>
      <tr><td>70B</td><td>unos 40 GB</td><td>unos 75 GB</td><td>Dos GPU grandes, o 64 GB de memoria unificada, despacio</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Añade margen sobre cada cifra.</strong> La caché de claves y valores crece con el texto que introduces, y un contexto largo en un modelo grande consume varios gigabytes más. Un modelo que apenas cabe con el contexto vacío fallará a mitad de un documento largo.</p>
<h3>La cuantización en un párrafo</h3>
<p>Los pesos se almacenan con menor precisión para que el modelo ocupe menos. Pasar de 16 a 8 bits es casi gratis en calidad. De 8 a 4 bits es el punto dulce que usa casi todo el mundo: una pérdida pequeña y normalmente aceptable a cambio de aproximadamente la mitad de memoria. Por debajo de 4 bits la degradación se vuelve evidente, empezando por el seguimiento de instrucciones. <strong>Un modelo más grande a 4 bits suele superar a uno más pequeño a 8 bits</strong>, y esa es la regla más útil de todo el tema.</p>
<div class="note">
  <p><strong>¿GPU o CPU?</strong> La GPU es alrededor de un orden de magnitud más rápida generando. La inferencia en CPU es perfectamente usable para modelos de 3B a 8B si aceptas velocidad de lectura. Los equipos de memoria unificada rinden especialmente bien.</p>
</div>`,
      },
      {
        id: 'runners',
        nav: 'Elegir motor',
        label: '03 · LAS HERRAMIENTAS',
        title: 'Cuatro formas de ejecutar los mismos archivos.',
        body: `
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Herramienta</th><th>Formato</th><th>Ideal para</th><th>Contrapartida</th></tr>
    </thead>
    <tbody>
      <tr><td>Ollama</td><td>Línea de comandos más API HTTP local</td><td>Desarrolladores. Un comando para descargar y ejecutar, y una API para otras herramientas.</td><td>Menos control fino que llama.cpp directo</td></tr>
      <tr><td>LM Studio</td><td>Aplicación de escritorio</td><td>Probar y comparar modelos, y uso no técnico. Catálogo y chat incluidos.</td><td>Flujo gráfico, instalación más pesada</td></tr>
      <tr><td>llama.cpp</td><td>El motor que hay debajo</td><td>Control total sobre cuantización, descarga de capas y muestreo.</td><td>El flujo de trabajo lo montas tú</td></tr>
      <tr><td>Jan / GPT4All</td><td>Aplicaciones de escritorio</td><td>Un asistente privado para quien no quiere terminal</td><td>Menos ajustes, formatos nuevos más tarde</td></tr>
    </tbody>
  </table>
</div>
<p>Las cuatro ejecutan los mismos archivos cuantizados, así que la elección va de flujo de trabajo, no de capacidad. Un montaje habitual es Ollama como motor y una interfaz de chat aparte apuntando a su API.</p>`,
      },
      {
        id: 'install',
        nav: 'Instalación',
        label: '04 · PASO A PASO',
        title: 'De cero a un modelo funcionando en unos diez minutos.',
        body: `
<div class="cmd">
  <div class="cmd-head">SHELL · OLLAMA, PRIMERA EJECUCIÓN</div>
  <pre><code># Descarga un modelo acorde a tu hardware y empieza a chatear
ollama run llama3.1:8b

# Ver qué has descargado y cuánto ocupa
ollama list

# Eliminar lo que ya no quieres
ollama rm llama3.1:8b

# Servir la API local para otras herramientas
ollama serve</code></pre>
</div>
<p>La API escucha en localhost, que es adonde se conectan los complementos del editor, las aplicaciones de notas y tus scripts. Nada sale del equipo.</p>
<div class="cmd">
  <div class="cmd-head">SHELL · LLAMAR A LA API LOCAL</div>
  <pre><code>curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1:8b",
  "prompt": "Resume esto en tres puntos: ...",
  "stream": false
}'</code></pre>
</div>
<h3>Qué modelo elegir primero</h3>
<ul>
  <li><strong>Asistente general con 8 GB de VRAM</strong> — un modelo instruido actual de 7B a 8B a 4 bits. Es la respuesta por defecto y es buena.</li>
  <li><strong>Código</strong> — un modelo especializado del mismo tamaño. Claramente mejor completando y refactorizando que uno general equivalente.</li>
  <li><strong>Pequeño y rápido</strong> — un modelo de 3B para clasificación, extracción y etiquetado, donde no necesitas conversación.</li>
  <li><strong>La mejor calidad que quepa</strong> — sube en parámetros antes que en precisión.</li>
</ul>
<div class="note">
  <p><strong>Revisa la licencia antes de construir sobre el modelo.</strong> Pesos abiertos no es lo mismo que código abierto: varias familias populares restringen el uso comercial o imponen condiciones a los modelos derivados.</p>
</div>`,
      },
      {
        id: 'tuning',
        nav: 'Ajuste de velocidad',
        label: '05 · AJUSTES',
        title: 'Cuatro parámetros que deciden si resulta usable.',
        body: `
<ul>
  <li><strong>Capas descargadas a la GPU.</strong> El ajuste más importante cuando el modelo no cabe entero. Envía a la GPU tantas capas como permita la VRAM; el resto lo calcula la CPU. Una capa de más provoca un fallo por falta de memoria.</li>
  <li><strong>Ventana de contexto.</strong> Más contexto cuesta memoria y ralentiza la generación. Ponla en lo que realmente necesites: 4K para conversar, más solo cuando de verdad introduces documentos.</li>
  <li><strong>Tamaño de lote al procesar el prompt.</strong> Afecta a la rapidez con la que se ingiere una entrada larga, aparte de la velocidad de salida.</li>
  <li><strong>Nivel de cuantización.</strong> Si no cabe, baja de 5 a 4 bits antes de cambiar a un modelo más pequeño.</li>
</ul>
<div class="table-wrap">
  <table class="spec-table">
    <thead>
      <tr><th>Configuración</th><th>7B a 8B a 4 bits</th><th>Se siente como</th></tr>
    </thead>
    <tbody>
      <tr><td>GPU dedicada moderna, todo descargado</td><td>Rápido, muy por encima de la velocidad de lectura</td><td>Comparable a un chat alojado</td></tr>
      <tr><td>GPU antigua o pequeña, descarga parcial</td><td>En torno a la velocidad de lectura</td><td>Válido para conversar, tedioso para respuestas largas</td></tr>
      <tr><td>Solo CPU, multinúcleo moderno</td><td>Por debajo de la velocidad de lectura</td><td>Bien para tareas de fondo y por lotes</td></tr>
      <tr><td>Portátil de memoria unificada</td><td>Cómodamente por encima de la lectura</td><td>La mejor experiencia por vatio disponible hoy</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Si la generación va mucho más lenta que la tabla</strong>, es casi seguro que el modelo se está desbordando de la VRAM a la memoria del sistema. Revisa la descarga de capas antes de culpar al hardware.</p>`,
      },
      {
        id: 'offline',
        nav: 'Verificar sin conexión',
        label: '06 · VERIFICACIÓN',
        title: 'Demuestra que el modelo funciona sin red.',
        body: `
<p class="lede">Este es el paso que separa una instalación realmente local de una interfaz local delante de una API remota. Hazlo una vez, a conciencia.</p>
<div class="step-grid">
  <div class="step">
    <span class="step-num">PASO—01</span>
    <strong>Descárgalo todo antes</strong>
    <p>Baja todos los modelos que vayas a usar mientras tengas conexión. Los archivos del modelo son lo único que necesita red de verdad.</p>
  </div>
  <div class="step">
    <span class="step-num">PASO—02</span>
    <strong>Desconéctate de verdad</strong>
    <p>Apaga el Wi-Fi y desenchufa el cable. El modo avión vale. No te fíes de una regla de cortafuegos para la prueba.</p>
  </div>
  <div class="step">
    <span class="step-num">PASO—03</span>
    <strong>Lanza una petición real</strong>
    <p>No una prueba de una palabra. Pide algo lo bastante largo como para que una vuelta silenciosa a un servicio remoto falle de forma visible.</p>
  </div>
  <div class="step">
    <span class="step-num">PASO—04</span>
    <strong>Mira los medidores</strong>
    <p>El uso de GPU o CPU debe subir mientras genera. Si no se mueve nada en local, está respondiendo otro.</p>
  </div>
</div>
<h3>Mantenerlo sin conexión después</h3>
<ul>
  <li><strong>Bloquea la salida a red del motor</strong> en el cortafuegos una vez descargados los modelos. Actualiza de forma deliberada.</li>
  <li><strong>Desactiva telemetría y comprobación de actualizaciones</strong> en la herramienta que hayas elegido.</li>
  <li><strong>Guarda copia de los archivos del modelo.</strong> Son grandes pero no infinitos, y un modelo retirado o relicenciado no se recupera sin copia.</li>
  <li><strong>Cuidado con las interfaces de chat.</strong> Muchas admiten proveedores locales y alojados, y cambiar es un desplegable. Comprueba cuál está seleccionado antes de pegar algo sensible.</li>
</ul>
<div class="note note-good">
  <p><strong>La promesa de privacidad vale lo que su eslabón más débil.</strong> Un modelo local detrás de una interfaz que sincroniza tu historial con una cuenta en la nube no es una instalación privada. Verifica cada pieza por separado.</p>
</div>`,
      },
    ],
    faqNav: 'Respuestas rápidas',
    faqLabel: '07 · RESPUESTAS RÁPIDAS',
    faqHeading: 'Modelos locales, en breve.',
    faqs: [
      [
        '¿Qué hardware necesito para ejecutar un LLM en local?',
        'Para un modelo de 7B a 8B con cuantización de 4 bits, unos 4,5 GB de memoria de vídeo, de modo que una tarjeta de 8 GB va holgada. Solo con CPU funciona con unos 16 GB de RAM del sistema, aunque genera por debajo de la velocidad de lectura. Los equipos de memoria unificada rinden especialmente bien porque la memoria es compartida y amplia.',
      ],
      [
        '¿Un LLM local es tan bueno como uno alojado?',
        'No en los tamaños que caben en hardware de consumo. Espera un asistente competente para resumir, redactar, extraer datos y trabajo rutinario de código, y espera que quede por detrás en razonamiento difícil y conocimiento poco común. La razón para ejecutarlo en local es la privacidad, la disponibilidad sin conexión y el coste.',
      ],
      [
        '¿Qué cuesta la cuantización en calidad?',
        'De 16 a 8 bits es casi gratis. De 8 a 4 bits cuesta una pérdida pequeña y normalmente aceptable a cambio de aproximadamente la mitad de memoria, por eso casi todo el mundo usa 4 bits. Por debajo de 4 bits la degradación es evidente, empezando por el seguimiento de instrucciones. Como regla, un modelo mayor a 4 bits supera a uno menor a 8 bits.',
      ],
      [
        '¿Qué herramienta uso para ejecutar modelos en local?',
        'Ollama si quieres línea de comandos y una API local que otras herramientas puedan llamar. LM Studio si prefieres una aplicación de escritorio con catálogo de modelos y chat integrado. llama.cpp directamente si quieres control total sobre la cuantización y la descarga de capas. Las tres ejecutan los mismos archivos.',
      ],
      [
        '¿Cómo sé que mi modelo local funciona realmente sin conexión?',
        'Descarga los modelos con conexión, desconecta la red por completo y lanza una petición sustancial. Observa cómo sube el uso de GPU o CPU mientras genera. Después bloquea la salida a red del motor en el cortafuegos y comprueba que tu interfaz de chat no esté configurada para recurrir a un proveedor alojado.',
      ],
    ],
    related: [
      ['wsl2-setup-windows-guide.html', 'Configurar WSL2 en Windows (EN)'],
      ['local-backup-3-2-1-guide.html', 'Una copia de seguridad 3-2-1 (EN)'],
      ['python-virtual-environment-guide.html', 'Entornos de Python sin líos (EN)'],
    ],
    callout: {
      label: 'DESDE EL ESTUDIO',
      strong: 'Nyxelium — apps offline para Android',
      text: 'La misma idea en el móvil: la app funciona con la red apagada y nada de lo que escribes se sube.',
      cta: 'Ver las apps',
      href: 'index.html#apps',
    },
  },
];
