import { React, useState, useEffect, useRef } from 'react';
import { GetUser } from './utils/getUsers';
import { SrcUser } from './utils/search';


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
            var src = SrcUser(nameList, userNameList, search, i)

            if (src !== null) {
                setTargetUser(allUsers[src])
                resultRef.current.hidden = false
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