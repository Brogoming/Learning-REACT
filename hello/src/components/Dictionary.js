import {useState, useEffect} from 'react' //we waht useEffect defined in the function 

export default function Dictionary(){
    const [word, setWord] = useState('')

    useEffect(()=>{ //Hook allows you to perform side effects in your components. 
                    //Some examples of side effects are: fetching data, directly updating the DOM, and timers.
        console.log('State updated', word) 
    })

    return (
        <>
            <input type='text' onChange={(e) => {
                setWord(e.target.value)
            }}/>
            <h1>Let's get the definition for {word}</h1>
        </>
    )
}