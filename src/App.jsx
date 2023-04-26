import { Routes,Route } from "react-router-dom";
import Header from "./component/Header";
import Login from "./component/Login";
import About from "./component/About";
import Contact from "./component/Contact";
import {useState } from "react";
import Register from "./component/Register";
import FormInformation from './component/FormInformation';
import {Context} from "./Context/Context";
import Homepage from "./component/Homepage";
import ReccoverPassword from "./component/ReccoverPassword";
import Profile from "./component/Profile";
import AddFriend from './component/AddFriend';
import SupportUs from "./component/SupportUs";
const App = ()=>{
  const [User,setUser] = useState(null);
  const [add,setAdd] = useState(false);
  const [ms,setMs] = useState(false);
  const [openChatContact,setOpentChatContact] = useState(false);
  const [loading,setLoading] = useState(false);
  const [socket,setSocket] = useState(null);
  const [openAdminChat,setOpentAdminChat] = useState(false);
  return(
    <>
      <Context.Provider value={{openAdminChat,setOpentAdminChat,socket,setSocket,add,setAdd,ms,setMs,User,setUser,loading,setLoading,setOpentChatContact,openChatContact}}>
        {
          User?<Header/>:
          <div className="py-4 bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.2)] dark:bg-gray-900 px-4">
            <h1 className="text-xl font-bold  bg-gradient-to-r from-[#49C5F6] to-[#FF2AEf] bg-clip-text text-transparent">Chat app</h1>
          </div>
        }
        {
          add?<div className='absolute z-40 shadow-2xl mx-5 md:right-0 left-2 w-screen md:flex md:justify-end'>
                  <AddFriend authId={User._id}/>
              </div>:""
        }
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/auth/signup" element={<Register/>}/>
          <Route path="/auth/login" element={<Login/>}/>
          <Route path="/auth/profile" element={<Profile/>}/>
          <Route path="/auth/recover" element={<ReccoverPassword/>}/>
          <Route path="/auth/signup/information/:id" element={<FormInformation/>}/>
          <Route path="/auth/login" element={<Login/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/support" element={<SupportUs/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </Context.Provider>
    </>
  )
}


export default App;