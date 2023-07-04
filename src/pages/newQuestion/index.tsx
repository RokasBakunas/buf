import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Link from 'next/link';


export default function NewQuestion() {
  const [questionText, setQuestionText] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('jwt');
      if (!token) {
        router.push('/login');
      }
    };

    checkAuth();
  }, []);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    


    
    try {
      const token = Cookies.get('jwt');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await axios.post(
        'http://localhost:3001/question/',
        { question_text: questionText },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      
      console.log(response.data);

    setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="pt-10 flex flex-col items-center justify-center">
        <form onSubmit={handleQuestionSubmit} className="w-64">
          <label className="p-1">
            Klausimo tekstas:
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="border border-gray-300 rounded my-2 px-3 py-2 w-full"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Įkelti klausimą
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
