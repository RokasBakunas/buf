import React, { useState, useEffect } from "react";
import styles from './register.module.css'
import axios from "axios";
import Footer from './../../components/footer/footer';
import Header from './../../components/header/header';
import Link from 'next/link';

import { useRouter } from "next/router";

export default function Register() {
  const [errors, setErrors] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/register", { email, password, name });

      console.log(res.data);

      if (res.data.response === "Registracija pavyko.") {
        // Atvaizduojame pranešimą apie sėkmingą registraciją
        setMessage(res.data.response);

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.response);
      } else if (error.request) {
        console.log(error.request);
        setErrors(["Klaida siunčiant užklausą."]);
      } else {
        console.log('Error', error.message);
        setErrors(["Nežinoma klaida."]);
      }
      console.log(error);
    }
  };




  return (
    <>
    <Header/>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Registracija</h1>
      {errors.map((error, i) => <div key={i} className="text-red-500">{error}</div>)}

      {message && <h2 className="text-green-500">{message}</h2>}

    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Register
            </button>
        </div>
    </form>
</div>
<Footer/>
    </>
  );
}
