import axios from 'axios';
import React, {  useState } from 'react';
import { url } from '../base_url';

const EditInfo = (props) => {
    const [firstName,setFirstName] = useState(props.User.firstName);
    const [lastName,setLastName] = useState(props.User.lastName);
    const [birth,setBirth] = useState(props.User.birth);
    const [purpos,setPurpos] = useState(props.User.purpos);
    const [sex,setSex] = useState(props.User.sex);
    const [loading,setLoading] = useState(false);
    const changeInformation = async()=>{
        setLoading(true);
        await axios.post(`${url}/auth/changInformation?id=${props.User._id}`,{firstName,lastName,birth,purpos,sex})
        .then(res=>{
            localStorage.setItem("token",res.data.token);
            console.log(res.data.token);
            setLoading(false);
            alert(res.data.message);
        }).catch(err=>{
            setLoading(false);
            if(err.response) alert(err.response.data.message);
        })
    }
    return (
        <>
            <div className='flex justify-center py-4'>
                    <div className=' lg:w-[65%] md:w-[80%] w-[100%]  flex flex-col md:gap-5 gap-2 overflow-hidden'>
                        <span className='flex md:flex-row flex-col gap-2 '>
                            <span className='flex flex-col'>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id='firstName' value={firstName} onChange={(e)=>setFirstName(e.target.value)} 
                                placeholder='your first  name' 
                                className='border border-orange-500 outline-green-500 md:w-[100%]'/>
                            </span>
                            <span className='flex flex-col'>
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id='lastName' value={lastName} onChange={(e)=>setLastName(e.target.value)} 
                                placeholder='your last  name' 
                                className='border border-orange-500 outline-green-500  md:w-[100%]'/>
                            </span>
                        </span>
                        <span className='flex md:flex-row flex-col gap-2 md:justify-between'>
                            <span className='flex flex-col md:w-full'>
                                <label htmlFor="birthday">Birthday</label>
                                <input type="date" id='birthday' value={birth?.split("T")[0]} onChange={(e)=>setBirth(e.target.value)} 
                                className='border border-orange-500 outline-green-500 w-full'/>
                            </span>
                            <span className='flex flex-col md:w-full'>
                                <label htmlFor="purpos">What your Purpos?</label>
                                <select  id="sex" defaultValue={props.User.purpos} onChange={(e)=>setPurpos(e.target.value)} 
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
                                <label htmlFor="sex">Sex</label>
                                <select  id="sex" defaultValue={props.User.sex} onChange={(e)=>setSex(e.target.value)} 
                                className='py-2 px-3 rounded-lg border-orange-600 outline-green-500 bg-inherit border'>
                                    <option value="">Defualt</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </span>
                        </span>
                            <button onClick={changeInformation} className='bg-blue-700 hover:bg-blue-600 mt-2'>
                                {
                                    loading?<div className='loading'/>:"Save"
                                }
                                </button>
                    </div>
                </div>
        </>
    );
}

export default EditInfo;
