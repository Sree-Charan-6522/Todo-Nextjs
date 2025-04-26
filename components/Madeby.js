import React from 'react'
import Link from 'next/link'
import { siNextdotjs } from "simple-icons/icons";

const Madeby = () => {
  
  return (
    <div className="bg-[#1E1E1E] h-[4em] w-screen shadow-[0_0_25px_rgba(225,0,0,0.4)] absolute bottom-0 px-6 py-4 flex flex-col items-center justify-center text-[rgb(237,237,237)] max-md:shadow-none max-md:p-0 ">
      <div className='flex items-center gap-2'>
        <span>Created with</span>
        <Link target='_blank' href="https://nextjs.org/"><svg role="img" className='invert' viewBox="0 0 24 24" height={20} width={20} xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: siNextdotjs.svg }} fill={`#${siNextdotjs.hex}`}/></Link>
      </div>
        <span>by <Link target='_blank' href="https://github.com/Sree-Charan-6522"><strong>MR.Introvert.6522...</strong></Link></span>
        <span className="absolute text-white bottom-0 left-0 text-sm"><strong>Version: v1.0.0</strong></span>
    </div>

  )
}

export default Madeby
