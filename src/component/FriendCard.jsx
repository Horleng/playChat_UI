import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import {AiOutlineUserDelete} from "react-icons/ai"
import { url } from '../base_url';
const FriendCard = (props) => {
    const [user,setuser] = useState({});
    const [action,setAction] = useState(false);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        const UserIfo = async()=>{
            setLoading(true);
            const userId = props.friend.members.find(id=>id!==props.authId);
            await axios.get(`${url}/auth/getUserById?userId=`+userId)
            .then(res=>{
                setLoading(false);
                setuser(res.data.data);
            }).catch(err=>{
                setLoading(false);
                console.log(err.message);
            })
        }
        if(props.friend) UserIfo();
    },[props.friend,props.authId]);
    const Unfriend = async()=>{
        if(window.confirm("Are you sure that you want to unFriends this user?")){
            setAction(true);
            const userId = props.friend.members.find(id=>id!==props.authId);
            await axios.post(`${url}/friend/unFriend`,{authId:props.authId,userId:userId})
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
            {
            user?<div className='transition-all flex gap-2 items-center justify-between 
            py-2 px-4 hover:bg-gray-400  hover:dark:bg-gray-500 rounded-lg cursor-pointer w-full'>
                <span className='flex gap-2'>
                    {loading?<div className='w-[40px] h-[40px] bg-gray-700 rounded-full'/>:
                    <img src={user.img} alt="" 
                    className='w-[40px] h-[40px] rounded-full'/>
                    }
                    <span>
                        {
                            loading?"Loadig...":<h1 className='text-base font-medium'>{user.firstName+" "+user.lastName}</h1>
                        }
                        <p className='text-xs'>Last sent message</p>
                    </span>
                </span>
                <span onClick={Unfriend} className='p-1 rounded-full hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-600 active:dark::bg-gray-500'>
                    {action?<div className='loading' />:<AiOutlineUserDelete size="25px"/>}
                </span>
            </div>:loading?"Loading....":""
            }
        </>
    );
}

export default FriendCard;
