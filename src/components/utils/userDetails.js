import { Context } from '/home/adam-ubuntu/reactHOOKS/playground/src/App.js'
import { React, useContext } from 'react';

export default function UserDetails() {

    const msg = useContext(Context)

    return (
        <>
            <div>
                <pre>Name: {JSON.stringify(msg.userName)}</pre>
                <pre>E-Mail: {JSON.stringify(msg.userEmail)}</pre>
                <pre>Address: {JSON.stringify(msg.userStreet)}</pre>
            </div>
        </>
    );


}