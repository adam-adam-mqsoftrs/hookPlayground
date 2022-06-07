import axios from 'axios';
import { useState } from 'react';


export default function User() {

    const [Users,setUsers] = useState(null)
    
    const getUser = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    getUser()
    
    return Users;
}