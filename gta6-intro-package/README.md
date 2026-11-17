# Повний автономний пакет анімації: GTA 6 Shard & Logo Reveal

Ця папка містить **100% автономний модуль** анімації появи логотипу та обкладинки GTA 6 (збір 10 3D-уламків у єдиний постер, плавний прояв логотипу та вихід у контент сайту).

Всі стилі, компоненти та графічні ассети вже зібрані всередині цієї папки. Жодних зовнішніх залежностей.

---

## 📂 Структура папки `gta6-intro-package`

```text
gta6-intro-package/
├── assets/
│   ├── desktop/
│   │   ├── shard0.png ... shard9.png   # 10 уламків для великих екранів
│   │   ├── poster_full.jpg             # Зібрана обкладинка (десктоп)
│   │   └── poster_logo.png             # Логотип GTA VI (десктоп)
│   └── mobile/
│       ├── shard0.png ... shard9.png   # 10 оптимізованих уламків під мобільні
│       ├── poster_full.jpg             # Зібрана обкладинка (мобільна)
│       └── poster_logo.png             # Логотип GTA VI (мобільний)
├── GTA6IntroAnimation.tsx              # Готовий React / Next.js TSX компонент
├── gta6-intro.css                      # Чистий CSS з ключовими кадрами й таймінгами
├── index.ts                            # Експорт для модуля
├── demo.html                           # Автономний HTML файл для миттєвого перегляду в браузері
└── README.md                           # Ця інструкція
```

---

## 👁️ Швидкий перегляд
Ви можете двічі клікнути на `demo.html` або відкрити його у браузері прямо зараз — анімація працюватиме локально без веб-серверів та збірок. У ньому є кнопка **"REPLAY INTRO"** для повторного тестування.

---

## 🤖 Інструкція для наступного ШІ / Розробника (Integration Guide)

### Варіант А: Інтеграція в React / Next.js проєкт

1. **Скопіюйте вміст `assets/`** у статичну папку вашого нового проєкту, наприклад у `public/gta6-intro/`:
   ```text
   public/gta6-intro/
     ├── desktop/
     └── mobile/
   ```

2. **Скопіюйте компонент**:
   Перенесіть `GTA6IntroAnimation.tsx`, `gta6-intro.css` та `index.ts` у вашу папку компонентів (наприклад `components/gta6-intro-animation/`).

3. **Використання**:
   ```tsx
   import { GTA6IntroAnimation } from "@/components/gta6-intro-animation";

   export default function HeroSection() {
     return (
       <div className="relative w-full h-screen bg-black overflow-hidden">
         {/* Головний контент сайту (показується після зникнення анімації) */}
         <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
           <h1 className="text-5xl font-bold">VICE CITY</h1>
           <p className="text-gray-400">Welcome to Leonida</p>
         </div>

         {/* Автономний інтро-оверлей */}
         <GTA6IntroAnimation
           basePath="/gta6-intro" // шлях до папки з assets у вашому public
           onAnimationEnd={() => console.log("Анімацію завершено")}
         />
       </div>
     );
   }
   ```

### Варіант Б: Інтеграція у чистий HTML / CSS / Vue / Svelte / Vanilla JS

1. Скопіюйте файл `gta6-intro.css` та папку `assets/`.
2. Скопіюйте блок `<div class="gta6-intro-container">...</div>` із файлу `demo.html`.
3. Усі шляхи до зображень підлаштуйте під вашу структуру папок.

---

## ⚙️ Параметри компонента (Props)

| Параметр | Тип | За замовчуванням | Опис |
|---|---|---|---|
| `basePath` | `string` | `"/assets/gta6-intro"` | Шлях до папки, де лежать підпапки `/desktop` та `/mobile` з ассетами |
| `className` | `string` | `""` | Додаткові CSS класи для контейнера |
| `onAnimationEnd` | `() => void` | `undefined` | Callback функція після завершення анімації та повного зникнення колажу |

---

## ⏱️ Таймінги анімації

- **0.00s – 1.70s**: Одночасний виліт 10 уламків з-за меж екрану (з кутовими поворотами `rotate` та зміщеннями `translate`), масштабування з 1.35x до 1.0x за кастомною кривою Безьє.
- **1.80s – 2.70s**: Прояв цілісної обкладинки та логотипу GTA VI (`gta6-fade-in`).
- **3.10s – 4.00s**: Загасання колажу (`gta6-collage-out`) та плавне відкриття контенту сайту.
- **Accessibility**: Підтримка `prefers-reduced-motion: reduce` (вимикає різкі зміщення для чутливих користувачів).
