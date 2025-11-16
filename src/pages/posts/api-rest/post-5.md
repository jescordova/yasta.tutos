---
layout: ../../../layouts/MarkdownPostLayout.astro
title: "Aproche côté client avec interactivité"
---

Si tu veux que les données se mettent à jour après le chargement de la page ou gérer des interactions :

```js ts showLineNumbers wrap title="User.astro" 
---
// Le code ici s'exécute côté serveur au build
interface GitHubUser {
  login: string
  name: string
  bio: string
  public_repos: number
  followers: number
  avatar_url: string
  html_url: string
}

// Tu peux fournir des données initiales si tu veux
const initialData: GitHubUser = {
  login: "github",
  name: "GitHub",
  bio: "How people build software.",
  public_repos: 528,
  followers: 62793,
  avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
  html_url: "https://github.com/github"
}
---

<div id="github-profile">
  <p>Chargement...</p>
</div>

<script define:vars={{ initialData }}>
  // Ce code s'exécute côté client
  const profileDiv = document.getElementById('github-profile')
  
  // Utiliser les données initiales immédiatement
  renderProfile(initialData)
  
  // Puis rafraîchir avec les données réelles
  fetch("https://api.github.com/users/github")
    .then(res => res.json())
    .then(data => renderProfile(data))
    .catch(err => {
      profileDiv.innerHTML = `<p style="color: red;">Erreur: ${err.message}</p>`
    })
  
  function renderProfile(user: any) {
    profileDiv.innerHTML = `
      <img src="${user.avatar_url}" alt="${user.login}" width="150" />
      <h1>${user.name}</h1>
      <p>${user.bio}</p>
      <p>📦 ${user.public_repos} repositories</p>
      <p>👥 ${user.followers} followers</p>
    `
  }
</script>
```