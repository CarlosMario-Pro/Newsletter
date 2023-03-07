import React, { useState } from 'react';
import axios from "axios";


export default function Admin () {
    const [users, setUsers] = useState([]);
    async function handleClick(e) {  
        e.preventDefault();
        const { data } = await axios.get("http://localhost:3001/user");
        setUsers(data);
    };


    return (
        <div>
            <button onClick={handleClick}>Obtener Usuarios</button>
            {users ?.map((user, id)=>(
                <div key={ user._id }>
                    <p>Usuario: { id+1 }</p>
                    <h1>{ user.name }</h1>
                    <p>{ user.email }</p>
                </div>
            ))}
        </div>
    );
};