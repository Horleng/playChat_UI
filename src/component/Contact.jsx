import React, { useContext, useEffect, useState } from 'react';
import {BsFacebook,BsTelegram,BsFillChatDotsFill} from "react-icons/bs"
import {Context} from "../Context/Context"
import axios from "axios";
import ConatactAdmin from './ConatactAdmin';
import AdminChatCard from './adminChatCard';
import { useNavigate } from 'react-router-dom';
import { url } from '../base_url';
const Contact = () => {
    const [conversation,setConversation] = useState([]);
    const [isAdmin,setIsAdmin] = useState(false);
    const {User,openChatContact,setOpentChatContact} = useContext(Context);
    const navigation = useNavigate();
    useEffect(()=>{
        if(!User) navigation("/");
    },[User,navigation])
    useEffect(()=>{
        setOpentChatContact(false);
    },[setOpentChatContact])
    useEffect(()=>{
        const getConversations = async(id)=>{
            await axios.get(`${url}/message/getCinversationId?id=${id}`)
            .then(res=>{
                setConversation(res.data.data);
            }).catch(err=>{
                console.log(err.response?.data.message);
            })
        }
        getConversations(User?._id);
    },[User]);
    useEffect(()=>{
        if(conversation.length>1) setIsAdmin(true);
    },[conversation]);
    return (
        <>
            <div className='bg-gray-200 dark:bg-gray-600 fixed w-screen h-screen'>
                {
                !isAdmin?
                    !openChatContact?
                    <div className='mx-auto flex justify-center items-center sm:flex-row flex-col lg:w-auto gap-5 pt-[10vh]'>
                        <span onClick={()=>setOpentChatContact(true)} 
                        className='w-[150px] bg-gray-300 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 flex justify-center gap-2 items-center cursor-pointer transition-all hover:scale-[1.1] px-3 rounded-full'>
                            <span className='flex justify-center items-center gap-2 bg-gradient-to-r from-[#49C5F6] to-[#FF2AEF] py-1 bg-clip-text text-transparent'>
                                <BsFillChatDotsFill size="30px" fill='#4FA4F4'/>Open Chat
                                </span>
                        </span>
                        <a href="https://www.facebook.com/Horlenggg?mibextid=ZbWKwL" target='_blank' rel="noreferrer">
                            <span className='w-[150px] bg-gray-300 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 flex justify-center gap-2 items-center cursor-pointer transition-all hover:scale-[1.1] px-3 rounded-full'>
                                <span className='flex justify-center items-center gap-2 bg-gradient-to-r from-[#49C5F6] to-[#FF2AEF] py-1 bg-clip-text text-transparent'>
                                    <BsFacebook size="30px" fill='#4FA4F4'/>Facebook
                                </span>
                            </span>
                        </a>
                        <a href="https://t.me/Horlenggg" target='_blank' rel="noreferrer">
                            <span className='w-[150px] bg-gray-300 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 flex justify-center gap-2 items-center cursor-pointer transition-all hover:scale-[1.1] px-3 rounded-full'>
                                <span className='flex justify-center items-center gap-2 bg-gradient-to-r from-[#49C5F6] to-[#FF2AEF] py-1 bg-clip-text text-transparent'>
                                <BsTelegram size="30px" fill='#4FA4F4'/>Telegram
                                </span>
                            </span>
                        </a>
                    </div>
                    :
                    <div className='lg:w-[80%] sm:w-[90%] w-full mx-auto'>
                    <ConatactAdmin members={conversation[0]?.members} conversationId={conversation[0]?._id} isAdmin={false}/>
                    </div>:
                <div className='lg:w-[80%] sm:w-[90%] w-full mx-auto'>
                    <AdminChatCard conversation={conversation}/>
                </div>
                }
            </div>
        </>
    );
}

export default Contact;
