import './App.css';
import Counter from './components/counter.js'
import {createContext, React} from 'react'

export const Context = createContext(null)

function App() {
    return (
    <>
        <Context.Provider value={"contextHello"}>
        <Counter/>
        </Context.Provider>
        
    </>)
}

export default App;