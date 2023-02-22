import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams} from "react-router-dom"
import { url } from '../base_url';
const FormInformation = () => {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [birth,setBirth] = useState("");
    const [purpos,setPurpos] = useState("");
    const [sex,setSex] = useState("");
    const [img,setImg] = useState({});
    const [loading,setLoading] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    const saveInformation = async()=>{
        setLoading(true);
        await axios.post(`${url}/auth/userInformation?id=${id}`,{firstName,lastName,birth,sex,purpos,img},{headers:{"content-type":"multipart/form-data"}})
        .then((res)=>{
            setLoading(false);
            alert(res.data.message);
            navigate('/auth/login');
        }).catch(err=>{
            setLoading(false);
            if(err.response) alert(err.response.data.message);
        })
    }
    useEffect(()=>{
        if(!id) navigate('/auth/signUp');
    },[id,navigate])
    const callSaveInformation = (e)=>{
        if(e.key==="Enter") saveInformation();
    }
    const Next = ()=>{
        navigate('/auth/login');
    }
    return (
        <>
            <div className='bg-gray-300 dark:bg-slate-700 h-screen md:pt-16 pt-5 container'>
                <h1 className='flex justify-center text-2xl font-extrabold'>Your Information</h1>
                <div className='mx-auto md:mt-8 mt-3 lg:w-[50%] md:w-[70%] w-[90%] flex justify-center'>
                    <div className=' lg:w-[65%] md:w-[80%] w-[100%]  flex flex-col md:gap-5 gap-2 overflow-hidden'>
                        <span className='flex md:flex-row flex-col gap-2 '>
                            <span className='flex flex-col'>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id='firstName' value={firstName} onChange={e=>setFirstName(e.target.value)} 
                                placeholder='your full  name' onKeyPress={callSaveInformation} 
                                className='border border-orange-500 outline-green-500 md:w-[100%]'/>
                            </span>
                            <span className='flex flex-col'>
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id='lastName' value={lastName} onChange={e=>setLastName(e.target.value)} 
                                placeholder='your full  name'  onKeyPress={callSaveInformation} 
                                className='border border-orange-500 outline-green-500  md:w-[100%]'/>
                            </span>
                        </span>
                        <span className='flex md:flex-row flex-col gap-2 md:justify-between'>
                            <span className='flex flex-col md:w-full'>
                                <label htmlFor="birthday">Birthday</label>
                                <input type="date" id='birthday'  value={birth} onChange={e=>setBirth(e.target.value)} 
                                className='border border-orange-500 outline-green-500'/>
                            </span>
                            <span className='flex flex-col md:w-full'>
                                <label htmlFor="purpos">What your Purpos?</label>
                                <select  id="sex" defaultValue="Other" onChange={e=>setPurpos(e.target.value)}  
                                className='py-2 px-3 rounded-lg border-orange-600 outline-green-500 bg-inherit border '>
                                    <option value="Study">Study</option>
                                    <option value="Bussines">Bussines</option>
                                    <option value="Family">Family</option>
                                    <option value="Other">Other</option>
                                </select>
                            </span>
                        </span>
                        <span className='flex md:flex-row flex-col gap-2'>
                            <span className='flex flex-col  md:w-full'>
                                <label htmlFor="sex">Gender</label>
                                <select  id="sex" defaultValue="" onChange={e=>setSex(e.target.value)}  
                                className='py-2 px-3 rounded-lg border-orange-600 outline-green-500 bg-inherit border'>
                                    <option value="">Defualt</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </span>
                            <span className='flex flex-col  md:w-full'>
                                <label htmlFor="img">Photo</label>
                                <label htmlFor="img" className='border py-2 px-5 rounded-lg  border-orange-600 outline-green-500'
                                    >Choose your image
                                    <input type="file" id='img' hidden onChange={(e)=>setImg(e.target.files[0])}/>
                                </label>
                            </span>
                        </span>
                        <span className='flex gap-2 xs:flex-row flex-col mt-2'>
                            <button  onKeyPress={callSaveInformation}  onClick={saveInformation} className='w-full bg-blue-700 hover:bg-blue-600'>{loading?<div className='loading'/>:"Save"}</button>
                            <button onClick={Next} className='w-full bg-green-700 hover:bg-green-600'>Skip</button>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormInformation;
