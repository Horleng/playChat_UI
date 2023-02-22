import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { url } from "../base_url";

const UserCard = ({members}) => {
    const [loading,setLoading] = useState(false);
    const [user,setuser] = useState(null);
    const {User} = useContext(Context);
    const navigation = useNavigate();
    useEffect(()=>{
      if(!User) navigation("/");
  },[User,navigation])
  const getUser = async(userId)=>{
    setLoading(true);
    await axios.get(`${url}/auth/getUserById?userId=${userId}`)
    .then(res=>{
        setLoading(false);
        setuser(res.data.data);
    }).catch(err=>{
        setLoading(false);
        if(err.response) alert(err.response.data.message);
    })
  }
  useEffect(()=>{
      const userId = members.find(id=>id!==User._id);
      getUser(userId);
  },[members,User]);
  return (
    <>
      <div className="mt-4 cursor-pointer lg:w-[70%] w-full px-2 flex items-center gap-3 
      bg-gray-300 hover:bg-gray-400 py-2 rounded-lg transition-all ">
        {
        user?
          <img
          src={user.img}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />:loading?<div className="loading"/>:<></>
        }
        <span>
         <span  className="text-gray-500 lg:text-base md:text-sm text-xs font-bold">
            {
              user?
              `${user.firstName} ${user.lastName}`:loading?<span>Loading...</span>:<></>
            }
          </span>
          <p className="text-xs font-light text-gray-400 shadow-xl">last send message</p>
        </span>
      </div>
    </>
  );
};

export default UserCard;
