import { React, useState, useContext, useEffect, useRef } from 'react';
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
    const [search, setSearch] = useState(null)
    const [seconds, setSeconds] = useState(0)
    const timerId = useRef()

    const startTimer = () => {
        timerId.current = setInterval(() => {
          setSeconds(prev => prev + 1);
        }, 1000)
      }

      const stopTimer = () => {
        clearInterval(timerId.current);
        timerId.current = 0;
      }
    
      const resetTimer = () => {
        if (seconds) {
          setSeconds(0);
        }
      }

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
        setSearch();
        if(seconds === 5){
        resetTimer()
        incrementNum()
        }
        
    }, [number,seconds])

    const getInputValue = (event) => {

        if (event.target.value === user.name) {
            setSearch(event.target.value);
            console.log(userName.name, event.target.value);

        }
        else {
            console.log(toString(userName).name, event.target.value);
        }
    }

    

    return (
        <>
            <div>
            <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
                <h1>{seconds}</h1>
                <button onClick={decrementNum}>-</button>
                <h1>{number}</h1>
                <button onClick={incrementNum}>+</button>
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
                </>
                <input onChange={getInputValue} type="text" placeholder="User search" />
                <h1>{search}</h1>


            </div>
        </>
    );
}

