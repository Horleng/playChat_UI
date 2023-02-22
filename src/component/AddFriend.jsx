import axios from 'axios';
import React, { useContext, useState } from 'react';
import {AiOutlineUserAdd,AiOutlineUserDelete} from "react-icons/ai"
import {BiUserCheck} from "react-icons/bi"
import { Context } from '../Context/Context';
import { Link } from 'react-router-dom';
import { url } from '../base_url';
const AddFriend = () => {
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const [isFriends,setIsFriends] = useState(false);
    const [ms,setMs]= useState("");
    const [rs,setRs] = useState(null);
    const [ownAccount,setOwnAccount] = useState(false);
    const {User,setAdd} = useContext(Context);
    const [action,setAction] = useState(false);
    const FindUser = async()=>{
        setLoading(true);
        await axios.post(`${url}/auth/getUserByEmail`,{email})
        .then(res=>{
            if(res.data.data._id === User._id)
                setOwnAccount(true);
            else {
                AuthFriend(res.data.data._id);
                setOwnAccount(false);
            }
            setRs(res.data.data);
            setLoading(false);
        }).catch(err=>{
            if(err.response) setMs(err.response.data.message);
            setRs(null);
            setLoading(false);
        })
    }
    const AuthFriend = async(userId)=>{
        await axios.post(`${url}/friend/checkFriends`,{authId:User._id,userId:userId})
        .then(res=>{
            setIsFriends(true);
        }).catch(err=>{
            if(err.response) console.log(err.response.data.message);
            setIsFriends(false);
        })
    }
    const addFriend = async()=>{
        setAction(true);
        await axios.post(`${url}/friend/addFriend`,{authId:User._id,userId:rs._id})
        .then(res=>{
            setAction(false);
            alert(res.data.message);
        }).catch(err=>{
            setAction(false);
            if(err.response) alert(err.response.data.message);
        })
    }
    const unFriend = async()=>{
        if(window.confirm("Are you sure you want to unfriend this user?")){
            setAction(true);
            await axios.post(`${url}/friend/unFriend`,{authId:User._id,userId:rs._id})
            .then(re=>{
                setAction(false);
                alert(re.data.message);
            }).catch(err=>{
                setAction(false);
                if(err.response) alert(err.response.data.message);
            })
        }
    }
    return (
        <>
            <div className='md:h-[60vh] h-[50vh] bg-gray-400 w-[80vw] md:w-[50vw] flex flex-col items-center dark:bg-slate-700 rounded-lg p-5 transition-all'>
                <h1 className='flex justify-center text-xl font-bold'>Add Friend</h1>
                <div className='flex mt-5'>
                    <input type="search" value={email} onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={event=>{if(event.key ==="Enter") FindUser()}}
                    placeholder='search...' 
                    className='border-gray-300 py-3 w-full text-base placeholder:text-base text-gray-300 outline-none rounded-none rounded-l-lg border placeholder:text-gray-600'/>
                    <button onClick={FindUser} className='bg-green-600  rounded-none rounded-r-lg hover:bg-green-700 py-3'>Search</button>
                </div>
                {
                    rs?
                    <div className='flex mt-5 p-3 rounded-lg justify-between bg-gray-300 md:w-[70%] sm:w-[85%] w-full'>
                        <span className='flex gap-2'>
                            {
                                loading?<span className='w-[50px] h-[50px] rounded-full bg-gray-500'/>:
                            <img src={rs.img} alt=""
                            className='rounded-full w-[50px] h-[50px]' />}
                            <span>
                                <h1 className='text-gray-600 text-lg font-medium'>{`${rs.firstName} ${rs.lastName}`}</h1>
                                <p className='text-sm'>Online</p>
                            </span>
                        </span>
                        {
                            ownAccount?<Link to="/auth/profile">
                                        <button onClick={()=>setAdd(false)} className='w-[40px] h-[40px] p-0 m-0 rounded-full hover:bg-gray-400 active:bg-gray-300'><BiUserCheck size="25px" fill='black' className='mx-auto'/></button>
                                    </Link>:
                            isFriends? 
                            <button className='w-[40px] h-[40px] p-0 m-0 rounded-full hover:bg-gray-400 active:bg-gray-200 hover:dark:bg-gray-500 active:dark::bg-gray-500' onClick={unFriend}>
                                {action?<div className='loading'></div>:<AiOutlineUserDelete size="25px" fill='black' className='mx-auto'/>}
                            </button>
                            :
                            <button className='w-[40px] h-[40px] p-0 m-0 rounded-full hover:bg-gray-400 active:bg-gray-200 hover:dark:bg-gray-500 active:dark::bg-gray-500' onClick={addFriend}>
                                {action?<div className='loading'/>:<AiOutlineUserAdd size="25px" fill='black' className='mx-auto'/>}
                            </button>
                        }
                    </div>
                    :loading?<div className='loading-lg mt-5'/>:<h1 className='mt-5 mx-auto text-red-600'>{ms}</h1>
                }
            </div>
        </>
    );
}

export default AddFriend;
