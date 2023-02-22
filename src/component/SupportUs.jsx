import React, { useContext, useEffect, useState } from 'react';
import {GiCoffeeCup} from "react-icons/gi"
import {AiOutlineArrowRight,AiOutlineSwap,AiFillCloseCircle} from "react-icons/ai"
import AcKh from "../img/aciKh.jpg"
import Acdolla from "../img/acDolla.jpg"
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';
const SupportUs = () => {
    const [pay,setPay] = useState(false);
    const [dolla,setDolla] = useState(false);
    const {User} = useContext(Context);
    const navigation = useNavigate();
    useEffect(()=>{
        if(pay) alert("Thanks you for support me🙊🙏!")
    },[pay]);
    useEffect(()=>{
        if(!User) navigation("/");
    },[User,navigation]);
    return (
        <>
            <div className='mx-auto lg:w-[60%] md:w-[80%] w-[90%] h-screen overflow-y-auto'>
                <div className=' flex justify-between items-center'>
                    <span className='flex items-center gap-2 mt-4'>
                        <GiCoffeeCup size="25px"/>
                        <h1 className='text-xl font-bold'>Pay me a coffee?</h1>
                    </span>
                    <span onClick={()=>{
                        setPay(!pay);
                    }} 
                    className='cursor-pointer w-[40px] h-[40px] rounded-full  transition-all flex justify-center items-center 
                    hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-500 active:dark:bg-gray-500'>
                        {
                            pay?<AiFillCloseCircle size="25px"/>:<AiOutlineArrowRight size="25px"/>
                        }
                    </span>
                </div>
                <hr className='border-[1.2px]'/>
                <div className='mt-6'>
                    {
                        pay?
                        <div>
                            <span className='flex justify-between items-center'>
                                <h1 className='text-lg font-bold px-2'>Acleda</h1>
                                <span onClick={()=>setDolla(!dolla)} 
                                    className='cursor-pointer  w-[40px] h-[40px] rounded-full flex justify-center items-center transition-all 
                                    hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-500 active:dark:bg-gray-500'>
                                        <AiOutlineSwap size="25px"/>
                                </span>
                            </span>
                                <hr className='border-[1.2px] mb-4'/>
                            <img src={dolla?Acdolla:AcKh} alt="" 
                        className='rounded-lg w-screen h-[400px] border-2 border-blue-600 hover:border-green-700 transition-all'/>
                        </div>
                        :
                        <div className='h-[84vh] flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600'>
                            <img src="https://thumbs.dreamstime.com/z/golden-retriever-dog-wearing-eye-glasses-lying-down-computer-laptop-blue-cup-coffee-sleepy-171768356.jpg" alt="" 
                    className='rounded-lg w-screen border-[3px] border-blue-600 hover:border-violet-600 transition-all'/>
                            <img src="https://media.istockphoto.com/id/1355984042/photo/dog-working-from-home-drinking-coffee.jpg?b=1&s=170667a&w=0&k=20&c=hPoOY0Bkp_hRjhrRTLxNf4gywG-E2-nmMCuk4S-kUaI=" alt="" 
                    className='rounded-lg w-screen border-[3px] border-blue-600 hover:border-violet-600 transition-all'/>
                            <img src="https://grandvalleyvet.com/wp-content/uploads/2020/09/dog-feature-3.jpg" alt="" 
                    className='rounded-lg w-screen border-[3px] border-blue-600 hover:border-violet-600 transition-all'/>
                            <img src="https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/650143-gettyimages-1219240095-0b49bbf16eae5ae2d2705426c9d119ef.jpg" alt="" 
                    className='rounded-lg w-screen border-[3px] border-blue-600 hover:border-violet-600 transition-all'/>
                            <img src="https://images.unsplash.com/photo-1583336663277-620dc1996580?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwY2xvdGhlc3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="" 
                    className='rounded-lg w-screen border-[3px] border-blue-600 hover:border-violet-600 transition-all'/>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default SupportUs;
