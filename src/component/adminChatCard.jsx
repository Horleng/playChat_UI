import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import {AiOutlineArrowRight} from "react-icons/ai"
import { Context } from '../Context/Context';
import UserCard from './UserCard';
import ConatactAdmin from './ConatactAdmin';
import { useNavigate } from 'react-router-dom';
const AdminChatCard = ({conversation}) => {
    const [conversationId,setConversationId] = useState("");
    const [members,setMember] = useState([]);
    const {setOpentChatContact,User,openAdminChat,setOpentAdminChat} = useContext(Context);
    const navigation = useNavigate();
    useEffect(()=>{
        if(!User) navigation("/");
        if(!conversation) navigation("/");
    },[User,conversation,navigation]);
    return (
        <>
            {
                !openAdminChat?
            <div className='lg:px-[100px] md:px-[50px] px-[10px] py-0'>
                <span className='flex justify-between items-center'>
                    <h1 className='text-xl font-bold'>User Chat</h1>
                    <span onClick={()=>setOpentChatContact(false)} 
                    className='cursor-pointer w-[40px] h-[40px] rounded-full flex justify-center items-center 
                    hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-500 active:dark:bg-gray-500'>
                       <AiOutlineArrowRight size="25px"/>
                    </span>
                </span>
                <hr className=''/>
                <div className='grid xs:grid-cols-2 grid-cols-1 xs:gap-2 gap-1 lg:gap-4'>
                    {
                        conversation?.length?
                        conversation.map((conversation,index) =>{
                            return(
                                <div key={index} onClick={()=>{
                                    setConversationId(conversation._id);
                                    setMember(conversation.members);
                                    setOpentAdminChat(true);
                                }}>
                                    <UserCard  members={conversation?.members}/>
                                </div>
                            )
                        }):""
                    }
                </div>
            </div>
                :<div className='md:w-[80%] w-full mx-auto'>
                    <ConatactAdmin conversationId={conversationId} members={members} isAdmin={true}/>
                </div>
                }
            <div>

            </div>
        </>
    );
}

export default AdminChatCard;
