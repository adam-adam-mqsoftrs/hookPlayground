import { React, useState, useContext, useEffect, createContext } from 'react';
import { Context } from '/home/adam-ubuntu/reactHOOKS/playground/src/App.js'
import axios from 'axios';
import UserDetails from './userDetails.js'

export default function Counter() {

    const msg = useContext(Context)
    const [number, setNumber] = useState(1)
    const [user, setUser] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userStreet, setUserStreet] = useState(null)
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
            setUserName(response.data[number - 1].name);
            setUserEmail(response.data[number - 1].email);
            setUserStreet(response.data[number - 1].address.street);
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
                <h1>{msg}</h1>
                <button onClick={decrementNum}>-</button>
                <h1>{number}</h1>
                <button onClick={incrementNum}>+</button>
                <>
                    <Context.Provider
                        value={{
                            userName,
                            userEmail,
                            userStreet
                        }}>
                        <UserDetails />
                    </Context.Provider>
                </>
                <input type="text" placeholder="comoestas"></input>
            </div>
        </>
    );
}

