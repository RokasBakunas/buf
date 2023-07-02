import React from "react";
import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <>
    <div className={`text-center ${styles.header}`}>
    Headeris
    <ul className="flex space-x-4 p-2">
      <li>
        <Link href="/">Pagrindinis</Link>
      </li>
      <li>
        <Link href="/newQuestion">Pridėti klausimą</Link>
      </li>
      <li>
        <Link href="/">Pagrindinis</Link>
      </li>
    </ul>
</div>
    </>
  );
};

export default Header;