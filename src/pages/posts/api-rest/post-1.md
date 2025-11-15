---
layout: ../../../layouts/MarkdownPostLayout.astro
title: "Comme obtenir la structture réelle de l'API ?"

---

1. __On Utilisant la fonction fetch_url()__ pour appeler _https://api.github.com/users/github_ en temp réel.
2. __On reservant une réponse JSON__ avec tout les données que tu as reçus.</li>
3. __Analiser la structur__ pour créer l'interface TypeScript prrécise.


Voici un extracte du code


```typescript showLineNumbers wrap title="post-1.md"
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

## Méthode 1 : Lire la documentation

```bash
# GitHub a une excellente documentation
curl https://api.github.com/users/github
```

## Méthode 2 : Utiliser un outil en ligne

* __Postman ou Insomnia__ : pour tester les API visuellement
* __Hoppscotch.io__ : gratuit et dans le navigateur

## Méthode 3 : La méthode du développeur rapide

```ts showLineNumbers wrap title="post-1.md"
// Dans ton composant Astro, temporairement :
---
const response = await fetch("https://api.github.com/users/github")
const data = await response.json()
console.log(data) // Voir la structure dans le terminal
---

<pre>{JSON.stringify(data, null, 2)}</pre>
```

## Méthode 4 : Générer TypeScript automatiquement

```bash
# Installer json-to-ts (globalement)
npm install -g json-to-ts

# Puis
curl https://api.github.com/users/github | json-to-ts
```

Cela génère automatiquement les interfaces TypeScript à partir du JSON réel.

La règle d'or : Toujours vérifier la structure réelle de l'API avant de coder. Les docs peuvent être obsolètes, mais le JSON ne ment pas.

# Obtenir plusieurs utilisateurs de l'API GitHub

Pour récupérer une liste d'utilisateurs, il faut appeler https://api.github.com/users (sans nom à la fin). Mais voici les bonnes façons de faire :

```ts showLineNumbers wrap title="post-1.md"
const response = await fetch("https://api.github.com/users")
const data = await response.json()
console.log(data) // Voir la structure dans le terminal
---

<pre>{JSON.stringify(data, null, 2)}</pre>
```
## 1. Récupérer les 5 premiers utilisateurs de GitHub

```ts showLineNumbers wrap title="post-1.md"
---
interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
}

// Récupère tous les utilisateurs (30 par défaut)
const response = await fetch("https://api.github.com/users")
const users: GitHubUser[] = await response.json()

// Prend seulement les 5 premiers
const firstFiveUsers = users.slice(0, 5)
---

<h1>Les 5 premiers utilisateurs GitHub</h1>
<ul>
  {firstFiveUsers.map(user => (
    <li>
      <img src={user.avatar_url} alt={user.login} width="50" />
      <a href={user.html_url} target="_blank">@{user.login}</a>
    </li>
  ))}
</ul>
```

## 2. Récupérer les 5 premiers followers d'un utilisateur spécifique
```ts showLineNumbers wrap title="post-1.md"
---
interface GitHubUser {
  login: string
  avatar_url: string
}

// Récupère les followers de l'utilisateur "github"
const response = await fetch("https://api.github.com/users/github/followers?per_page=5")
const followers: GitHubUser[] = await response.json()
---

<h1>5 followers de @github</h1>
<ul>
  {followers.map(follower => (
    <li>
      <img src={follower.avatar_url} alt={follower.login} width="40" />
      {follower.login}
    </li>
  ))}
}
</ul>
```

## 3. Récupérer les 5 premiers repositories

``` ts showLineNumbers wrap title="post-1.md"
---
interface GitHubRepo {
  name: string
  description: string | null
  stargazers_count: number
}

// Récupère les repos de @github
const response = await fetch("https://api.github.com/users/github/repos?per_page=5&sort=updated")
const repos: GitHubRepo[] = await response.json()
---

<h1>5 derniers repos de @github</h1>
{repos.map(repo => (
  <div>
    <h3>{repo.name}</h3>
    <p>{repo.description || 'Pas de description'}</p>
    <p>⭐ {repo.stargazers_count} stars</p>
  </div>
))}
```

## 4. Avec gestion d'erreur et loading
```ts showLineNumbers wrap title="post-1.md"
---
interface GitHubUser {
  login: string
  avatar_url: string
}

let users: GitHubUser[] = []
let error: string | null = null

try {
  const response = await fetch("https://api.github.com/users")
  if (!response.ok) throw new Error(`HTTP: ${response.status}`)
  const allUsers = await response.json()
  users = allUsers.slice(0, 5) // Prendre juste 5
} catch (e) {
  error = e instanceof Error ? e.message : "Erreur"
}
---

{error ? (
  <p style="color: red;">Erreur: {error}</p>
) : (
  <div>
    <h2>5 premiers utilisateurs</h2>
    {users.map(user => (
      <div key={user.id}>
        <img src={user.avatar_url} alt={user.login} width="60" />
        <p>{user.login}</p>
      </div>
    ))}
  </div>
)}
```

Le secret : utilise toujours ?per_page=5 dans l'URL quand c'est possible ! Ça limite directement côté API au lieu de récupérer 30 résultats pour en utiliser 5.