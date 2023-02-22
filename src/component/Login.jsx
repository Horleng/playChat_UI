import React, { useState,useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Context} from "../Context/Context"
import { url } from '../base_url';
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai"
const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [checkbox,setCheckbox] = useState(true);
    const [showPassword,setShowPassword] = useState(false);
    const {setUser,loading,setLoading} = useContext(Context);
    const navigate = useNavigate();
    const User = async()=>{
        setLoading(true);
        await axios.post(`${url}/auth/login`,{email,password})
        .then(res=>{
            setLoading(false);
            setUser(res.data.data);
            alert(res.data.message);
            if(checkbox)
                localStorage.setItem("token",res.data.token);
            navigate('/');
        }).catch(err=>{
            setLoading(false);
            if(err.response) alert(err.response.data.message);
        });
    }
    const handlePressKey = (event) => {
        if(event.key ==="Enter") User();
    }
    useEffect(()=>{
        const password = document.getElementById("password");
        if(showPassword) {
            password.setAttribute("type", "text");
        }
        else password.setAttribute("type","password");
    },[showPassword]);
    return (
        <>
            <div className='bg-gray-300 dark:bg-slate-700 h-screen md:pt-16 pt-10 container flex flex-col items-center w-full mx-auto'>
                <h1 className='flex justify-center text-xl font-bold  bg-gradient-to-r from-[#49C5F6] to-[#FF2AEf] bg-clip-text text-transparent'>Login</h1>
                <div className='md:mt-8 mt-5 lg:w-[50%] md:w-[70%] w-[90%]'>
                    <div className='lg:w-[50%] md:w-[70%] w-[100%]  flex flex-col gap-5 mx-auto'>
                        <span className='flex flex-col'>
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email'  onKeyPress={handlePressKey}
                             value={email} onChange={(e)=>setEmail(e.target.value)}
                            placeholder='example@gmail.com' 
                            className='border border-orange-500 outline-violet-500 '/>
                        </span>
                        <span className='flex flex-col'>
                            <label htmlFor="password">Password</label>
                            <span className='relative'>
                                <input type="password" id='password' onKeyPress={handlePressKey}
                                value={password} onChange={(e)=>setPassword(e.target.value)}
                                placeholder='your password' 
                                className='border border-orange-500 outline-violet-500 w-full'/>
                                <span onClick={()=>setShowPassword(!showPassword)} 
                                className='absolute flex justify-center items-center right-2 top-1 w-[30px] h-[30px] hover:bg-gray-300 active:bg-gray-300 rounded-full'>
                                    {
                                        showPassword?
                                        <AiFillEye fill='#425C81' size="25px"/>:
                                        <AiFillEyeInvisible fill='#425C81' size="25px"/>
                                    }
                                </span>
                            </span>
                        </span>
                        <span className='flex justify-between items-center'>
                            <span className='flex gap-2 items-center'>
                                <input type="checkbox" id='check' defaultChecked  onChange={(e)=>setCheckbox(e.target.checked)}/>
                                <label htmlFor="check">Remember me</label>
                            </span>
                            <Link to="/auth/recover">
                                <p className='text-blue-700 underline text-sm cursor-pointer'>forgot password?</p>
                            </Link>
                        </span>
                        <button  className='bg-blue-700 hover:bg-blue-600' onClick={()=>User()}>{loading?<div className='loading'></div>:<span>Login</span>}</button>
                        <span className='flex items-center gap-1 '>
                            <p className='text-sm'>Not account?</p><Link to="/auth/signup" className='text-sm underline text-blue-600'>Create one</Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
