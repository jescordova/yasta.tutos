---
layout: "../../../layouts/Layout.astro"
title: "Approche avec API REST Caching/Proxy"
---

```js showLineNumbers wrap title="github.json.ts"
// src/pages/api/github.json.ts
import type { APIRoute } from 'astro'

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

export const GET: APIRoute = async ({ request }) => {
  try {
    const response = await fetch("https://api.github.com/users/github")
    const data: GitHubUser = await response.json()
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Cache pour 1 heure
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
```
```js showLineNumbers wrap title="users.astro"
---
// Puis dans ton composant :
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

const response = await fetch("/api/github.json")
const user: GitHubUser = await response.json()
---

<div>
  <img src={user.avatar_url} alt={user.login} width="150" />
  <h1>{user.name}</h1>
</div>
```

### Recommendations
- __Pour du contenu statique__ : Utilise l'approche 1 (simple et rapide)
- __Pour du contenu dynamique__ : Utilise l'approche 3 ou 4 avec client:load
- __Pour des besoins de caching/rate limiting__ : Utilise l'approche 5 avec API route
- __Pour la sécurité__ : Attention, ce sont des données publiques. Si tu avais besoin d'un token API, passe par une route API côté serveur pour ne pas l'exposer.

Toutes ces méthodes bénéficient de la puissance d'Astro : le TypeScript est supporté nativenement, le rendu côté serveur est automatique, et tu peux combiner tranquillité et interactivité selon tes besoins !