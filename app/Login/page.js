'use client'
import React from 'react'
import Link from 'next/link'
import { useSession, signIn } from "next-auth/react"

const Login = () => {
    const { data: session } = useSession()

    return (
        <>
            <div className="bg-[#121212] relative h-[53.1em] flex justify-center items-start shadow-[inset_0_0_25px_rgba(225,0,0,0.4)]  max-md:h-0 ">
                <div className="bg-[#1E1E1E] h-[36em] w-[38em] px-6 py-4 mt-20 rounded-lg flex flex-col max-md:shadow-[inset_0_0_25px_rgba(225,0,0,0.4)] text-[rgb(237,237,237)] max-md:absolute max-md:mt-0  max-md:w-screen max-md:h-[34em] max-md:px-2 max-md:rounded-none">
                    <div className='flex flex-col items-center justify-center h-full'>
                        <h1 className="text-2xl font-bold text-center mt-4">Login</h1>
                        <p className='text-lg font-bold text-center mt-4'>Login to access all the content.</p>
                        <div className='h-80 w-80 border-[#414040] border rounded-2xl mt-4 px-4 py-8 flex flex-col items-center justify-center gap-5'>
                            <button onClick={() => { setTimeout(() => { signIn("google", { callbackUrl: '/' }) }, 200); }} className="w-[80%] cursor-pointer h-10 flex items-center justify-center border-2 rounded-full hover:border-blue-500 max-md:focus:border-blue-500 transition duration-300">
                                <div className="flex items-center justify-center !space-x-4">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 32 32" fill="none">
                                        <path d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z" fill="#4285F4" />
                                        <path d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z" fill="#34A853" />
                                        <path d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z" fill="#FBBC05" />
                                        <path d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z" fill="#EB4335" />
                                    </svg>              <span className="font-semibold text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600">
                                        Continue with Google
                                    </span>
                                </div>
                            </button>
                            <button onClick={() => { setTimeout(() => { signIn("github", { callbackUrl: '/' }) }, 200); }} className="w-[80%] cursor-pointer h-10 flex items-center justify-center border-2 rounded-full hover:border-blue-500 max-md:focus:border-blue-500 transition duration-300">
                                <div className="flex items-center justify-center !space-x-4 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 text-gray-700 dark:text-white" viewBox="0 0 16 16">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                                    </svg>
                                    <span className="font-semibold text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600">
                                        Continue with GitHub
                                    </span>
                                </div>
                            </button>

                            <div className="w-[80%] h-10 flex items-center justify-center text-center wrap-break-word transition duration-300 ">
                                Other Options are not available yet.
                            </div>
                        </div>
                        <p className="text-xs text-center w-80 mt-4">By proceeding, you agree to our <Link href="/terms-of-service/" className="underline text-blue-600">Terms of Service</Link> and confirm you have read our <Link href="/privacy-policy/" className="underline text-blue-600">Privacy Policy</Link>.
                        </p>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Login
