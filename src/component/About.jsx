import React, { useContext, useEffect } from 'react';
import {AiFillQuestionCircle} from "react-icons/ai"
import Dog from "../img/Dog.png"
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';
const About = () => {
    const {User} = useContext(Context);
    const navigation = useNavigate();
    useEffect(()=>{
        if(!User) navigation("/");
    },[User,navigation]);
    return (
        <>
            <div className='mx-auto lg:w-[60%] md:w-[80%] w-[90%]'>
                <span className='flex items-center mt-4 gap-2'>
                    <AiFillQuestionCircle size="25px"/>
                    <h1 className='text-xl'>What about us?</h1>
                </span>
                <hr className='border-[1.2px]'/>
                <img src={Dog} alt="" className='w-[200px] transition-all hover:scale-[1.05]'/>
                <ul className='mt-6 flex flex-col gap-2 list-decimal'>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, eos.</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, eos.</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, eos.</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, eos.</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, eos.</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, eos.</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, eos.</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, eos.</li>
                </ul>
            </div>
        </>
    );
}

export default About;
