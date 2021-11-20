import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useState } from 'react'
const jwt = require('jsonwebtoken')

const Dashboard = () => {
    const history = useHistory();
    const [quote, setquote] = useState()
    const [tempQuote, settempQuote] = useState()

    const populateQuote = async() => {
        const req = await fetch('http://localhost:5000/api/quote',{
            headers: {
                'x-access-token' : localStorage.getItem('token')
            }
        })
        const data = await req.json()
        if(data.status === 'ok'){
            setquote(data.quote)
        } else{
            alert(data.error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                history.replace('/login')
            }
            else{
                populateQuote();
            }
        }
    }, [])

    const updateQuote = async(e) => {
        e.preventDefault()
          const req = await fetch('http://localhost:5000/api/quote',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({
                quote: tempQuote,
            })
        })
        const data = await req.json()
        if(data.status === 'ok'){
            setquote(tempQuote)
            settempQuote('')
        } else{
            alert(data.error)
        }
    }

    return (
        <div>
            <h1>Your quote: {quote || 'No quote found'}</h1>
            <form onSubmit={updateQuote}>
                <input type="text" placeholder="Quote" value={tempQuote} onChange={(e) => settempQuote(e.target.value)}/>
                <input type="submit" value="update Quote" />
            </form>
        </div>
    )
}

export default Dashboard
