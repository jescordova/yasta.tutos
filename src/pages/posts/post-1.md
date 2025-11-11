---
---

## 🎯 Chapitre 1 : Installation et Premier Projet
### 1.1 Installation d'Astro et Tailwind avec Vite

```bash
pnpm create astro@latest name-of-your-project

# Options recommandées :
# - Template: Empty
# - TypeScript: Yes (Strict)
# - Install dependencies: Yes
# - Git repository: Yes

cd name-of-your-project
```
### 1.2 Installation de TailwindCSS
```bash
pnpm astro add tailwindcss
```
### 1.3 Lancement du serveur de développement
```bash
pnpm dev
```
### 1.4 Structure du projet
```bash
name-of-your-project/
├── public/              # Assets statiques
├── src/
│   ├── pages/           # Pages de ton site
│   │   └── index.astro  # Page d'accueil (/)
│   ├── layouts/         # Layouts réutilisables
│   └── components/      # Composants réutilisables
│   ├── styles/          # Style de ton site
│   │   └── global.css   # Fichier global css (/)
├── .gitignore
├── astro.config.mjs     # Configuration Astro
└── package.json
└── pnpm-lock.yaml
└── README.md
└── tsconfig.json
```
<hr>