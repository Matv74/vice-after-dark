// TODO: legal review
import { ADS_ENABLED, ANALYTICS_PROVIDER, CONTACT_EMAIL, FORUM_ENABLED, FORUM_MINIMUM_AGE } from "@/config/legal";
import { SITE_NAME } from "@/components/sites/vice-signal/config";

export const legalCopy = {
  uk: {
    titles: { privacy: "Конфіденційність", terms: "Умови користування", cookies: "Файли cookie", disclaimer: "Застереження" },
    fanLine: "Неофіційний фан-проєкт GTA VI.",
    legalLabel: "Правова інформація",
    settings: "Налаштування cookie",
    languages: "Мови",
    contact: "Контакт",
    complaint: "Як подати скаргу до UODO",
    columns: ["Ключ", "Тип", "Призначення", "Строк"],
    storageRows: [
      ["gta-countdown-preferences", "localStorage", "Вибраний фон і налаштування інтерфейсу.", "До видалення через налаштування браузера."],
      ["gta_album_volume", "localStorage", "Збереження вибраної гучності.", "До видалення через налаштування браузера."],
      ...(FORUM_ENABLED ? [["[TODO: ключі форуму]", "[TODO: тип і домен]", "[TODO: сесія входу, безпека та налаштування]", "[TODO: фактичні строки]"]] : []),
    ],
    privacy: [
      ["Хто відповідає за дані", `Адміністратор даних — оператор ${SITE_NAME}. Зв’язок через ${CONTACT_EMAIL}.`],
      ["Головний сайт", "Головний сайт працює без реєстрації та форм збору даних. Vercel обробляє технічні дані запитів, зокрема IP-адресу, час, запитану сторінку й дані браузера, щоб доставляти сторінки, підтримувати безпеку й усувати збої. Строки зберігання журналів [TODO: перевірити налаштування Vercel]. Якщо ви напишете нам, обробимо вашу адресу й повідомлення, щоб відповісти. Строк зберігання листування [TODO]."],
      ...(FORUM_ENABLED ? [[
        "Форум на окремому піддомені",
        `Для облікового запису та роботи форуму передбачені ім’я користувача, email, хеш пароля, IP-адреса й дописи. Email використовуватиметься для підтвердження адреси, відновлення доступу та вибраних сповіщень. Ім’я й дописи можуть бути публічними. IP і технічні журнали допомагають захищати сервіс та модерувати. Хостинг форуму [TODO], поштовий сервіс форуму [TODO], строки для акаунтів, дописів, журналів, листів і резервних копій [TODO]. Мінімальний вік — ${FORUM_MINIMUM_AGE} років [TODO: перевірити].`,
      ]] : []),
      ["Медіа та передавання даних", "Якщо ви завантажите вбудований плеєр, його постачальник отримає технічні дані, зокрема IP-адресу, і може використати власні cookie. Це стосується YouTube і SoundCloud, а також Twitch і TikTok, якщо такі плеєри з’являться. Дані можуть оброблятися за межами ЄЕЗ [TODO: перевірити країни та підстави передавання]."],
      ["Правові підстави", "[TODO: підтвердити правову підставу для кожної мети обробки та описати законний інтерес, якщо він застосовується.]"],
      ["Що ви можете зробити", "Ви можете звернутися щодо доступу, виправлення, видалення, обмеження обробки, перенесення даних або заперечення, коли відповідне право застосовується. Згоду можна відкликати, якщо обробка на ній ґрунтується. Також можна подати скаргу до польського UODO."],
    ],
    terms: [
      ["Користування сайтом", "Це незалежний фан-проєкт. Користуйтеся сайтом законно й поважайте інших людей."],
      ...(FORUM_ENABLED ? [
        ["Правила форуму", `Мінімальний вік — ${FORUM_MINIMUM_AGE} років [TODO: перевірити]. Заборонені незаконний контент, мова ненависті, цькування, розголошення чужих приватних даних, спам, посилання на піратські матеріали, витоки або дорелізні матеріали гри, чити та реклама азартних ігор чи криптовалют.`],
        ["Скарги й модерація", `Скористайтеся кнопкою скарги на форумі або напишіть на ${CONTACT_EMAIL}. Вкажіть посилання на допис і причину. Модератори можуть видалити допис, обмежити доступ або тимчасово чи назавжди заблокувати акаунт. Щодо рішення можна звернутися на той самий email.`],
      ] : []),
    ],
    cookies: [
      ["Зберігання у браузері", "Головний сайт не встановлює власних cookie. Записи нижче зберігають вибрані вами налаштування. Вбудовані плеєри після завантаження можуть використовувати сховища провайдерів. Точні назви й строки залежать від провайдера, браузера та входу в обліковий запис."],
    ],
    options: [
      ADS_ENABLED ? "Реклама ввімкнена в конфігурації [TODO: постачальник і згода]." : "Реклама вимкнена.",
      ANALYTICS_PROVIDER === "none" ? "Аналітика вимкнена." : `Аналітика: ${ANALYTICS_PROVIDER} [TODO: опис і згода].`,
      "Щоб скинути збережені параметри, видаліть дані сайту у браузері. Щоб припинити роботу вбудованого плеєра, перезавантажте сторінку.",
    ],
    disclaimer: [
      ["Про проєкт", "Це неофіційний фан-проєкт. Він не пов’язаний із Rockstar Games або Take-Two Interactive. Торговельні марки належать їхнім власникам."],
      ["Правовласникам", `Напишіть на ${CONTACT_EMAIL} і вкажіть матеріал та його URL. Ми оперативно розглянемо звернення й видалимо відповідний контент.`],
    ],
  },
  // Machine-drafted English translation.
  en: {
    titles: { privacy: "Privacy", terms: "Terms", cookies: "Cookies", disclaimer: "Disclaimer" },
    fanLine: "Unofficial GTA VI fan project.",
    legalLabel: "Legal information",
    settings: "Cookie settings",
    languages: "Languages",
    contact: "Contact",
    complaint: "How to complain to UODO",
    columns: ["Key", "Type", "Purpose", "Retention"],
    storageRows: [
      ["gta-countdown-preferences", "localStorage", "Remembers your chosen background and interface settings.", "Until cleared in your browser."],
      ["gta_album_volume", "localStorage", "Remembers your chosen volume.", "Until cleared in your browser."],
      ...(FORUM_ENABLED ? [["[TODO: forum keys]", "[TODO: type and domain]", "[TODO: login session, security and preferences]", "[TODO: actual retention]"]] : []),
    ],
    privacy: [
      ["Who is responsible", `The controller is the operator of ${SITE_NAME}. Contact ${CONTACT_EMAIL}.`],
      ["Main site", "The main site has no registration or data collection forms. Vercel processes technical request data such as IP address, time, requested page and browser details to serve pages, maintain security and troubleshoot issues. Log retention [TODO: check Vercel settings]. If you email us, we process your address and message to reply. Email retention [TODO]."],
      ...(FORUM_ENABLED ? [[
        "Forum on a separate subdomain",
        `The planned forum uses a username, email, password hash, IP address and posts to run accounts and the forum. Email is used for verification, account recovery and notifications you select. Usernames and posts may be public. IP data and technical logs help secure and moderate the service. Forum host [TODO], forum email provider [TODO], retention for accounts, posts, logs, emails and backups [TODO]. Minimum age is ${FORUM_MINIMUM_AGE} [TODO: verify].`,
      ]] : []),
      ["Media and transfers", "When you load an embedded player, its provider receives technical data such as your IP address and may use its own cookies. This applies to YouTube and SoundCloud, and to Twitch or TikTok when those players are offered. Data may be processed outside the EEA [TODO: verify destinations and transfer arrangements]."],
      ["Legal bases", "[TODO: confirm the legal basis for each purpose and describe the legitimate interest where applicable.]"],
      ["Your rights", "You can request access, correction, erasure, restriction, portability or object where the right applies. You can withdraw consent where processing relies on it. You can also lodge a complaint with Poland’s UODO."],
    ],
    terms: [
      ["Using the site", "This is an independent fan project. Use the site lawfully and respect other people."],
      ...(FORUM_ENABLED ? [
        ["Forum rules", `The minimum age is ${FORUM_MINIMUM_AGE} [TODO: verify]. Illegal content, hate, harassment, doxxing, spam, piracy links, leaked or pre-release game material, cheats, and gambling or crypto promotion are forbidden.`],
        ["Reporting and moderation", `Use the forum report button or email ${CONTACT_EMAIL}. Include the post URL and reason. Moderators may remove posts, restrict access or suspend or ban accounts. You can ask about a decision at the same email address.`],
      ] : []),
    ],
    cookies: [
      ["Browser storage", "The main site sets no first-party cookies. The entries below remember your chosen settings. When you load an embedded player, the provider may use its own storage. Its exact keys and retention depend on the provider, browser and login state."],
    ],
    options: [
      ADS_ENABLED ? "Ads are enabled in configuration [TODO: provider and consent]." : "Ads are off.",
      ANALYTICS_PROVIDER === "none" ? "Analytics is off." : `Analytics: ${ANALYTICS_PROVIDER} [TODO: description and consent].`,
      "Clear site data in your browser to reset saved preferences. Reload the page to unload an embedded player.",
    ],
    disclaimer: [
      ["About this project", "This unofficial fan project is not affiliated with Rockstar Games or Take-Two Interactive. Trademarks belong to their owners."],
      ["Rights holders", `Write to ${CONTACT_EMAIL} with the material and its URL. We will review the request and remove the relevant content promptly.`],
    ],
  },
  // Machine-drafted Polish translation.
  pl: {
    titles: { privacy: "Prywatność", terms: "Regulamin", cookies: "Pliki cookie", disclaimer: "Zastrzeżenie" },
    fanLine: "Nieoficjalny projekt fanowski GTA VI.",
    legalLabel: "Informacje prawne",
    settings: "Ustawienia plików cookie",
    languages: "Języki",
    contact: "Kontakt",
    complaint: "Jak złożyć skargę do UODO",
    columns: ["Klucz", "Typ", "Cel", "Okres"],
    storageRows: [
      ["gta-countdown-preferences", "localStorage", "Zapamiętuje wybrane tło i ustawienia interfejsu.", "Do usunięcia w przeglądarce."],
      ["gta_album_volume", "localStorage", "Zapamiętuje wybraną głośność.", "Do usunięcia w przeglądarce."],
      ...(FORUM_ENABLED ? [["[TODO: klucze forum]", "[TODO: typ i domena]", "[TODO: sesja logowania, bezpieczeństwo i ustawienia]", "[TODO: rzeczywiste okresy]"]] : []),
    ],
    privacy: [
      ["Kto odpowiada za dane", `Administratorem danych jest operator ${SITE_NAME}. Kontakt przez ${CONTACT_EMAIL}.`],
      ["Strona główna", "Strona główna działa bez rejestracji i formularzy zbierających dane. Vercel przetwarza techniczne dane żądań, takie jak adres IP, czas, żądana strona i dane przeglądarki, aby dostarczać strony, zapewniać bezpieczeństwo i usuwać usterki. Okres przechowywania logów [TODO: sprawdzić ustawienia Vercel]. Gdy napiszesz do nas, użyjemy adresu i treści wiadomości, aby odpowiedzieć. Okres przechowywania korespondencji [TODO]."],
      ...(FORUM_ENABLED ? [[
        "Forum w osobnej subdomenie",
        `Planowane forum wykorzystuje nazwę użytkownika, email, skrót hasła, adres IP i posty do obsługi kont i forum. Email służy do weryfikacji, odzyskiwania dostępu i wybranych powiadomień. Nazwy użytkowników i posty mogą być publiczne. Adres IP i logi pomagają chronić i moderować forum. Hosting forum [TODO], dostawca poczty forum [TODO], okresy przechowywania kont, postów, logów, poczty i kopii zapasowych [TODO]. Minimalny wiek to ${FORUM_MINIMUM_AGE} lat [TODO: sprawdzić].`,
      ]] : []),
      ["Media i przekazywanie danych", "Po wczytaniu osadzonego odtwarzacza jego dostawca otrzyma dane techniczne, w tym adres IP, i może używać własnych plików cookie. Dotyczy to YouTube i SoundCloud oraz Twitcha i TikToka, gdy takie odtwarzacze będą dostępne. Dane mogą być przetwarzane poza EOG [TODO: sprawdzić kraje i podstawy przekazywania]."],
      ["Podstawy prawne", "[TODO: potwierdzić podstawę prawną każdego celu i opisać prawnie uzasadniony interes, jeśli ma zastosowanie.]"],
      ["Twoje prawa", "Możesz żądać dostępu, sprostowania, usunięcia, ograniczenia, przeniesienia danych lub wnieść sprzeciw, gdy dane prawo ma zastosowanie. Możesz wycofać zgodę, jeśli przetwarzanie się na niej opiera. Możesz też złożyć skargę do Prezesa UODO."],
    ],
    terms: [
      ["Korzystanie ze strony", "To niezależny projekt fanowski. Korzystaj ze strony zgodnie z prawem i szanuj innych."],
      ...(FORUM_ENABLED ? [
        ["Zasady forum", `Minimalny wiek to ${FORUM_MINIMUM_AGE} lat [TODO: sprawdzić]. Zabronione są treści nielegalne, mowa nienawiści, nękanie, ujawnianie cudzych danych prywatnych, spam, linki do pirackich materiałów, wycieki lub materiały gry sprzed premiery, cheaty oraz promocja hazardu lub kryptowalut.`],
        ["Zgłoszenia i moderacja", `Użyj przycisku zgłoszenia na forum lub napisz na ${CONTACT_EMAIL}. Podaj link do postu i powód. Moderatorzy mogą usuwać posty, ograniczać dostęp oraz zawieszać lub blokować konta. W sprawie decyzji można napisać na ten sam adres.`],
      ] : []),
    ],
    cookies: [
      ["Pamięć przeglądarki", "Strona główna nie ustawia własnych plików cookie. Poniższe wpisy zapamiętują wybrane ustawienia. Po wczytaniu osadzonego odtwarzacza jego dostawca może używać własnej pamięci. Klucze i okresy zależą od dostawcy, przeglądarki i stanu logowania."],
    ],
    options: [
      ADS_ENABLED ? "Reklamy są włączone w konfiguracji [TODO: dostawca i zgoda]." : "Reklamy są wyłączone.",
      ANALYTICS_PROVIDER === "none" ? "Analityka jest wyłączona." : `Analityka: ${ANALYTICS_PROVIDER} [TODO: opis i zgoda].`,
      "Aby zresetować ustawienia, usuń dane witryny w przeglądarce. Aby wyłączyć osadzony odtwarzacz, odśwież stronę.",
    ],
    disclaimer: [
      ["O projekcie", "To nieoficjalny projekt fanowski, niezwiązany z Rockstar Games ani Take-Two Interactive. Znaki towarowe należą do ich właścicieli."],
      ["Właściciele praw", `Napisz na ${CONTACT_EMAIL} i podaj materiał oraz jego adres URL. Niezwłocznie rozpatrzymy zgłoszenie i usuniemy odpowiednią treść.`],
    ],
  },
};
