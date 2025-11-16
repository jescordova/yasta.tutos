---
layout: ../../../layouts/MarkdownPostLayout.astro
title: "API REST Erreurs & Loading"
---

### Approche avec gestion d'erreurs et loading state.
```js ts showLineNumbers wrap title="User.astro" 
---
interface GitHubUser {
  login: string
  name: string
  bio: string
  public_repos: number
  followers: number
  avatar_url: string
  html_url: string
  location: string
}

let user: GitHubUser | null = null
let error: string | null = null

try {
  const response = await fetch("https://api.github.com/users/github")
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`)
  }
  user = await response.json()
} catch (e) {
  error = e instanceof Error ? e.message : "Erreur inconnue"
}
---

{error ? (
  <p style="color: red;">Erreur: {error}</p>
) : user ? (
  <div class="github-card">
    <img src={user.avatar_url} alt={user.login} width="150" />
    <h1>{user.name}</h1>
    <p>{user.bio}</p>
    <p>📦 {user.public_repos} repos</p>
  </div>
) : (
  <p>Chargement...</p>
)}
```