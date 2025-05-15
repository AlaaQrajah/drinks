# TheCocktailDB Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![Vercel](https://img.shields.io/badge/Live%20Demo-Vercel-blue)](https://drinks-six-alpha.vercel.app/)

## 🚀 Live Demo

Try the app online: [https://drinks-six-alpha.vercel.app/](https://drinks-six-alpha.vercel.app/)

## Requirements

- **Node.js** >= 18
- **npm** >= 9
- Modern browser (Chrome, Firefox, Edge, Safari)

## Features

- 🌍 **Multi-language support** (Arabic & English)
- 🔍 **Search and filter** cocktails by name, category, glass, ingredient, or alcohol type
- 🥃 **Drink details** with ingredients, instructions, and similar drinks
- 📝 **Application form** with multi-step validation and beautiful UI
- 🧩 **Reusable components** (Card, CardList, Form, Navbar, Footer, etc.)
- 🎨 **Modern, responsive, and animated UI**
- 🚫 **Custom 404 error page**
- ⚡ **Fast development with Vite**

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Project Structure

```
TheCocktailDB/
├── public/
│   ├── assets/           # Images (logo, 404 illustration, etc.)
│   ├── components/       # Shared UI components (FormInput, FormButton, etc.)
│   └── locales/          # Translation files (ar, en)
├── src/
│   ├── components/       # Main app components (pages, layout, etc.)
│   ├── styles/           # CSS files (modular, variables, animations)
│   ├── services/         # API client (axios)
│   ├── Router/           # App routing
│   ├── Layout/           # Layout wrappers
│   └── i18n.js           # i18next configuration
├── package.json
├── README.md
└── ...
```

## Main Technologies

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)
- [Axios](https://axios-http.com/)
- [TheCocktailDB API](https://www.thecocktaildb.com/api.php)

## Internationalization (i18n)

- All UI and form texts are fully translatable.
- Translation files are in `public/locales/ar/translation.json` and `public/locales/en/translation.json`.
- Language can be switched instantly from the Navbar.

## Customization & Theming

- All colors, fonts, and spacing are managed via CSS variables in `src/styles/variables.css`.
- Animations and transitions are defined in `src/styles/animations.css`.
- Easily extendable for new features or languages.

## Folder Highlights

- `public/components/`: Shared UI elements (inputs, buttons, error page, etc.)
- `src/components/pages/`: Main pages (Home, ApplicationForm, DrinkDetails, etc.)
- `src/styles/`: All CSS, including responsive and RTL support
- `src/services/api-client.js`: Axios instance for TheCocktailDB API

## How to Add a New Language

1. Copy `public/locales/en/translation.json` to a new folder (e.g., `fr` for French).
2. Translate all keys.
3. Add the language code to `supportedLngs` in `src/i18n.js`.

## 🤝 Contribution

We welcome contributions! To contribute:

1. **Fork** the repository
2. **Create a new branch** for your feature or fix
3. **Commit** your changes with clear messages
4. **Push** to your fork and open a **Pull Request**
5. For bugs or suggestions, open an **Issue**

**Example:**

```bash
# Clone your fork
# git checkout -b feature/my-feature
# Make changes, commit, push, then open a PR
```

## ❓ FAQ

**Q: How do I switch the language?**
A: Use the language button in the Navbar to toggle between Arabic and English instantly.

**Q: Where can I add new translations?**
A: In `public/locales/ar/translation.json` or `public/locales/en/translation.json`.

**Q: How do I deploy the app?**
A: You can deploy to Vercel, Netlify, or any static hosting. Just build with `npm run build` and upload the `dist` folder.

**Q: How do I add a new page?**
A: Create a new component in `src/components/pages/` and add a route in `src/Router/Router.jsx`.

## Credits

- UI/UX: Inspired by modern cocktail and recipe apps.
- Illustrations: [Storyset](https://storyset.com/)
- Data: [TheCocktailDB API](https://www.thecocktaildb.com/api.php)

---

## موجز بالعربية

تطبيق ويب حديث لاستكشاف وصفات الكوكتيل مع دعم كامل للغة العربية والإنجليزية. يمكنك البحث، التصفية، عرض التفاصيل، وتقديم طلبات عبر فورم متقدم. جميع النصوص قابلة للترجمة، والتصميم متجاوب وجذاب.

---

Feel free to contribute or customize for your own cocktail project!
