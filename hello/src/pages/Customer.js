import {useParams, Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
// import NotFound from '../components/NotFound';
import {baseUrl} from '../shared'

export default function Customer(){
    const {id} = useParams()
    const navigate = useNavigate()
    const [customer, setCustomer] = useState()
    const [notFound, setnotFound] = useState()

    useEffect(() => {
        console.log('useEffect')
        const url = baseUrl + 'api/customers/' + id 
        fetch(url)
        .then((response) => {
            if(response.status === 404){
                //redirect to a 404 page (new URL)
                // navigate('/404')

                //render a 404 component in this page
                setnotFound(true)
            }
            return response.json()
        })
        .then((data) => {
            setCustomer(data.customer)
        })
    }, [])

    return (
        <>
            {notFound ? <p>The customer with the id {id} was not found.</p>: null}
            {customer ? 
                <div>
                    <p>{customer.id}</p>
                    <p>{customer.name}</p>
                    <p>{customer.industry}</p>
                </div>
            : null}
            <button onClick={() => {
                const url = baseUrl + 'api/customers/' + id
                fetch(url, {method: 'DELETE', headers: {
                    'Content-Type': 'application/json'
                }})
                .then((response) => {
                    if(!response.ok){
                        throw new Error('Something went wrong')
                    }
                    navigate('/customers')
                    //assume things went well
                }).catch((e) => {
                    console.log(e)
                })
            }}>Delete</button>
            <br/>
            <Link to='/customers'>Go Back</Link>
        </>
    )
}