import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('jwt');

    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-0 right-0 mt-2 mr-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
      Atsijungti
    </button>
  );
};

export default LogoutButton;
