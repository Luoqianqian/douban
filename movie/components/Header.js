'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('userName');
    setIsLogin(false);
    location.reload();
  };

  useEffect(() => {
    const userName = localStorage.getItem('userName') || null;
    if(userName) {
      setIsLogin(true);
    }
  }, [pathname]);
  return (
    <div className=' flex flex-row justify-between xl:w-4/6 mx-auto py-3'>
      <div>
        <h1 className=' text-xl font-bold text-cyan-700'>
          <Link href='/'>DB Movies</Link>
        </h1>
      </div>
      <div className=' text-cyan-700'>
        {isLogin? (
          <div className=' flex flex-row'>
            <p>{`Hi! ${localStorage.getItem('userName')}`}</p>
            <Link href='/watched' className='mx-4'>myWatch</Link>
            <span className=' hover:cursor-default' onClick={handleLogout}>Logout</span>
          </div>
        ) : (
          <div className=' flex flex-row gap-2'>
            <Link href='/login'>Login</Link>
            <span>/</span>
            <Link href='signup'>signup</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header