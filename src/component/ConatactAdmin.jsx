import React, { useContext, useEffect, useRef, useState } from 'react';
import {AiOutlineArrowRight,AiFillStar} from "react-icons/ai";
import {IoIosSend} from "react-icons/io";
import { Context } from '../Context/Context';
import axios from 'axios';
import {BsFacebook,BsTelegram} from "react-icons/bs";
import { url } from '../base_url';
import moment from 'moment';
const ConatactAdmin = ({conversationId,members,isAdmin}) => {
    const [loading,setLoading] = useState(false);
    const [loading2,setLoading2] = useState(false);
    const {User,socket,setOpentChatContact,setOpentAdminChat} = useContext(Context);
    const [userIfo,setUserIfo] = useState(null);
    const [messages,setMessages] = useState([]);
    const [ioMs,setIoMs] = useState(null);
    const newMessage = useRef();
    const scroller = useRef();
    const sendMessage = async()=>{
        setLoading(true);
        await axios.post(`${url}/message/sendMessageToAdmin`,
        {sender:User._id,text:newMessage.current?.value,conversationId:conversationId})
        .then(res=>{
            sendNewMessage(members?.find(id=>id!==User?._id),User?._id,newMessage.current?.value);
            newMessage.current.value="";
            setLoading(false);
        }).catch(err=>{ 
            setLoading(false);
            if(err.response) alert(err.response.data.message);
        })
    }
    const sendNewMessage = (receiverId,authId,text)=>{
        if(receiverId&&authId&&text){
          const data = {receiverId,sender:authId,text:text,createdAt:Date.now()}
          socket?.emit("sendMessage",data);
          setMessages(ms=>[...ms,data]);
        }
      }
    useEffect(()=>{
        ioMs && members?.includes(ioMs.sender) && setMessages(ms=>[...ms,ioMs]);
    },[ioMs,members,setMessages])
    useEffect(()=>{
        socket?.on("sendBack",(data)=>{
            setIoMs(data);
        })
    },[messages,socket]);
    useEffect(()=>{
        const getMessage = async(id)=>{
            setLoading(true);
            await axios.get(`${url}/message/getMsWithAdmin?id=${id}`)
            .then(res=>{
                setMessages(res.data.data);
                setLoading(false);
            }).catch(err=>{
                setLoading(false);
                if(err.response) alert(err.response.data.message);
            })
        }
        getMessage(conversationId);
    },[conversationId]);
    useEffect(()=>{
        const id = members?.find(id=>id!==User._id);
        const getUser = async(id)=>{
            setLoading2(true);
            await axios.get(`${url}/auth/getUserById?userId=${id}`)
            .then(res=>{
                setLoading2(false);
                setUserIfo(res.data.data);
            }).catch(err=>{
                setOpentChatContact(false);
                setLoading2(false);
                if(err.response) alert(err.response.data.message);
            })
        }
        if(id) getUser(id);
    },[members,User,setOpentChatContact]);
    useEffect(()=>{
        scroller.current?.scrollIntoView({behavior:"smooth"});
    },[messages]);
    return (
        <>
        <div className='flex gap-5 w-full'>
            <div className='flex-1 w-full'>
                <div className='flex w-full justify-between items-center px-2 py-1 bg-gray-100 rounded-lg xs:mt-2 mt-1 dark:bg-gray-800'>
                    <span className='flex gap-3'>
                        {
                            userIfo?
                            <img src={userIfo.img} alt="" 
                            className='w-[50px] h-[50px] rounded-full'/>:
                            loading2?<div className='w-[50px] h-[50px] rounded-full bg-gray-500'/>:"Something wrong"
                        }
                        <span>
                            {
                                userIfo?
                                <h5 className='text-lg flex items-center font-bold'>{`${userIfo.firstName} ${userIfo.lastName}`}{!isAdmin?<AiFillStar fill="orange" size="15px" className='self-start'/>:""}</h5>:
                                loading2?"Loading...":""
                            }
                            <p className='text-xs font-medium'>last send message</p>
                        </span>
                    </span>
                                <span onClick={()=>{
                                    setOpentChatContact(isAdmin);setOpentAdminChat(false);
                                }} className='cursor-pointer w-[40px] h-[40px] rounded-full flex justify-center items-center hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-600 active:dark::bg-gray-500'>
                                    <AiOutlineArrowRight size="25px"/>
                                </span>
                        </div>
                        <div id="scroller" className='md:px-16 px-5 py-5  xs:h-[74vh] h-[68vh]    
                        bg-gray-300 dark:bg-gray-700 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600 flex flex-col gap-1'>
                        {
                            messages.length?
                                messages.map((ms,index)=>{
                                    return (
                                        <div key={index} className={(ms.sender===User._id?"self-end flex-row-reverse":"")+' flex items-center gap-1 lg:max-w-[50%] md:max-w-[60%] max-w-[70%]'}>
                                            <img src={User?._id===ms.sender?User?.img:userIfo?.img} alt="" className='w-[30px] h-[30px] rounded-full'/>
                                            <div className='flex flex-col'>
                                                <span className={(ms.sender===User._id?"bg-gray-400 dark:bg-gray-600":"bg-[#4FA4F4] text-white")+' py-1 break-all text-base px-4 rounded-lg text-gray-700 dark:text-gray-300'}>
                                                    {ms.text}
                                                </span>
                                                <span className='text-xs'>{moment(ms.createdAt).fromNow()}</span>
                                            </div>
                                        </div>
                                    )
                                }):loading?<h1>Loading.....</h1>:<span>No messages</span>
                        }
                        <div ref={scroller}/>
                        </div>
                        <div className='relative'>
                            <input type="text" onKeyPress={(e)=>{if(e.key ==="Enter")sendMessage()}}
                            placeholder='message' ref={newMessage}
                            className='py-3 w-full border-[2px] outline-none border-gray-400 placeholder:text-base text-base'/>
                            <span onClick={sendMessage} className='w-[40px] h-[40px] flex justify-center items-center absolute right-3 top-1 cursor-pointer 
                            rounded-full hover:bg-gray-400 active:bg-gray-200 hover:dark:bg-gray-500 active:dark::bg-gray-400'>
                                {loading?<div className='loading'/>:<IoIosSend size="30px"/>}
                            </span>
                </div>
            </div>
            <div className='lg:flex-[0.7] md:flex-[0.3] md:block hidden py-5'>
                <div className='lg:w-[70%] md:w-[100%] mt-4 mx-auto'>
                    <span className='flex items-center justify-center'>
                        <h1 className='text-2xl'>{userIfo?isAdmin?" I'm Admin":`${userIfo?.firstName} ${userIfo?.lastName}(Admin)`:loading2?"Loading...":""}</h1>
                        {
                            !isAdmin?<AiFillStar fill="orange" size="15px" className='self-start'/>:""
                        }
                    </span>
                    <div className='w-[300px] relative mx-auto h-[150px] mt-4 rounded-lg flex justify-center items-center 
                    transition-all hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-400 bg-gray-300'>
                        {
                            userIfo?
                            <img src={isAdmin?User?.img:userIfo.img} alt="" className='w-[100px] h-[100px] rounded-full mx-auto'/>
                            :loading2?<div className='w-[100px] h-[100px] rounded-full bg-gray-700' />:""
                        }
                    </div>
                        <span className='flex gap-4 mt-4 w-full justify-center'>
                            <a href="https://www.facebook.com/Horlenggg?mibextid=ZbWKwL" target='_blank' rel="noreferrer">
                                <span className='bg-gray-300 hover:bg-gray-200 dark:bg-gray-500 flex justify-center gap-2 items-center cursor-pointer transition-all hover:scale-[1.1] px-2 rounded-full'>
                                    <span className='flex justify-center items-center gap-2 bg-gradient-to-r from-[#49C5F6] to-[#FF2AEF] py-1 bg-clip-text text-transparent'>
                                        <BsFacebook size="30px" fill='#4FA4F4'/>Facebook
                                    </span>
                                </span>
                            </a>
                            <a href="https://t.me/Horlenggg" target='_blank' rel="noreferrer">
                                <span className='bg-gray-300 hover:bg-gray-200 dark:bg-gray-500 flex justify-center gap-2 items-center cursor-pointer transition-all hover:scale-[1.1] px-2 rounded-full'>
                                    <span className='flex justify-center items-center gap-2 bg-gradient-to-r from-[#49C5F6] to-[#FF2AEF] py-1 bg-clip-text text-transparent'>
                                    <BsTelegram size="30px" fill='#4FA4F4'/>Telegram
                                    </span>
                                </span>
                            </a>
                        </span>
                </div>
            </div>
        </div>
        </>
    );
}

export default ConatactAdmin;
