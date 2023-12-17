"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const UserForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = e => {
        const value = e.target.value
        const name = e.target.value

        setFormData((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setErrorMessage("")
        const res = await fetch("/api/Users",{
            method: "POST",
            body: JSON.stringify({formData}),
            "content-type":"application/json"
        })

        if(!res.ok){
            const response = await res.json()
            setErrorMessage(response.message)
        }else{
            router.refresh()
            router.push("/")
        }
    }

    return (
        <>
            <form action="" onSubmit={handleSubmit} method='post' className='flex flex-col gap-3 w-1/2 '>
                <h1>Create new User</h1>
                <label htmlFor="">Full Name</label>
                <input 
                    type="text" 
                    id='name' 
                    name='name' 
                    onChange={handleChange} 
                    require={true} 
                    value={formData.name} 
                    className='m-2 bg-slate-400 rounded'
                />

                <label htmlFor="">Email</label>
                <input 
                    type="text" 
                    id='email'
                    name='email' 
                    onChange={handleChange} 
                    require={true} 
                    value={formData.email} 
                    className='m-2 bg-slate-400 rounded'
                />
                
                <label htmlFor="">Password</label>
                <input 
                    type="password" 
                    id='password'
                    name='password'
                    onChange={handleChange} 
                    require={true} 
                    value={formData.password} 
                    className='m-2 bg-slate-400 rounded'
                />

                <input 
                    type="submit" 
                    value="Create user" 
                    className='bg-blue-300 hover:bg-blue-100' 
                />

                <p className='text-red-500'>{errorMessage}</p>

            </form>
        </>
    );
}

export default UserForm
