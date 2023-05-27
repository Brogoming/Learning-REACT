import {useState, useEffect} from 'react' //we waht useEffect defined in the function 

export default function Dictionary(){
    const [word, setWord] = useState('')
    const [word2, setWord2] = useState('')

    useEffect(()=>{ //Hook allows you to perform side effects in your components. 
                    //Some examples of side effects are: fetching data, directly updating the DOM, and timers.
        console.log('State updated ' + word) 
    }, [word])
    useEffect(()=>{
        console.log('State updated ' + word2) 
    }, [word2])
    //no dependency array - update for any state change
    //empty dependency array - execute once
    //nonempty dependency array - only executes when the items in the array are updated

    return (
        <>
            <input type='text' onChange={(e) => {
                setWord(e.target.value)
            }}/>
            <h1>Let's get the definition for {word}</h1>
            <input type='text' onChange={(e) => {
                setWord2(e.target.value)
            }}/>
            <h2>Let's get the definition for {word2}</h2>
        </>
    )
}