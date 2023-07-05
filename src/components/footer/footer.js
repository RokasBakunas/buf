import React from "react";
import styles from "./footer.module.css";


const Footer = () => {
  return (
    <>
    <div className={`mt-5 border-t-2 border-blue-500 text-center p-2 bottom-0 w-full ${styles.footer}`}>
    „BestQuestion“  © visos teisės saugomos
</div>
    </>
  );
};

export default Footer;