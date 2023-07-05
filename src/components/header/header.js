import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import Link from "next/link";
import Image from 'next/image'
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useRouter } from "next/router";
import Head from 'next/head'






const Header = (props) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
  const isLoggedIn = () => {


    const token = Cookies.get('jwt');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
  
        // galiojimas
        const currentTime = Date.now() / 1000; 
        if (decodedToken.exp < currentTime) {
          return false; 
        }
  
        return true; // ar yra ir ar galioja
      } catch (error) {
        console.error(error);
        return false; // netinkamas token
      }
    }
  
    return false; 
  };



  setLoggedIn(isLoggedIn());
}, []);

  const handleLogout = () => {
    Cookies.remove('jwt');
    router.push('/login');
  };

  return (
    
    <>                
<Head><link rel="icon" href="/ico.ico" sizes="any" /><title>BestQuestion</title></Head>
    <header className="text-center bg-gray-200 border-l-4 border-indigo-500">
      <div className="justify-center item-center container mx-auto py-4">
      <Image className={styles.logo} layout="responsive"	width={100} height={100} src="/Logo.png" alt="BestQuestion" priority/>
        <nav className="flex flex-wrap justify-center space-x-4">
          <Link className="text-blue-500 hover:underline" href="/">
           Pagrindinis
          </Link>
          <Link className="text-blue-500 hover:underline" href="/newQuestion">
            Pridėti klausimą
          </Link>
          {loggedIn ? (
            <a className="text-blue-500 hover:underline cursor-pointer" onClick={handleLogout}>Atsijungti</a>
          ) : (
            <>
              <Link className="text-blue-500 hover:underline" href="/register">
                Registruotis 
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
    </>
  );
};

export default Header;