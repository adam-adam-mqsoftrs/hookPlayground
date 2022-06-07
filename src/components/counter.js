import { React, useState, useContext, useEffect, useRef } from 'react';
import { Context } from '/home/adam-ubuntu/reactHOOKS/playground/src/App.js'
import axios from 'axios';
import UserDetails from './userDetails.js'
import SearchUser from './searchUser.js';

export default function Counter() {

    const msg = useContext(Context)
    const [number, setNumber] = useState(1)
    const [user, setUser] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userStreet, setUserStreet] = useState(null)
    const [allUsers, setallUsers] = useState(null)
    const incrementButtonRef = useRef(null)
    const toggleRef = useRef(null)
    const [isChecked, setIsChecked] = useState(false)
    const [myInterval, setMyInterval] = useState(null)

    function incrementNum() {
        if (number === allUsers.length)
            console.log('User ID cannot be greater than', allUsers.length)

        setNumber(prevNumber => prevNumber + 1)
    }

    function decrementNum() {
        if (number === 1)
            console.log('User ID cannot be negative')

        setNumber(prevNumber => prevNumber - 1)
    }

    const getUser = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
            setUser(response.data[number - 1]);
            setUserName(response.data[number - 1].name);
            setUserEmail(response.data[number - 1].email);
            setUserStreet(response.data[number - 1].address.street);
            setallUsers(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, [number])


    useEffect(() => {
        if (isChecked === false) 
            clearInterval(myInterval)

        if (isChecked === true)
            setMyInterval(setInterval(() => 
            { incrementButtonRef.current.click() }, 1000))

    }, [isChecked])

    function handleChecked() {
        setIsChecked(toggleRef.current.checked)
    }


    return (
        <>
            <div>
                <h1>{msg}</h1>
                <label className="switch">
                    <input onClick={handleChecked} type="checkbox" ref={toggleRef} />
                    <span className="slider round"></span>
                </label>
                <br /><br />
                <button onClick={decrementNum}>-</button>
                <h1>{number}</h1>
                <button onClick={incrementNum} ref={incrementButtonRef}>+</button>
                <>{user &&
                    <Context.Provider
                        value={{
                            userName,
                            userEmail,
                            userStreet
                        }}>
                        <UserDetails />
                    </Context.Provider>

                }
                    <SearchUser />
                </>

            </div>
        </>
    );
}

