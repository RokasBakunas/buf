import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Link from 'next/link';

export default function NewQuestion() {
  const [questionText, setQuestionText] = useState('');
  const router = useRouter();

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/question/',
        { question_text: questionText },
        {
          headers: {
            authorization: Cookies.get('jwt'),
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
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={handleQuestionSubmit} className="w-64">
          <label className="mb-2">
            Klausimo tekstas:
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
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
