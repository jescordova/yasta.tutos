---
layout: ../../../layouts/MarkdownPostLayout.astro
title: "Récupérer les données d'une API ?"

---

1. __On Utilise la fonction fetch_url()__ pour appeler _https://api.github.com/users/github_ en temp réel.
2. __On reservant une réponse JSON__ avec tout les données que tu as reçus.</li>
3. __Analiser la structur__ pour créer l'interface TypeScript prrécise.


Voici un extracte du code


```typescript showLineNumbers wrap title="users.json"
{
  "login": "github",
  "id": 9919,
  "name": "GitHub",
  "bio": "How people build software.",
  "public_repos": 528,
  "followers": 62793,
  "avatar_url": "https://avatars.githubusercontent.com/u/9919?v=4",
  "location": "San Francisco, CA",
  ...et 20+ autres propriétés
}
```

### Méthode 1 : Lire la documentation

```bash
# GitHub a une excellente documentation
curl https://api.github.com/users/github
```

### Méthode 2 : Utiliser un outil en ligne

* __Postman ou Insomnia__ : pour tester les API visuellement
* __Hoppscotch.io__ : gratuit et dans le navigateur

### Méthode 3 : La méthode du développeur rapide

```ts showLineNumbers wrap title="Users.astro"
// Dans ton composant Astro, temporairement :
---
const response = await fetch("https://api.github.com/users/github")
const data = await response.json()
console.log(data) // Voir la structure dans le terminal
---

<pre>{JSON.stringify(data, null, 2)}</pre>
```

### Méthode 4 : Générer TypeScript automatiquement

```bash
# Installer json-to-ts (globalement)
npm install -g json-to-ts

# Puis
curl https://api.github.com/users/github | json-to-ts
```

Cela génère automatiquement les interfaces TypeScript à partir du JSON réel.

La règle d'or : Toujours vérifier la structure réelle de l'API avant de coder. Les docs peuvent être obsolètes, mais le JSON ne ment pas.
