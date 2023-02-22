import React, { useContext, useEffect, useRef, useState } from 'react';
import {FiSend} from 'react-icons/fi'
import axios from 'axios';
import { Context } from '../Context/Context';
import { url } from '../base_url';
const Chat = (props) => {
    const {User} = useContext(Context);
    const [friendIfo,setFriendIfo] = useState({});
    const [messages,setMessages] = useState([]);
    const [sendMsLoading,setSendMsLoading] = useState(false);
    const [receiveMs,setReceiveMs] = useState(null);
    const ms = useRef();
    const scrollRef = useRef();
    const sendMessage = async(friendId)=>{
        setSendMsLoading(true);
        await axios.post(`${url}/message/send`,{friendId,sender:User?._id,text:ms.current.value})
        .then(re=>{
            const friId = props.currentChat?.members.find(id=>id!==User?._id);
            setSendMsLoading(false);
            newMessages(User?._id,friId,ms.current.value);
            ms.current.value="";
        }).catch(err=>{
            setSendMsLoading(false);
            if(err.response) alert(err.response.data.message);
        })
    }
    const newMessages = (authId,receiverId,text)=>{
        if(receiverId&&authId&&text){
            const data = {receiverId,sender:authId,text:text,createdAt:Date.now()}
            props.socket.emit("sendMessage",data);
            setMessages(ms=>[...ms,data]);
          }
      }
      useEffect(()=>{
        receiveMs && props.currentChat?.members.includes(receiveMs.sender) 
        && setMessages(ms=>[...ms,receiveMs]);
      },[receiveMs,props.currentChat]);
    useEffect(()=>{
        props.socket?.on("connect",()=>{
          console.log("connected");
        });
        props.socket?.on("sendBack",data=>{
            setReceiveMs(data);
        })
      },[messages,ms.current?.value,props.socket]);
    useEffect(()=>{
        const getMessages = async(friendId)=>{
            await axios.get(`${url}/message/get?friendId=${friendId}`)
            .then(re=>{
                setMessages(re.data.data);
            }).catch(err=>{
                if(err.response) alert(err.response.data.message);
            })
        };
        getMessages(props.currentChat?._id);
    },[props.currentChat]);
    useEffect(()=>{
        const getUsers = async(currentChat)=>{
            const userId = currentChat.members.find(id=>id!==User._id);
            await axios.get(`${url}/auth/getUserById?userId=`+userId)
            .then(res=>{
                setFriendIfo(res.data.data);
            }).catch(err=>{
                if(err.response) alert(err.response.data.message);
            }) 
        };
        getUsers(props.currentChat);
    },[props.currentChat,User]);
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
      },[messages]);
    return (
        <>
            <div>
                {
                    friendIfo?
                    <div className='bg-gray-200 dark:bg-slate-700 rounded-lg py-2 px-5 flex gap-4 mt-2'>
                        <img src={friendIfo.img} alt="" 
                        className='w-[40px] h-[40px] rounded-full'/>
                        <span>
                            <h1 className='text-base font-bold'>{`${friendIfo.firstName} ${friendIfo.lastName}`}</h1>
                            <p className='text-xs'>last sent message</p>
                        </span>
                    </div>
                    :<h6 className='py-2'>Loading....</h6>
                }   
                    <div className='flex flex-col gap-2 px-5 py-10 h-[74vh] bg-gray-200 dark:bg-gray-600
                        overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600'>
                            {
                            messages.length?
                            messages.map((message,index)=>{
                                return (
                                    <div key={index} className={message.sender===User._id?"self-end flex flex-row-reverse gap-2 ":" flex gap-2 "}>
                                    <img src={message.sender===User._id?User.img:friendIfo.img} alt="" 
                                    className='w-[30px] h-[30px] rounded-full '/>
                                    <div className='max-w-[300px]'>
                                        <div className={"break-all text-gray-300 py-1 px-4 rounded-lg "+(message.sender===User._id?"bg-gray-600 dark:bg-gray-500 ":"bg-violet-500")}>
                                            {message.text}     
                                        </div>
                                        <span className="text-[10px] p-0 m-0">{message.createdAt}</span>
                                    </div>
                                    </div>
                                )
                            })
                            :<h6>No Message</h6>
                            }
                            <div  ref={scrollRef}/>
                        </div>
                    <div className='relative w-[100%] flex'>
                        <input type="text" placeholder='message...' ref={ms}
                        onKeyPress={event=>{if(event.key === "Enter"){
                            sendMessage(props.currentChat?._id);
                        }} }
                        className='text-gray-500 dark:text-gray-300 w-[100%] py-3 border-2 border-gray-500 outline-none'/>
                        <span onClick={()=>{
                            sendMessage(props.currentChat?._id);
                        }} className='absolute right-2 top-1 w-[40px] h-[40px] flex justify-center items-center rounded-full 
                        hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-600 active:dark::bg-gray-500'>
                            {sendMsLoading?<div className='loading'/>:<FiSend size="25px"/>}
                        </span>
                    </div>
                </div>
        </>
    );
}

export default Chat;
