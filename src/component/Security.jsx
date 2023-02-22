import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai"
import { url } from '../base_url';
const Security = (props) => {
    const [viewPass,setViewPass] = useState(false);
    const [loading,setLoading] = useState(false);
    const [email,setEmail] = useState(props.email);
    const [password,setPassword] = useState("");
    const changeEmailAndPAssword = async()=>{
        setLoading(true);
        await axios.post(`${url}/auth/changeEmailAndPassword?id=${props.id}`,{email,password})
        .then(res=>{
            setLoading(false);
            localStorage.setItem("token",res.data.token);
            alert(res.data.message);
        }).catch(err=>{
            setLoading(false);
            if(err.response) alert(err.response.data.message);
        })
    }
    useEffect(()=>{
        if(viewPass)
            document.getElementsByTagName("input")[2].setAttribute("type", "password");
        else document.getElementsByTagName("input")[2].setAttribute("type", "text");
    },[viewPass])
    return (
        <>
            <div className='bg-white dark:bg-slate-700 md:pt-4 pt-2 pb-10 container'>
                <div className='mx-auto md:mt-8 mt-5 md:w-[70%] w-[90%] flex justify-center'>
                    <div className='w-[100%]  flex flex-col gap-5 '>
                        <span className='flex flex-col'>
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email' value={email} onChange={e=>setEmail(e.target.value)} 
                            placeholder='example@gmail.com' 
                            className='border border-orange-500 outline-violet-500 '/>
                        </span>
                        <div className='flex flex-col relative'>
                            <label htmlFor="password">Password</label>
                            <input  id='password' value={password} onChange={(e)=>setPassword(e.target.value)}
                            placeholder='xxxxxxx'onKeyPress={e=>{
                                if(e.key === 'Enter'){
                                    changeEmailAndPAssword();
                                }
                            }}
                            className='border border-orange-500 outline-violet-500'/>
                            <span onClick={()=>setViewPass(!viewPass)} 
                            className='w-[30px] h-[30px] cursor-pointer rounded-full flex justify-center items-center absolute right-2 top-5 lg:top-7
                            hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-600 active:dark:bg-gray-500'>
                                {
                                    viewPass?<AiFillEye size="25px"/>:<AiFillEyeInvisible size="25px"/>
                                }
                            </span>
                        </div>
                        <button className='bg-blue-700 hover:bg-blue-600' onClick={changeEmailAndPAssword}>{loading?<div className='loading'/>:<span>save</span>}</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Security;
