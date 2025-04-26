import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function LoginReminder() {
  const [showPrompt, setShowPrompt] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      return; // If the user is logged in, do not show the prompt
    }
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);

    return () => clearTimeout(timer);
  }, [session]);

  const handleClose = () => {
    setShowPrompt(false);
  };

  return (
    <>
      {showPrompt && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-black/30 z-50">
    <div className="relative bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-md">
      
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
      >
        &times;
      </button>

      <h2 className="text-xl font-semibold mb-4">Please Login or Continue as Guest</h2>

      <div className="flex justify-center gap-4">
        <Link href="/Login" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Login
        </Link>
        <Link href="/" onClick={handleClose} className="inline-block bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
          Continue as Guest
        </Link>
      </div>

    </div>
  </div>
)}

    </>
  );
}

export default LoginReminder;
