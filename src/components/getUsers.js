import axios from 'axios';

// export default function User() {

//     const [Users, setUsers] = useState(null)

//     const getUser = async () => {
//         try {
//             const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
//             setUsers(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     getUser()

//     return Users;
// }

// export const GetUser = () => {

//     let URL = 'https://jsonplaceholder.typicode.com/users'

//     const promise = axios.get(URL)

//     const dataPromise = promise.then((response) => response.data)
    
//     return dataPromise
// }

export async function GetUser() {
    let URL = 'https://jsonplaceholder.typicode.com/users'
    const response = await axios.get(URL)
    return response.data
}