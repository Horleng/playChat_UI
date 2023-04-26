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
            <div className='animate-formAnimation bg-white dark:bg-slate-700 md:mt-[5vh] md:rounded-lg lg:w-[50%] md:w-[60%] sm:w-[80%] w-[96%] mx-auto p-10 md:shadow-[0px_0px_10px_rgba(0,0,0,0.2)] transition-all duration-200'>
                <h1 className='text-[30px] font-bold flex justify-center'>
                    Login
                </h1>
                <div className='mt-10 lg:w-[60%] w-full mx-auto'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email'  onKeyPress={handlePressKey}
                             value={email} onChange={(e)=>setEmail(e.target.value)}
                            placeholder='example@gmail.com' 
                            className='border-2 focus:ring-2 focus:ring-green-400'/>
                        </div>
                        <div className='flex flex-col gap-2 mt-4'>
                            <label htmlFor="password">Password</label>
                            <span className='relative'>
                                <input type="password" id='password' onKeyPress={handlePressKey}
                                    value={password} onChange={(e)=>setPassword(e.target.value)}
                                    placeholder='your password' 
                                    className='border-2 focus:ring-2 focus:ring-green-400'/>
                                <span onClick={()=>setShowPassword(!showPassword)} 
                                className='absolute flex justify-center items-center right-2 top-[6px] cursor-pointer w-[30px] h-[30px] hover:bg-gray-300 active:bg-gray-300 rounded-full'>
                                    {
                                        showPassword?
                                        <AiFillEye fill='#425C81' size="25px"/>:
                                        <AiFillEyeInvisible fill='#425C81' size="25px"/>
                                    }
                                </span>
                            </span>
                        </div>
                        <div className='flex justify-between items-center mt-5'>
                            <div className='flex gap-2'>
                                <span>
                                    <input type="checkbox" id='check' defaultChecked  onChange={(e)=>setCheckbox(e.target.checked)}/>
                                </span>
                                <label htmlFor="check" className='text-sm'>Remember me</label>
                            </div>
                            <span>
                                <Link to="/auth/recover">
                                    <p className='text-blue-700 underline text-sm cursor-pointer'>forgot password?</p>
                                </Link>
                            </span>
                        </div>
                        <button  className='bg-blue-700 hover:bg-blue-600 text-gray-100 mt-10 w-[100px] py-2' onClick={()=>User()}>{loading?<div className='loading'></div>:<span>Login</span>}</button>
                        <span className='flex items-center gap-1 mt-5'>
                            <p className='text-sm'>Not account?</p><Link to="/auth/signup" className='text-sm underline text-blue-600'>Create one</Link>
                        </span>
                    </div>
            </div>
        </>
    );
}

export default Login;
