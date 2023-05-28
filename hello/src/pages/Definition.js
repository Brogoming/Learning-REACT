import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import NotFound from '../components/NotFound'

export default function Definition(){
    const [aWord, setAWord] = useState('')
    let {search} = useParams()
    const navigate = useNavigate()
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + search) //fetches a api
            .then((response) => {
                if(response.status === 404){
                    console.log(response.status) //tells us the status of the page
                    // navigate('/404')
                    setNotFound(true)
                }
                return response.json()
            })
            .then((data) => {
                setAWord(data[0])
                console.log(data[0])
            })
    }, [])

    if(notFound === true){
        return (
            <>
                <NotFound />
                {/* <Link to='/dictionary'>Search Another</Link> // I linke the button better*/ }
                <button onClick={() => {
                    navigate('/dictionary') //making replace true replaces the current spot in the history
                }}>Dictionary</button>
            </>
        )
    }
    return (
        <>

            {aWord? 
                <>
                <h1>Here is the definition for {aWord.word}</h1>
                {aWord.meanings.map((meaning) => {
                    return (
                        <p key={uuidv4()}>
                            {meaning.partOfSpeech + ': '}
                            {meaning.definitions[0].definition}
                        </p>
                    )
                })}</>
                : null}
        </>
    )
}