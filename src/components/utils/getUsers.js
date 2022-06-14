import axios from 'axios';

export async function GetUser() {
    let URL = 'https://jsonplaceholder.typicode.com/users'
    const response = await axios.get(URL)
    return response.data
}