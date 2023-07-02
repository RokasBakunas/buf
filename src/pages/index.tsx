import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import Footer from './../components/footer/footer';
import Header from './../components/header/header';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Čia gaukite klausimų sąrašą iš API
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/questions/', {
          headers: {
            Authorization: Cookies.get('jwt'), // Jei reikia autorizacijos
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center">
        <h1 className='p-3'>Vartotoju užduoti klausimai:</h1>
        {questions.map((question) => (
          <div key={question.id}>
                          <Link href={`/question/${question.id}`}>

            <div className='p-2 m-1'>{question.question_text}</div>
            </Link>

          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
