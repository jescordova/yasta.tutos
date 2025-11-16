---
layout: ../../../layouts/MarkdownPostLayout.astro
title: "Obtenir quelques utilisateurs de l’API"
---


Pour récupérer une liste d'utilisateurs, il faut appeler https://api.github.com/users (sans nom à la fin). Mais voici les bonnes façons de faire :

```ts showLineNumbers wrap title="User.astro"
const response = await fetch("https://api.github.com/users")
const data = await response.json()
console.log(data) // Voir la structure dans le terminal
---

<pre>{JSON.stringify(data, null, 2)}</pre>
```
### 1. Récupérer les 5 premiers utilisateurs de GitHub

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

### 2. Récupérer les 5 premiers followers d'un utilisateur spécifique
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

### 3. Récupérer les 5 premiers repositories

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

### 4. Avec gestion d'erreur et loading
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
