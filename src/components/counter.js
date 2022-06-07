import { React, useState, useContext, useEffect, useRef } from 'react';
import { Context } from '/home/adam-ubuntu/reactHOOKS/playground/src/App.js'
import axios from 'axios';
import UserDetails from './userDetails.js'

export default function Counter() {

    const msg = useContext(Context)
    const [number, setNumber] = useState(1)
    const [user, setUser] = useState(null)
    const [targetUser, setTargetUser] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userStreet, setUserStreet] = useState(null)
    const [maxNum, setMaxNum] = useState(null)
    const [search, setSearch] = useState(null)
    const timerId = useRef(null)
    const inputRef = useRef(null)
    const toggleRef = useRef(null)
    const resultRef = useRef(null)
    const [isChecked, setIsChecked] = useState(null)
    var timer

    function incrementNum() {
        if (number === maxNum.length)
            console.log('User ID cannot be greater than', maxNum.length)
        else {
            setNumber(prevNumber => prevNumber + 1)

        }
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

    useEffect(() => {
        if (isChecked === true) {
            timer = setInterval(() => { timerId.current.click() }, 1000)

            console.log(isChecked)
        }
        else if (isChecked === false) {
            console.log(isChecked)
            clearInterval(timer)
        }
    }, [isChecked])

    useEffect(() => {

    }, [search])

    function handleChecked() {
        setIsChecked(toggleRef.current.checked)
    }

    function handleChanged() {
        setSearch(inputRef.current.value)
        for (let i = 0; i < maxNum.length; i++) {

            let nameList = maxNum[i].name.toLowerCase()
            var userNameList = maxNum[i].username.toLowerCase()

            if (nameList.slice(0, 2) === search?.toLowerCase() || nameList === search?.toLowerCase()) {
                setTargetUser(maxNum[i])
                resultRef.current.hidden = false
            }
            else if (userNameList.slice(0, 2) === search?.toLowerCase() || userNameList === search?.toLowerCase()) {
                setTargetUser(maxNum[i])
                resultRef.current.hidden = false
            }

        }
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
                <button onClick={incrementNum} ref={timerId}>+</button>
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
                    <input type="text" onChange={handleChanged} ref={inputRef} placeholder="User search"/>
                    <h1 hidden={true} ref={resultRef}>
                        Username {JSON.stringify(targetUser?.username)}<br />
                        Name {JSON.stringify(targetUser?.name)}<br />
                        City {JSON.stringify(targetUser?.address.city)}<br />
                        ZipCode {JSON.stringify(targetUser?.address.zipcode)}<br />
                    </h1>
                </>

            </div>
        </>
    );
}

