import React, { useState, useEffect } from "react";
import styles from './register.module.css'
import axios from "axios";

import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  




  return (
    <>
  LOgin
    </>
  );
}
