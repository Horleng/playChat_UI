import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import {AiOutlineUserDelete} from "react-icons/ai"
import axios from 'axios';
import { url } from '../base_url';
const MobileCard = (props) => {
    const {User} = useContext(Context);
    const [friendIfo,setFriendIfo] =useState();
    const [action,setAction] =useState(false);
    const [Loadig,setLoading] = useState(false);
    
    const Unfriend = async()=>{
        if(window.confirm("Are you sure that you want to unFriends this user?")){
            setAction(true);
            const userId = props.friend.members.find(id=>id!==props.authId);
            await axios.post(`${url}/friend/unFriend`,{authId:User._id,userId:userId})
            .then(re=>{
                setAction(false);
                alert(re.data.message);
            }).catch(err=>{
                setAction(false);
                if(err.response) alert(err.response.data.message);
            })
        }
    }
    useEffect(()=>{
        const getUsers = async(friend)=>{
            setLoading(true);
            const userId = friend.members.find(id=>id!==User._id);
            await axios.get(`${url}/auth/getUserById?userId=`+userId)
            .then(res=>{
                setLoading(false);
                setFriendIfo(res.data.data);
            }).catch(err=>{
                setLoading(false);
                if(err.response) alert(err.response.data.message);
            }) 
        };
        getUsers(props.friend);
    },[props.friend,User]);
    return (
        <>
            {
                friendIfo?
                <div className='transition-all flex gap-2 items-center justify-between 
                    py-2 px-4 hover:bg-gray-400  hover:dark:bg-gray-500 rounded-lg cursor-pointer w-full'>
                    <span className='flex gap-2'>
                        {Loadig?<div className='w-[50px] h-[50px] rounded-full bg-gray-400'/>:
                        <img src={friendIfo.img} alt="" 
                        className='w-[50px] h-[50px] rounded-full' />
                        }
                        <span>{
                            Loadig?"Loading...":
                            <h1 className='text-base font-medium'>{friendIfo.firstName+" "+friendIfo.lastName}</h1>
                            }
                            <p className='text-xs'>Last sent message</p>
                        </span>
                    </span>
                    <span onClick={Unfriend} className='p-1 rounded-full hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-600 active:dark::bg-gray-500'>
                        {action?<div className='loading'></div>:<AiOutlineUserDelete size="25px"/>}
                    </span>
                </div>:""
            }
        </>
    );
}

export default MobileCard;
