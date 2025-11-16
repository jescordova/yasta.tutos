---
layout: ../../../layouts/MarkdownPostLayout.astro
title: "Approche côté serveur la plus simple"
---

C'est la méthode recommandée pour les données publiques qui ne changent pas souvent. Astro exécute ce code uniquement au moment du build.

```js ts showLineNumbers wrap title="User.astro" 
---
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

const users = await fetch("https://jsonplaceholder.typicode.com/users/2").then((res) => res.json());
// console.log(users);
---

<article class="simple-api">
    <h2 class="text-2xl font-bold">{title}</h2>
    <hr>
    <div class="simple-card flex items-center gap-4 my-4 border p-4 rounded-lg shadow hover:shadow-lg transition-all">
        <img src={users.avatar} alt="users.name" class="w-30 h-30 rounded-full object-cover border">
        <div class="flex flex-col">
            <p class="font-bold">{users.name}</p>
            <p>{users.email}</p>
            <p>{users.phone}</p>
        </div>
    </div>
</article>
```