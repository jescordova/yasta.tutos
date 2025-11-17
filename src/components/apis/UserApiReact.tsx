// src/components/apis/UserApi.tsx

import { useState, useEffect } from 'react'


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

interface Props {   
    title: string;
    initialUser? : User;
}

export default function UserApi({ title, initialUser }: Props) {
    const [user, setUser] = useState<User | null>(initialUser || null);
    const [loading, setLoading] = useState(!initialUser);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Si on a déjà des données initiales, on ne recharge pas
        if (initialUser) return;

        fetch("https://jsonplaceholder.typicode.com/users/4")
        .then((res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then((data) => {
            setUser(data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        })
    }, [initialUser]);

    if (error) return <p className="text-red-500">Erreur : {error}</p>;
    if (loading) return <p className="text-gray-500">Chargement...</p>;
    if (!user) return <p className="text-gray-500">Aucune données</p>;

    return (
        <article>
            <h2 id="post-6" className="text-2xl font-bold">{title} <i className='text-red-500 bx bxs-x-square'>...à-revoir</i></h2>
            <hr />
                <div className="simple-card flex items-center gap-4 my-4 border p-4 rounded-lg shadow hover:shadow-lg transition-all">
                    <img src="https://as1.ftcdn.net/v2/jpg/14/40/53/46/1000_F_1440534662_Y2woXz2rkrCTYcMzKpdM3lt5hsUwTr5X.jpg" alt="users.name" className="w-30 h-30 rounded-full object-cover border" />
                    <div className="flex flex-col">
                        <h1 className="font-bold">{user.name}</h1>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                    </div>
                </div>
        </article>
    )
}
