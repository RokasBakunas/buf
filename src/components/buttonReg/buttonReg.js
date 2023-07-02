import React from 'react';
import Link from 'next/link';

const ButtonReg = () => {


  return (
    <div className="flex justify-center space-x-4">
    <Link className="absolute m-2 top-0 right-0 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" href="/register">
     
        Registracija
     
    </Link>
  </div>
  );
};

export default ButtonReg;
