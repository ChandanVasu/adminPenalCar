"use client"
import { useEffect } from 'react';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

const CookieComponent = () => {
  useEffect(() => {
    setCookie('user', 'JohnDoe', { maxAge: 60 * 60 * 24 * 7 });

    const user = getCookie('user');
    console.log(user); 

  }, []);

  return (
    <div>
      <h1>Cookie Example</h1>
    </div>
  );
};

export default CookieComponent;
