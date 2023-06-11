import {useParams, Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
// import NotFound from '../components/NotFound';
import {baseUrl} from '../shared'

export default function Customer(){
    const {id} = useParams()
    const navigate = useNavigate()
    const [customer, setCustomer] = useState()
    const [notFound, setnotFound] = useState()
    const [tempCustomer, setTempCustomer] = useState()
    const [changed, setChanged] = useState(false)

    useEffect(() => {
        if(!customer) return
        if(!customer) return
        let equal = true
        if(customer.name !== tempCustomer.name) equal = false
        if(customer.industry !== tempCustomer.industry) equal = false
        if(equal) setChanged(false)
    })

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
            setTempCustomer(data.customer)
        })
    }, [])

    function updateCustomer(){
        const url = baseUrl + 'api/customers/' + id
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempCustomer)
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setCustomer(data.customer)
            setChanged(false)
            // console.log(data)
        })
        .catch()
    }

    return (
        <>
            {notFound ? <p>The customer with the id {id} was not found.</p>: null}
            {customer ? 
                <div>
                    {/* <p className='my-2 block px-2' type="text">ID: {tempCustomer.id} </p> */}
                    <input className='m-2 block px-2' type="text" value={tempCustomer.name} onChange={(e) => {
                        setChanged(true)
                        setTempCustomer({...tempCustomer, name: e.target.value}) //the change is delayed
                    }}/>
                    <input className='m-2 block px-2' type="text" value={tempCustomer.industry} onChange={(e) => {
                        setChanged(true)
                        setTempCustomer({...tempCustomer, industry: e.target.value})
                    }}/>
                    {changed ? <>
                        <button className='mx-2' onClick={(e) => {
                            setTempCustomer({...customer})
                            setChanged(false)
                        }}>Cancel</button> 
                        <button className='mx-2' onClick={updateCustomer}>Save</button>
                    </> : null}
                </div>
            : null}
            <button className='mx-2 block' onClick={() => {
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
            <Link className='mx-2' to='/customers'>Go Back</Link>
        </>
    )
}