import {useState, useEffect} from 'react' //we waht useEffect defined in the function 
import { useNavigate } from 'react-router-dom'

export default function DefSearch(){
    const [word, setWord] = useState('')
    const navigate = useNavigate()

    // useEffect(()=>{ //Hook allows you to perform side effects in your components. 
    //                 //Some examples of side effects are: fetching data, directly updating the DOM, and timers.
    //     console.log('State updated ' + word) 
    // }, [word])
    //no dependency array - update for any state change
    //empty dependency array - execute once
    //nonempty dependency array - only executes when the items in the array are updated

    return (
        <form className="flex space-between space-x-2 max-w-[300px]" onSubmit={() =>{
            navigate('/dictionary/' + word, {replace: false}) //making replace true replaces the current spot in the history
        }}>
            <input className="shrink min-w-0 px-2 py-1 rounded" placeholder="term..." type='text' onChange={(e) => {
                setWord(e.target.value)
            }}/>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-2 py-1 rounded">Search</button>
        </form>
    )
}