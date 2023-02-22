import React, { useContext, useEffect, useRef } from 'react';
import LabtopScreen from './LabtopScreen';
import PhoneScreen from './PhoneScreen';
import { Context } from '../Context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {io} from "socket.io-client";
import { url } from '../base_url';
const Homepage = () => {
    const socket = useRef();
    const {User,setUser,loading,setLoading} = useContext(Context);
    const {setSocket} = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuth = async() =>{
            setLoading(true);
            const token = localStorage.getItem("token");
            if(token){
                await axios.get(`${url}/auth/tokenVerify`,{headers:{'Authorization': token}})
                .then((response) =>{
                    setUser(response?.data.data);
                    socket.current?.on("connect",()=>{
                        console.log("connected");
                    });
                    socket.current?.emit("joinChat",{authId:response?.data.data._id});
                    setLoading(false);
                    setSocket(socket?.current);
                })
                .catch(err => {
                    localStorage.removeItem("token");
                    console.log(err);
                    setLoading(false);
                    navigate("/auth/login");
                })
            }else {
                setLoading(false);
                navigate("/auth/login");
            }
        }
        if(!User) checkAuth();
        else {
            socket.current?.on("connect",()=>{
                console.log("connected");
                socket.current?.emit("joinChat",{authId:User?._id});
                    setLoading(false);
                    setSocket(socket?.current);
            });
        }
    },[User,navigate,setLoading,setSocket,setUser,]);
    useEffect(() => {
        socket.current = io(url);
    },[]);
    return (
        <>
            {
            loading?<span className='absolute text-xl text-gray-400'>Loading...</span>:
                <div>
                    <div className='md:hidden block'>
                        <PhoneScreen socket={socket.current}/>
                    </div>
                    <div className='md:block hidden'>
                        <LabtopScreen socket={socket.current}/>
                    </div>
                </div>
            }
        </>
    );
}

export default Homepage;
