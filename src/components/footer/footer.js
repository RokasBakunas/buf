import React from "react";
import styles from "./footer.module.css";


import Link from "next/link";

const Footer = () => {
  return (
    <>
    <div className={`fixed text-center p-2 bottom-0 w-full ${styles.footer}`}>
    „BestQuestion“  © visos teisės saugomos
</div>
    </>
  );
};

export default Footer;