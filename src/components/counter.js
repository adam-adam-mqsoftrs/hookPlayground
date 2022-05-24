import { React, useState, useEffect } from 'react';
import axios from 'axios';

export default function Counter() {
    console.log('hello from counter')
    const [number, setNumber] = useState(1)
    const [user, setUser] = useState(null)
    const [maxNum, setMaxNum] = useState(null)

    function incrementNum() {
        if (number === maxNum.length)
            console.log('User ID cannot be greater than' + ' ' + maxNum.length)
        else
            setNumber(prevNumber => prevNumber + 1)
    }

    function decrementNum() {
        if (number === 1)
            console.log('User ID cannot be negative')
        else
            setNumber(prevNumber => prevNumber - 1)
    }

    const getUser = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
            setUser(response.data[number - 1]);
            setMaxNum(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, [number])

    return (
        <>
            <div>
                <button onClick={decrementNum}>-</button>
                <h1>{number}</h1>
                <button onClick={incrementNum}>+</button>
                {user && (
                    <>
                        <pre>Name: {JSON.stringify(user.name)}</pre>
                        <pre>E-Mail: {JSON.stringify(user.email)}</pre>
                        <pre>Address: {JSON.stringify(user.address.street)}</pre>
                    </>
                )}
            </div>
        </>
    );
}

