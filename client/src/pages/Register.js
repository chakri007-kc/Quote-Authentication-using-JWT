import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'


const Register = () => {

    const history = useHistory()

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    
    const registerUser = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/register',{
            method: 'POST',
            headers: {  
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })
        const data = await response.json();
        // console.log(data);.
        if(data.status === 'ok'){
            history.push('/login')
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input type="text" value={name} placeholder="name" onChange={(e)=> setname(e.target.value) }/> <br/>
                <input type="email" value={email} placeholder="email" onChange={(e)=> setemail(e.target.value)}/> <br/>
                <input type="password" value={password} placeholder="password" onChange={(e)=> setpassword(e.target.value)}/> <br/>
                <input type="submit" value="Register" />

            </form>
        </div>
    )
}

export default Register
