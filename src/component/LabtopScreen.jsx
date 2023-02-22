import React, { useContext, useEffect, useState } from 'react';
import FriendCard from './FriendCard';
import Chat from './Chat';
import Author from './Author';
import {SlRefresh} from "react-icons/sl";
import axios from 'axios';
import { Context } from '../Context/Context';
import { url } from '../base_url';
const LabtopScreen = ({socket}) => {
    const [friend,setFriend] = useState([]);
    const [currentChat,setCurrentChat] = useState(null);
    const {User} = useContext(Context);
    const [loading,setLoading]=useState(false);
    const [refresh,setRefresh]=useState(false);
    useEffect(()=>{
        const GetFriends = async()=>{
            setLoading(true);
            await axios.get(`${url}/friend/getFriends?userId=${User?._id}`)
            .then(res=>{
                setLoading(false);
                setFriend(res.data.data);
            }).catch(err=>{
                setLoading(false);
                if(err.response) alert(err.response.data.message);
            })
        }
        GetFriends();
    },[User,refresh]);
    return (
        <>
            <div className='h-10vh fixed flex gap-5 px-2 w-full'>
                <div className='lg:flex-[0.7] h-screen md:flex-[0.5] mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600'>
                    <span className='flex justify-between item-center'>
                        <h1 className='font-bold text-xl my-0'>Conversations</h1>
                        <span onClick={()=>setRefresh(!refresh)} className='p-2 hover:bg-gray-600 active:bg-gray-500 rounded-full cursor-pointer'>
                            <SlRefresh size="20px"/>
                        </span>
                    </span>
                    <hr className='border-2 mb-5'/>
                    {
                        friend.length?
                        friend.map((friend,index)=>{
                            return(
                                <div key={index} onClick={()=>setCurrentChat(friend)}>
                                    <FriendCard friend={friend} authId={User._id}/>
                                </div>
                            )
                        }):loading?"Loading....":
                        <h1 className='absolute top-[30%] left-5 text-4xl text-gray-400 dark:text-gray-500'>No friend</h1>
                    }
                </div>
                <div className='md:flex-1 md:block hidden'>
                    {
                        currentChat?
                        <Chat currentChat={currentChat} socket={socket} />:
                        <div className='relative py-1'>
                            <h1 className='text-xl font-bold mt-3'>Chat Application</h1>
                            <hr className='border-2'/>
                            <span className='top-[30vh] absolute left-[20%] text-center'>
                                <h1 className='text-4xl text-gray-400 dark:text-gray-500'>Click on friend</h1>
                                <br />
                                <h1 className='text-4xl text-gray-400 dark:text-gray-500'>to opent conversation now</h1>
                            </span>
                        </div>
                    }
                </div>
                <div className='xl:flex-[0.7] h-[85vh] lg:flex-none xl:block hidden'>
                    <Author />
                </div>
            </div>
        </>
    );
}

export default LabtopScreen;
