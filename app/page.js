"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from "next-auth/react";
import LoginReminder from "@/components/LoginReminder";



export default function Home() {

  const { data: session } = useSession();
  const username = session?.user.name.trim().replaceAll(" ", "-");


  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  const fetchTodos = async () => {
    if (session) {
      const res = await fetch(`/api/server/${username}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        setTodos(data.todos);
      } else {
        console.error("Failed to fetch todos");
      }
    } else {
      const res = await fetch('/api/server', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        setTodos(data.todos);
      } else {
        console.error("Failed to fetch todos");
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  //Load todos from mongodb when app starts and Automatically save todos to mongodb whenever they change
  useEffect(() => {
    fetchTodos();
  }, [todos, session]);

  const handleAdd = async () => {
    if (todo.trim().length < 3) return;

    const id = uuidv4(); // generate ID here
    const isCom = false; // default completion status

    if (session) {
      const res = await fetch(`/api/server/${username}`, {
        method: 'POST',
        body: JSON.stringify({ id, todo, isCom }),
        headers: { 'Content-Type': 'application/json' }
      });
    }else{
      const res = await fetch('/api/server', {
        method: 'POST',
        body: JSON.stringify({ id, todo, isCom }),
        headers: { 'Content-Type': 'application/json' }
      });
    }

    setTodos([...todos, { id: id, todo, isCom: isCom }]);
    setTodo(""); // Clear input after adding

    toast.success('Todo Added :)', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Zoom,
    });
  };

  const handleEdit = (id) => {
    const itemToEdit = todos.find((item) => item.id === id);

    if (session) {
      const res = fetch(`/api/server/${username}`, {
        method: 'DELETE',
        body: JSON.stringify({ id: itemToEdit.id }),
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const res = fetch('/api/server', {
      method: 'DELETE',
      body: JSON.stringify({ id: itemToEdit.id }),
      headers: { 'Content-Type': 'application/json' }
    });

    setTodo(itemToEdit.todo);
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleDelete = (id) => {
    if (session) {
      const res = fetch(`/api/server/${username}`, {
        method: 'DELETE',
        body: JSON.stringify({ id: id }),
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const res = fetch('/api/server', {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
      headers: { 'Content-Type': 'application/json' }
    });

    setTodos(todos.filter((item) => item.id !== id));

    toast.info('Todo Deleted :)', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Zoom,
    });
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };


  const handleCheck = (item) => {
    if (session) {
      const res = fetch(`/api/server/${username}`, {
        method: 'POST',
        body: JSON.stringify({ id: item.id, todo: item.todo, isCom: !item.isCom }),
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const res = fetch('/api/server', {
      method: 'POST',
      body: JSON.stringify({ id: item.id, todo: item.todo, isCom: !item.isCom }),
      headers: { 'Content-Type': 'application/json' }
    });
    setTodos(todos.map((todo) => todo.id === item.id ? { ...todo, isCom: !todo.isCom } : todo));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <div className="bg-[#121212] relative h-[53.1em] flex justify-center items-start shadow-[inset_0_0_25px_rgba(225,0,0,0.4)]  max-md:h-0 ">
        <div className="bg-[#1E1E1E] h-[36em] w-[38em] px-6 py-4 mt-20 rounded-lg flex flex-col max-md:shadow-[inset_0_0_25px_rgba(225,0,0,0.4)] text-[rgb(237,237,237)] max-md:absolute max-md:mt-0  max-md:w-screen max-md:h-[34em] max-md:px-2 max-md:rounded-none">
          <h1 className="font-extrabold text-2xl px-8 py-4 max-md:px-4 max-md:py-2 text-[rgb(237,237,237)]">
            My-Task  Manage your todos at one place
          </h1>
          <LoginReminder/>
          <h2 className="font-bold text-xl text-[rgb(237,237,237)] px-4">Add a Todo</h2>


          <div className="flex flex-col md:flex-row items-center gap-4 px-4 mt-6">
            <motion.input
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex-grow bg-[#2C2C2C] text-[#EDEDED] placeholder:text-gray-400 rounded-full px-4 py-2 border border-[#3A3A3A] focus:outline-none focus:ring-2 focus:ring-[#FF6F61] transition duration-300 ease-in-out max-md:w-5/6"
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter your task..."
            />

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-[#FF6F61] text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-[#e75c50] disabled:bg-gray-500 transition duration-300 ease-in-out"
              disabled={todo.length < 3}
              onClick={handleAdd}
            >
              Save
            </motion.button>
          </div>
          <div className="flex gap-2 my-4 w-full px-4">
            {/* <input className="cursor-pointer" checked={showFinished} onChange={toggleFinished} type="checkbox" /> */}
            <label className="inline-flex items-center gap-2 cursor-pointer group">
              <input
                onChange={toggleFinished}
                checked={showFinished}
                type="checkbox"
                className="peer hidden"
              />

              <div className="w-5 h-5 rounded border-2 border-[#FF6F61] peer-checked:border-[#FF6F61] flex items-center justify-center transition duration-300 bg-transparent peer-checked:bg-[#FF6F61]">
                <AnimatePresence>
                  {showFinished && (
                    <motion.svg
                      key="tick"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>

              <span className="text-white text-sm">Show Finished</span>
            </label>
            {/* <span>Show Finished</span> */}
          </div>
          <span className="h-[1px] bg-gray-600 w-[85%] mx-8"></span>
          <h2 className="font-bold text-xl px-4 mt-2">Your Todos</h2>
          <div className="flex flex-col gap-4 my-4 w-full px-4 overflow-y-auto">
            {todos.length === 0 && <div>No Todos to Display</div>}
            {todos.map(
              (item) =>
                (showFinished || !item.isCom) && (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="flex gap-2">

                      {/* <input onChange={() => handleCheck(item.id)} checked={item.isCom} className="cursor-pointer" type="checkbox" /> */}
                      <label className="inline-flex items-center gap-2 cursor-pointer group">
                        <input
                          onChange={() => handleCheck(item)}
                          checked={item.isCom}
                          type="checkbox"
                          className="peer hidden"
                        />

                        <div className="w-5 h-5 rounded border-2 border-[#FF6F61] peer-checked:border-[#FF6F61] flex items-center justify-center transition duration-300 bg-transparent peer-checked:bg-[#FF6F61]">
                          <AnimatePresence>
                            {item.isCom && (
                              <motion.svg
                                key="tick"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="5"
                                viewBox="0 0 24 24"
                              >
                                <path d="M5 13l4 4L19 7" />
                              </motion.svg>
                            )}
                          </AnimatePresence>
                        </div>
                      </label>

                      <span className={item.isCom ? "line-through" : ""}>{item.todo}</span>
                    </span>

                    <span className="flex gap-2 max-md:hidden">
                      <button onClick={() => handleEdit(item.id)} className="shadow-[inset_0_0_12px_rgba(0,0,0)] flex items-center cursor-pointer gap-2 bg-[#4A90E2] text-white px-2  py-2 rounded-full hover:bg-[#3B7BC4] transition">
                        <lord-icon src="https://cdn.lordicon.com/exymduqj.json" trigger="hover" stroke="bold" colors="primary:white,secondary:white" style={{ width: '24px', height: '24px' }} >
                        </lord-icon>
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="shadow-[inset_0_0_12px_rgba(0,0,0)] flex items-center cursor-pointer gap-2 bg-[#4A90E2] text-white px-2  py-2 rounded-full hover:bg-[#3B7BC4] transition">
                        <lord-icon src="https://cdn.lordicon.com/hwjcdycb.json" trigger="hover" state="morph-trash-in" colors="primary:#ffffff,secondary:#ffffff" style={{ width: '24px', height: '24px' }}>
                        </lord-icon>
                      </button>
                    </span>

                    <span className="flex gap-2 md:hidden">
                      <button
                        onClick={() => {
                          setTimeout(() => {
                            handleEdit(item.id)
                          }, 1000);
                        }}
                        className="shadow-[inset_0_0_12px_rgba(0,0,0)] flex items-center cursor-pointer gap-2 bg-[#4A90E2] text-white px-2  py-2 rounded-full hover:bg-[#3B7BC4] transition"
                      >
                        <lord-icon src="https://cdn.lordicon.com/exymduqj.json" trigger="click" stroke="bold" colors="primary:white,secondary:white" style={{ width: '24px', height: '24px' }} ></lord-icon>
                      </button>
                      <button
                        onClick={() => {
                          setTimeout(() => {
                            handleDelete(item.id)
                          }, 1000);
                        }}
                        className="shadow-[inset_0_0_12px_rgba(0,0,0)] flex items-center cursor-pointer gap-2 bg-[#4A90E2] text-white px-2  py-2 rounded-full hover:bg-[#3B7BC4] transition"
                      >
                        <lord-icon src="https://cdn.lordicon.com/hwjcdycb.json" trigger="click" state="morph-trash-in" colors="primary:#ffffff,secondary:#ffffff" style={{ width: '24px', height: '24px' }}></lord-icon>
                      </button>
                    </span>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}