import React, { useContext, useEffect, useState } from 'react';
import {AiFillCamera,AiOutlineArrowRight,AiOutlineArrowDown,AiOutlineHistory} from "react-icons/ai"
import {CiEdit} from "react-icons/ci"
import {MdOutlineSecurity,MdOutlineMoreVert} from "react-icons/md"
import {RiUserShared2Fill} from "react-icons/ri"
import {AiOutlineLogout} from "react-icons/ai"
import axios from "axios";
import EditInfo from './EditInfo';
import Security from './Security';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { url } from '../base_url';
const Profile = () => {
    const [information,setInformation] =useState(false);
    const [security,setSecurity] =useState(false);
    const [logout,setLogout] = useState(false);
    const [changeImgLoading,setChangeImgLoading] = useState(false);
    const {User,setUser} = useContext(Context);
    const navigation = useNavigate();
    useEffect(()=>{
        if(!User) navigation("/");
    },[User,navigation])
    const changeImg = async(img)=>{
        await axios.post(`${url}/auth/changePhoto?id=${User._id}`,{img})
        .then(res=>{
            localStorage.setItem("token",res.data.token);
            setUser(res.data.data);
            setChangeImgLoading(false);
            alert(res.data.message);
        }).catch(err=>{
            setChangeImgLoading(false);
            if(err.response) alert(err.response.data.message);
        })
    }
    const clear = ()=>{
        if(window.confirm('Are you sure you want to logout?')){
            localStorage.removeItem("token");
            setUser(null);
            navigation("/auth/login");
        }
        else setLogout(false);
    }
    const setFileToBase = (file)=>{
        setChangeImgLoading(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            changeImg(reader.result);
        };
    }
    const setNewImage = (e)=>{
        setFileToBase(e.target.files[0]);
    }
    return (
        <>
            {
            !User?"":
            <div className='h-screen pb-[10rem]  bg-white dark:bg-slate-700 md:flex md:gap-4 block lg:mx-[50px] md:mx-[30px] shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600'>
                <div  className='relative md:flex-1 min-h-screen pt-5 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600'>
                    <div className='flex justify-between items-center'>
                        <span className='flex gap-2 items-center'>
                            <RiUserShared2Fill size="25px"/>
                            <h6 className='text-lg font-bold'>Profile</h6>
                        </span>
                        <span onClick={()=>setLogout(!logout)} className='cursor-pointer flex justify-center items-center w-[40px] h-[40px] rounded-full hover:bg-gray-400 active:hover:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-500'>
                            <MdOutlineMoreVert size="25px"/>
                        </span>
                    {
                        logout?
                        <div className='absolute right-10 top-12 py-4 w-[10rem]'>
                            <ul>
                                <li onClick={clear} className='flex justify-center items-center gap-2 px-1 
                                bg-gray-400 dark:bg-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 py-2 w-full rounded-lg'>
                                    <AiOutlineLogout size="25px"/>Logout</li>
                            </ul>
                        </div>:""
                    }
                    </div>
                    <hr className='border-[1.2px] border-gray-500'/>
                    <div className='flex justify-center transition-all bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-gray-400 w-[90%] mx-auto py-4 rounded-lg mt-4'>
                        <label htmlFor="img" className='relative'>
                            {
                                User?
                                changeImgLoading?<div className='w-[120px] h-[120px] rounded-full img-loading'/>:
                                <img src={User.img} alt="" 
                                className='w-[120px] h-[120px] rounded-full transition-all hover:scale-[1.05]'/>
                                :<div className='w-[120px] h-[120px] rounded-full img-loading'/>
                            }
                            <AiFillCamera size="40px" fill='' className='absolute top-16 right-10 shadow-xl'/>
                            <input type="file"id='img' onChange={setNewImage} hidden/>
                        </label>
                    </div>
                    <div className='flex justify-between items-center mt-10'>
                        <span className='flex gap-2 items-center'>
                            <CiEdit size="30px"/>
                            <h6 className='text-lg font-bold'>Edit Information</h6>
                        </span>
                        <span onClick={()=>setInformation(!information)} className='transition-all cursor-pointer p-2 rounded-full hover:bg-gray-400 active:bg-gray-300'>
                            {
                                !information? <AiOutlineArrowRight size="25px"/> : <AiOutlineArrowDown size="25px"/>
                            }
                        </span>
                    </div>
                    <hr className='border-gray-500 border-[1.2px]'/>
                    {
                        information?
                        <div className='transition-all'>
                            <EditInfo User={User}/>
                        </div>:""
                    }
                    <div className='flex justify-between items-center mt-2'>
                        <span className='flex gap-2 items-center'>
                            <MdOutlineSecurity size="25px"/>
                            <h6 className='text-lg font-bold'>Security</h6>
                        </span>
                        <span onClick={()=>setSecurity(!security)} className='transition-all cursor-pointer p-2 rounded-full hover:bg-gray-400 active:bg-gray-300'>
                            {
                                !security?<AiOutlineArrowRight size="25px"/> : <AiOutlineArrowDown size="25px"/>
                            }
                        </span>
                    </div>
                    <hr className='border-gray-500 border-[1.2px]'/>
                        {
                            security?<div className='transition-all'><Security id={User._id} email={User.email}/></div>:""
                        }  
                </div>
                <div className='md:flex-1 md:block hidden bg-white dark:bg-gray-700 shadow-lg py-5'>
                    <span className='flex gap-2 items-center'>
                        <AiOutlineHistory size="25px"/>
                        <h1 className='text-lg font-bold'>Your history</h1>
                    </span>
                    <hr className='border-[1.2px] border-gray-500'/>
                    <div className='flex flex-col gap-5 pt-5 pb-16 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500 scrollbar-track-gray-400'>
                        <img src="http://cdn.shopify.com/s/files/1/0677/6399/articles/puppy_feeding_guide_1200x1200.jpg?v=1620839014" alt="" 
                            className='rounded-lg transition-all hover:scale-[1.01] w-[80%] mx-auto'/>
                        <img src="http://cdn.shopify.com/s/files/1/0677/6399/articles/puppy_feeding_guide_1200x1200.jpg?v=1620839014" alt="" 
                            className='rounded-lg transition-all hover:scale-[1.01] w-[80%] mx-auto'/>
                        <img src="http://cdn.shopify.com/s/files/1/0677/6399/articles/puppy_feeding_guide_1200x1200.jpg?v=1620839014" alt="" 
                            className='rounded-lg transition-all hover:scale-[1.01] w-[80%] mx-auto'/>
                    </div>
                </div>
            </div>
            }
        </>
    );
}

export default Profile;
