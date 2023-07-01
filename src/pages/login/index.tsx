import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import Footer from './../../components/footer/footer';
import Header from './../../components/header/header';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", { email, password });

      if (res.data.response === "Prisijungimas sėkmingas") {
        Cookies.set('jwt', res.data.jwt);
        Cookies.set('refresh_token', res.data.refresh_token);

        router.push("/");  
      }
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.response]);
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
        <h1>Prisijungimas</h1>
        {errors.map((error, i) => <div key={i} className="text-red-500">{error}</div>)}

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
          <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Login
              </button>
          </div>
        </form>
      </div>
  <Footer/> </>
  );
}
