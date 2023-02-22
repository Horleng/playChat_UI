import React, { useContext, useEffect, useState } from 'react';
import {AiOutlineUserSwitch,AiOutlineMenu,AiOutlineUserAdd,AiFillCloseCircle} from "react-icons/ai"
import {MdDarkMode} from "react-icons/md";
import {BsFillSunFill} from "react-icons/bs";
import {  Link, NavLink } from 'react-router-dom';
import { Context } from '../Context/Context';
const Header = () => {
    const [nav,setNave] = useState(false);
    const [theme,setTheme] = useState("");
    const {setAdd,add}  = useContext(Context);
    const list = [
        {title: 'Home',link: '/'},
        {title: 'ContaceUs',link: '/contact'},
        {title: 'AboutUs',link: '/about'},
        {title: 'SupportUs',link: '/support'},
    ]
    const changeTheme = (theme)=>{
        if(theme === 'light'){
            localStorage.theme="light";
            document.documentElement.classList.remove('dark');
            setTheme("light");
        }
        else{
            localStorage.theme="dark";
            document.documentElement.classList.add('dark');
            setTheme("dark");
        }
    }
    useEffect(()=>{
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
          setTheme("light");
        } else {
          document.documentElement.classList.remove('dark')
          setTheme("dark");
        }
      },[]);
    return (
        <>
            <div className='flex justify-between items-center bg-gray-100  dark:bg-slate-800 py-2 px-2 md:px-5'>
                <h1 className='text-2xl font-extrabold lg:flex-1 flex-[0.3] bg-gradient-to-r from-orange-500 via-red-600 to-green-500 bg-clip-text text-transparent px-5'>ChatApp</h1>
                        <ul className={'lg:gap-4 gap-2 items-center justify-center '+(nav?"sm:w-[30%] w-[50%] absolute z-50 flex-col right-0 top-[8vh] bg-gray-400 dark:bg-gray-700 py-2 rounded-lg":"hidden md:flex ")}>
                            {
                                list.map((item, index) =>(
                                    <NavLink to={item.link} key={index} onClick={()=>setNave(false)}>
                                        <li  className={"hover:text-red-600 "+(nav?"py-2 px-10 hover:bg-gray-300 hover:dark:bg-gray-500 rounded-lg":"")}>{item.title}</li>
                                    </NavLink>
                                ))
                            }
                            {
                                nav?
                                <Link to="/auth/profile">
                                    <li onClick={()=>setNave(false)} className='py-2 px-10 hover:bg-gray-300 hover:dark:bg-gray-500 rounded-lg'>Profile</li>
                                </Link>:
                                <Link to="/auth/profile">
                                    <li>
                                        <div className='p-2 w-10 rounded-full hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-600 active:dark:bg-gray-500'><AiOutlineUserSwitch size="25px"/></div>
                                    </li>
                                </Link>
                            }
                        </ul>
                        <div className='md:flex hidden'>
                            <span onClick={()=>setAdd(!add)}  className='cursor-pointer p-2 rounded-full hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-600 active:dark::bg-gray-500'>
                                {add?<AiFillCloseCircle size="25px"/>:<AiOutlineUserAdd size="25px"/>}
                            </span>
                            {
                                theme==="dark"?
                                (<div onClick={()=>changeTheme("light")} className="cursor-pointer w-min p-2 rounded-full hover:bg-gray-400 hover:dark:bg-gray-500 active:bg-slate-300 active:dark:bg-gray-400">
                                    <BsFillSunFill size="25px"/>
                                </div>):
                                (<div onClick={()=>changeTheme("dark")} className="cursor-pointer w-min p-2 rounded-full hover:bg-gray-400 hover:dark:bg-gray-500 active:bg-slate-300 active:dark:bg-gray-400">
                                    <MdDarkMode size="25px"/>
                                </div>)
                            }
                        </div>  
                    <span className=' md:hidden flex items-center gap-2 mx-5'>
                        <div className='flex'>
                            <span onClick={()=>setAdd(!add)} className=' p-2 rounded-full cursor-pointer hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-600 active:dark::bg-gray-500'>
                                {add ?<AiFillCloseCircle size="25px"/>:<AiOutlineUserAdd size="25px"/>}
                            </span>
                            {
                                theme==="dark"?
                                (<div onClick={()=>changeTheme("light")} className="w-min p-2 rounded-full hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-600 active:dark::bg-gray-500">
                                    <BsFillSunFill size="25px"/>
                                </div>):
                                (<div onClick={()=>changeTheme("dark")} className="w-min p-2 rounded-full hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-600 active:dark::bg-gray-500">
                                    <MdDarkMode size="25px"/>
                                </div>)
                            }
                        </div>  
                    <span className='cursor-pointer w-[40px] h-[40px] flex rounded-full items-center justify-center 
                    hover:bg-gray-300 active:bg-gray-200 hover:dark:bg-gray-600 active:dark::bg-gray-500' 
                    onClick={()=>setNave(!nav)}>{nav?<AiFillCloseCircle size="25px"/>:
                    <AiOutlineMenu size="25px"/>}</span>
                </span>
            </div>
        </>
    );
}

export default Header;
