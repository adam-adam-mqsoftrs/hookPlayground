import { React, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GetUser } from './getUsers';


export default function SearchUser() {

    const inputRef = useRef(null)
    const resultRef = useRef(null)
    const [search, setSearch] = useState(null)
    const [targetUser, setTargetUser] = useState(null)
    const [allUsers, setallUsers] = useState(null)

    useEffect(() => {
        GetUser().then(data => {
            setallUsers(data)
        })
        .catch(err => console.log(err))
    }, [])
    
    function handleChanged() {

        setSearch(inputRef.current.value)

        for (let i = 0; i < allUsers.length; i++) {

            var nameList = allUsers[i].name.toLowerCase()
            var userNameList = allUsers[i].username.toLowerCase()

            if (nameList.slice(0, 2) === search?.toLowerCase() || nameList === search?.toLowerCase()) {
                setTargetUser(allUsers[i])
                resultRef.current.hidden = false
            }
            else if (userNameList.slice(0, 2) === search?.toLowerCase() || userNameList === search?.toLowerCase()) {
                setTargetUser(allUsers[i])
                resultRef.current.hidden = false
            }
            else if (search?.length === 1) {
                resultRef.current.hidden = true
            }

        }
    }
    return (
    <>
        <input type="text" onChange={handleChanged} ref={inputRef} placeholder="User search" />
        <h1 hidden={true} ref={resultRef}>
            Username <p>{JSON.stringify(targetUser?.username)}</p>
            Name <p>{JSON.stringify(targetUser?.name)}</p>
            City <p>{JSON.stringify(targetUser?.address.city)}</p>
            Company Name  <p>{JSON.stringify(targetUser?.company.name)}</p>
        </h1>
    </>
    );
}