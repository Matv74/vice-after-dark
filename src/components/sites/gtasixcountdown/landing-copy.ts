// needs native review — all Ukrainian and Polish copy below
export const landingCopy = {
  uk: {
    title: "GTA 6 відлік: коли вийде GTA VI у вашому часовому поясі",
    description: "Відлік до релізу GTA VI 19 листопада 2026 року. Дізнайтеся час розблокування GTA 6 в Україні та інших регіонах.",
    guide: "Коли відкриється доступ до GTA 6?",
    intro: [
      "Дата виходу GTA VI — 19 листопада 2026 року. Якщо ви хочете знати, о котрій можна буде почати гру, самої дати замало: для різних регіонів у PlayStation Store зазначено різні години. Таймер показує, скільки залишилося до відкриття доступу у вашому регіоні. Якщо він не може визначити регіон, відлік орієнтується на місцеву північ і позначає час як приблизний.",
      "У таблиці кожен рядок відповідає одному часу розблокування. У першій колонці наведено приклади країн, у другій — час для вибраного міста, а в третій — той самий момент за UTC. Якщо ви живете в іншому часовому поясі, звіртеся з колонкою UTC. Так зручніше домовитися з друзями про спільний старт, навіть коли у вас на годинниках різний час.",
    ],
    note: "Час розблокування взято зі сторінок PlayStation Store. Він може змінитися.",
    table: ["Регіон", "Приклад місцевого часу", "UTC", "Ваше вікно релізу"],
    timer: { label: "Час до виходу GTA VI", units: ["Дні", "Години", "Хвилини", "Секунди"], out: "Гра вже вийшла" },
    approximate: "Приблизний відлік до місцевої півночі 19 листопада.",
    faqTitle: "Запитання про реліз GTA VI",
    faq: [
      ["Коли виходить GTA 6?", "Заявлена дата виходу — 19 листопада 2026 року."],
      ["О котрій відкриється доступ в Україні й Польщі?", "За поточним розкладом — опівночі 19 листопада за місцевим часом у Києві та Варшаві."],
      ["Чи відкриють гру одночасно в усьому світі?", "У розкладі є кілька регіональних вікон із різним часом за UTC."],
      ["Для яких платформ працює відлік?", "Відлік спирається на дані PlayStation Store. Для Xbox ті самі вікна використовуються як орієнтир до підтвердження."],
      ["Це офіційний сайт гри?", "Це незалежний фанатський сайт, який не пов’язаний із Rockstar Games чи Take-Two Interactive."],
    ],
    home: "На англомовну головну",
  },
  pl: {
    title: "GTA 6 odliczanie: o której premiera GTA VI w Twojej strefie",
    description: "Odliczanie do premiery GTA VI 19 listopada 2026 r. Sprawdź godzinę odblokowania GTA 6 w Polsce i innych regionach.",
    guide: "O której będzie można zagrać w GTA 6?",
    intro: [
      "Jeśli planujesz zacząć grać od razu po premierze GTA VI, sprawdź godzinę przypisaną do swojego regionu. Datę premiery wyznaczono na 19 listopada 2026 roku. Zegar na tej stronie odlicza do chwili, w której gra ma zostać odblokowana. Gdy nie uda się dopasować regionu, zobaczysz przybliżone odliczanie do północy w swojej strefie czasowej.",
      "Polska i Wielka Brytania mają w zestawieniu osobne okna premiery, dlatego do porównania godzin najlepiej użyć kolumny UTC. Czas lokalny w tabeli dotyczy przykładowego miasta, wskazanego przez nazwę strefy. To ważne zwłaszcza przy większych krajach, które obejmują kilka stref czasowych, a mają jedno wspólne okno premiery. Zaznaczony wiersz pokazuje, z którego okna korzysta Twój zegar.",
    ],
    note: "Godziny odblokowania pochodzą z PlayStation Store i mogą się zmienić.",
    table: ["Region", "Przykładowy czas lokalny", "UTC", "Twoje okno premiery"],
    timer: { label: "Czas do premiery GTA VI", units: ["Dni", "Godziny", "Minuty", "Sekundy"], out: "Gra jest już dostępna" },
    approximate: "Przybliżone odliczanie do lokalnej północy 19 listopada.",
    faqTitle: "Pytania o premierę GTA VI",
    faq: [
      ["Kiedy wychodzi GTA 6?", "Podana data premiery to 19 listopada 2026 roku."],
      ["O której gra odblokuje się w Polsce i Ukrainie?", "Obecny rozkład wskazuje północ 19 listopada czasu lokalnego w Warszawie i Kijowie."],
      ["Czy premiera nastąpi jednocześnie na całym świecie?", "Godziny w UTC różnią się w zależności od regionu."],
      ["Jakich platform dotyczy odliczanie?", "Zegar korzysta z godzin PlayStation Store. Dla Xbox przyjęto te same godziny jako niepotwierdzone szacunki."],
      ["Czy to oficjalna strona gry?", "To niezależny projekt fanowski bez powiązań z Rockstar Games ani Take-Two Interactive."],
    ],
    home: "Strona główna po angielsku",
  },
} as const;
