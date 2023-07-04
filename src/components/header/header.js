import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import Image from 'next/image'

const Header = () => {
  return (
    <>
     <header className="text-center bg-gray-200">
<Image width={100} height={100} alt="Best Questions" src="/logo.png"/>      <div className="container mx-auto py-4">
        <nav className="flex justify-center space-x-4">
          <Link href="/">
            Pagrindinis
          </Link>
          <Link href="/newQuestion">
            Pridėti klausimą
          </Link>

        </nav>
      </div>
    </header>
    </>
  );
};

export default Header;