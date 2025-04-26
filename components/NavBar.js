'use client'
import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react' // icon library (optional)
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  
  const [loginshowToast, setloginShowToast] = useState(false)
  
  useEffect(() => {
    if (typeof session === 'undefined') return;
  
    const wasSignedOut = sessionStorage.getItem("signedOut");
  
    if (session && !loginshowToast) {
    setTimeout(() => {
      toast.success('Logged in :)', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Zoom,
        });
      }, 1000);
    }
    if (session && !loginshowToast) {
      setTimeout(() => {
        setloginShowToast(true);
      }, 500);
      }
  
    setTimeout(() => {
      if (session === null && wasSignedOut) {
        toast.success('Logged out :)', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Zoom,
        });;
        sessionStorage.removeItem("signedOut");
        setloginShowToast(false);
      }
    }, 500);


  }, [session]);
  

  const profilePic = session?.user?.image || "imgs/default.png";
  console.log(profilePic);
  


  return (
    <>
      
      <div className='bg-[#1E1E1E] text-[#EDEDED] px-6 py-4 border-b border-[#2C2C2C] flex justify-around p-4'>
        <Link className='text-xl font-bold ' href="/">My-Task</Link>
        <ul className='flex gap-14 max-md:hidden'>
          <li className="hover:text-[#FF6F61] transition cursor-pointer"><Link href="/">Home</Link></li>
          <li className="hover:text-[#FF6F61] transition cursor-pointer"><Link href="/About">About</Link></li>
          {session ? (
            <button onClick={() => {sessionStorage.setItem("signedOut", "true");signOut({ callbackUrl: '/' });}} className='flex items-center gap-2 cursor-pointer'>
              <img src={`/api/image-proxy?url=${session.user.image}`} height={20} width={20} alt="profileimg" className='rounded-full' />
              <span className='hover:text-[#FF6F61] transition cursor-pointer'>Sign out</span>
            </button>
          ) : (
            <li className="hover:text-[#FF6F61] transition cursor-pointer"><Link href="/Login">Login</Link></li>
          )}
        </ul>


        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#1E1E1E] text-[#EDEDED] w-full absolute mt-10 z-20">
            <div className='flex flex-col justify-center items-center gap-2 !mb-4'>
              <Link onClick={() => { setTimeout(() => { window.scrollTo(0, 0); setIsOpen(!isOpen); }, 300) }} className='hover:text-[#FF6F61] focus:text-[#FF6F61] transition cursor-pointer' href="/">Home</Link>
              <Link onClick={() => { setTimeout(() => { window.scrollTo(0, 0); setIsOpen(!isOpen); }, 300) }} className='hover:text-[#FF6F61] focus:text-[#FF6F61] transition cursor-pointer' href="/About">About</Link>
              {session ? (
                <button onClick={() => {sessionStorage.setItem("signedOut", "true");signOut({ callbackUrl: '/' });}} className='flex items-center gap-2 cursor-pointer'>
                  <img src={profilePic} height={20} width={20} alt="profileimg" className='rounded-full' />
                  <span className='hover:text-[#FF6F61] focus:text-[#FF6F61] transition cursor-pointer'>Sign out</span>
                </button>
              ) : (
                <Link onClick={() => { setTimeout(() => { window.scrollTo(0, 0); setIsOpen(!isOpen); }, 300) }} href="/Login" className="hover:text-[#FF6F61] focus:text-[#FF6F61] transition cursor-pointer">Login</Link>
              )}

            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default NavBar