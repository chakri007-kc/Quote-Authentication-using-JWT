import React from 'react'
import { useState } from 'react'


const Register = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    
    const loginUser = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/login',{
            method: 'POST',
            headers: {  
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({ 
                email,
                password,
            }),
        })
        const data = await response.json();

        if(data.user) {
            localStorage.setItem('token', data.user)
            alert('Login successful')
            window.location.href ='/dashboard'
        } else{
            alert('Please check your username and password')
        }

        console.log(data);
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input type="email" value={email} placeholder="email" onChange={(e)=> setemail(e.target.value)}/> <br/>
                <input type="password" value={password} placeholder="password" onChange={(e)=> setpassword(e.target.value)}/> <br/>
                <input type="submit" value="Login" />

            </form>
        </div>
    )
}

export default Register
