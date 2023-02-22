import React, { useContext, useEffect, useState } from 'react';
import Message from './Message';
import { Context } from '../Context/Context';
import axios from 'axios';
import MobileCard from './MobileCard';
import {SlRefresh} from "react-icons/sl"
import { url } from '../base_url';
const PhoneScreen = ({socket}) => {
    const {User,setMs,ms} = useContext(Context);
    const [friend,setFriend] = useState([]);
    const [loading,setLoading] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const [currentChat,setCurrentChat] = useState({});
    useEffect(()=>{
        const GetFriends = async()=>{
            setLoading(true);
            await axios.get(`${url}/friend/getFriends?userId=${User?._id}`)
            .then(res=>{
                setLoading(false);
                setFriend(res.data.data);
            }).catch(err=>{
                setLoading(false);
                console.log(err);
            })
        }
        if(User) GetFriends();
    },[refresh,User]);
    useEffect(()=>{
        setMs(false);
    },[setMs]);
    return (
        <>
            {
                ms?
                <div className='bg-gray-300 dark:bg-slate-700 h-screen sm:pb-0 pb-10 fixed'>
                    {
                        currentChat?<Message currentChat={currentChat}  socket={socket}/> :""
                    } 
                </div>:
                <div className='bg-gray-300 dark:bg-slate-700 h-screen py-2 px-2'>
                    <div className='pt-2 pb-4'>
                        <span className='flex justify-between items-center'>
                            <h4 className='text-xl font-semibold'>List Friend</h4>
                            <span onClick={()=>setRefresh(!refresh)} className='p-2 hover:bg-gray-600 active:bg-gray-500 rounded-full cursor-pointer'>
                            <SlRefresh size="20px"/>
                        </span>
                        </span>
                        <hr />
                    </div>
                    {
                        friend.length?
                        friend.map((friend,index)=>{
                            return(
                                <div onClick={()=>{
                                    setCurrentChat(friend);
                                    setMs(true);
                                }} key={index}>
                                    <MobileCard friend={friend}/>
                                </div>
                            )
                        }):<h1 className='absolute top-[30%] left-[30%] text-4xl text-gray-400 dark:text-gray-600'>
                            {loading?"Loading...":"No friend"}
                            </h1>
                    }
                </div>
                
            }
        </>
    );
}

export default PhoneScreen;
