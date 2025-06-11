import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';

const Home = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('LoggedInUser');
    const token = localStorage.getItem('token');

    if (!token || !user) {
      navigate('/login');
    } else {
      setLoggedInUser(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('LoggedInUser'); 
    navigate('/login');
    handleSuccess("User Logged Out Successfully.")
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col'>
      <h1 className='text-[50px]'>Hello {loggedInUser}</h1>
      <button
        className='bg-red-600 p-4 text-white rounded-xl font-bold hover:cursor-pointer mt-4'
        onClick={handleLogout} 
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
