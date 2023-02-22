import React, { useContext, useEffect, useRef, useState } from "react";
import {AiOutlineArrowRight} from "react-icons/ai"
import {FiSend} from "react-icons/fi"
import { Context } from "../Context/Context";
import axios from "axios";
import { url } from "../base_url";
const Message = (props) => {
  const {setMs,User} = useContext(Context);
  const [FriendInfo,setFriendInfo] = useState({});
  const [sendLoading,setSendLoading] = useState(false);
  const [allMs,setAllMS] = useState([]);
  const [infoLoading,setInfoLOading] = useState(false);
  const [msLoading,setMsLoading] = useState(false);
  const message = useRef("");
  const [receiveMs,setReceiveMs] = useState(null);
  const scrollRef = useRef();
const sendMessage = async(friendId)=>{
  setSendLoading(true);
  await axios.post(`${url}/message/send`,{friendId,sender:User._id,text:message.current.value})
  .then(res=>{
    const firId = props.currentChat?.members.find(id=>id!==User?._id);
    newMessages(firId,User?._id,message.current.value);
    setSendLoading(false);
    message.current.value="";
  }).catch(err=>{
    setSendLoading(false);
    if(err.response) alert(err.response.data.message);
  })
};

const newMessages = (receiverId,authId,text)=>{
  if(receiverId&&authId&&text){
    const data = {receiverId,sender:authId,text:text,createdAt:Date.now()}
    props.socket.emit("sendMessage",data);
    setAllMS(ms=>[...ms,data]);
  }
}
useEffect(()=>{
  receiveMs && props.currentChat.members.includes(receiveMs?.sender) && setAllMS(ms=>[...ms,receiveMs]);
},[receiveMs,props.currentChat]);
useEffect(()=>{
  props.socket?.on("sendBack",data=>{
    setReceiveMs(data);
    })
},[allMs,message.current?.value,props.currentChat,props.socket]);
useEffect(()=>{
  const getMessages = async(friendId)=>{
    setMsLoading(true);
    await axios.get(`${url}/message/get?friendId=${friendId}`)
    .then(re=>{
      setMsLoading(false);
      setAllMS(re.data.data);
    }).catch(err=>{
      setMsLoading(false);
      if(err.response) alert(err.response.data.message);
    })
  };
  getMessages(props.currentChat._id);
},[props.currentChat]);
useEffect(()=>{
  const getUsers = async(currentChat)=>{
    setInfoLOading(true);
    const userId = currentChat.members.find(id=>id!==User?._id);
    await axios.get(`${url}/auth/getUserById?userId=`+userId)
    .then(res=>{
      setInfoLOading(false);
      setFriendInfo(res.data.data);
    }).catch(err=>{
      setInfoLOading(false);
        if(err.response) alert(err.response.data.message);
    }) 
};
  getUsers(props.currentChat);
},[props.currentChat,User]);
useEffect(()=>{
  scrollRef.current?.scrollIntoView({behavior:"smooth"});
},[allMs]);
  return (
    <>
      <div>
        <div className="bg-gray-200 dark:bg-slate-800 mt-1 rounded-lg py-1 px-4 flex justify-between w-screen">
          {
            FriendInfo?
              <span className="flex gap-4">
                {
                  infoLoading?<div className="w-[50px] h-[50px] rounded-full bg-gray-400"/>:
                  <img src={FriendInfo.img}alt="" className="w-[50px] h-[50px] rounded-full"/>
                }
                <span>
                  <h1 className="text-base font-bold">{infoLoading?"Loading...":`${FriendInfo.firstName} ${FriendInfo.lastName}`}</h1>
                  <p className="text-xs">last sent message</p>
                </span>
              </span>:<p>Loading...</p>
          }
          <span onClick={()=>setMs(false)} className="w-[40px] h-[40px] rounded-full flex justify-center items-center 
          hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-600 active:dark::bg-gray-500">
            <AiOutlineArrowRight size="25px" />
          </span>
        </div>
        <div className="flex flex-col h-screen">
            <div className="scroll-to-buttom flex flex-col gap-2 px-5 py-10 mt-3 xs:h-[75%] h-[68%]     
            overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600">
              {
                allMs.length?allMs.map((msg,index)=>{
                  return (
                    <div key={index} className={"max-w-[70%] w-fit flex gap-2 "+(msg.sender===User._id? "self-end flex-row-reverse" : " ")}>
                      <img src={msg.sender===User._id?User.img:FriendInfo.img} alt="" className="w-[35px] h-[35px] rounded-full"/>
                      <span>
                        <div  className={" text-gray-200 dark:text-gray-300 py-1 px-4 rounded-lg break-words "+(msg.sender===User._id?" bg-gray-400 dark:bg-gray-500":"bg-violet-400")}>
                            {msg.text}
                        </div>
                        <span className={"text-[10px] mt-1"}>{msg.createdAt}</span>
                      </span>
                    </div>
                  )
                    
                }):msLoading?"Loading....":<h5>No message</h5>
              }
                <div ref={scrollRef}/>
              </div>
                <div className="relative sm:px-6 xs:px-2 h-[10%]">
                  <input type="text" placeholder="message..." ref={message}
                    className="w-full py-3 border-2 bg-gray-600 border-gray-500 text-base font-medium text-gray-600 dark:text-gray-300 outline-none" 
                  onKeyPress={(event)=>{
                    if(event.key==="Enter"){
                      sendMessage(props.currentChat._id);
                    }
                  }}/>
                  <span onClick={()=>{
                    sendMessage(props.currentChat._id);
                  }}
                  className="cursor-pointer w-[40px] h-[40px] flex items-center justify-center absolute top-1 right-5 
                  rounded-full hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-600 active:dark::bg-gray-500">
                    {
                      sendLoading?
                        <div className="loading" />
                        :
                        <FiSend size="25px" />
                    }
                  </span>
                </div>
          </div>
      </div>
    </>
  );
};

export default Message;
