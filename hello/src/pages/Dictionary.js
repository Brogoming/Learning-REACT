import {useState, useEffect} from 'react' //we waht useEffect defined in the function 
import { useNavigate } from 'react-router-dom'
export default function Dictionary(){
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
        <>
            <input type='text' onChange={(e) => {
                setWord(e.target.value)
            }}/>
            <button onClick={() => {
                navigate('/definition/' + word, {replace: false}) //making replace true replaces the current spot in the history
            }}>Search</button>
        </>
    )
}