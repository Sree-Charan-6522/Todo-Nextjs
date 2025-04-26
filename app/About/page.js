import React from 'react'

const About = () => {
    return (
        <>
            <div className="bg-[#121212] h-[49.1em] flex justify-center items-start shadow-[inset_0_0_25px_rgba(225,0,0,0.4)]  max-md:h-screen max-md:overflow-hidden">
            <div className="bg-[#1E1E1E] h-[36em] w-[38em] px-6 py-4 mt-20 rounded-lg flex flex-col max-md:shadow-[inset_0_0_25px_rgba(225,0,0,0.4)] text-[rgb(237,237,237)] max-md:mt-0  max-md:w-screen max-md:h-full max-md:px-2 max-md:rounded-none">
                    <h1 className="text-3xl font-bold mb-4 text-center underline">About Our Todo Management App</h1>
                    <p className="text-lg mb-6 text-center px-5">
                        Our Todo Management App is designed to help you stay organized and productive. With features like task creation, editing, and deletion, you can easily manage your daily activities. Built with a modern tech stack and a user-friendly interface, our app ensures a seamless experience for users. Whether you're planning your day or managing a project, our app is here to simplify your workflow and keep you on track.
                    </p>
                </div>
            </div>
        </>
    )
}

export default About
