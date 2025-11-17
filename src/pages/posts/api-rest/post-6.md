---
layout: ../../../layouts/MarkdownPostLayout.astro
title: "Approche avec composant framework (React, Vue, etc.)"
---

Si tu utilises React avec Astro :
```ts showLineNumbers wrap title="User.astro" 
---
// src/components/GitHubProfileReact.tsx
import { useState, useEffect } from 'react'

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

interface Props {
  initialUser?: GitHubUser
}

export default function GitHubProfile({ initialUser }: Props) {
  const [user, setUser] = useState<GitHubUser | null>(initialUser || null)
  const [loading, setLoading] = useState(!initialUser)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Si on a déjà des données initiales, on ne recharge pas
    if (initialUser) return
    
    fetch("https://api.github.com/users/github")
      .then(res => {
        if (!res.ok) throw new Error(`Erreur: ${res.status}`)
        return res.json()
      })
      .then(data => {
        setUser(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (error) return <p style={{ color: 'red' }}>Erreur: {error}</p>
  if (loading) return <p>Chargement...</p>
  if (!user) return <p>Aucune donnée</p>

  return (
    <div className="github-card">
      <img src={user.avatar_url} alt={user.login} width={150} />
      <h1>{user.name}</h1>
      <p><strong>@{user.login}</strong></p>
      <p>{user.bio}</p>
      <p>📍 {user.location}</p>
      <p>📦 {user.public_repos} repos</p>
      <p>👥 {user.followers} followers</p>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        Voir sur GitHub
      </a>
    </div>
  )
}
---

// Puis dans ta page Astro :
import GitHubProfile from './GitHubProfileReact.tsx'

<GitHubProfile client:load />
```