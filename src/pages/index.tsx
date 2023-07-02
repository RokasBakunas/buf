import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import axios from 'axios';
import Link from 'next/link';
import Footer from './../components/footer/footer';
import Header from './../components/header/header';

export default function Home() {
  const router = useRouter();

  const [jwt, setJwt] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setJwt(Cookies.get('jwt'));
    if (jwt) {
      // Get questions from API only if user is logged in
      axios.get('http://localhost:3001/questions', {
        headers: {
          'authorization': `${jwt}`,
        },
      })
      .then(res => {
        setQuestions(res.data);
      })
      .catch(err => {
        console.error(err);
      });
    }
  }, [jwt]);

  const logout = () => {
    Cookies.remove('jwt');
    setJwt(null);
    setTimeout(() => {
      router.push('/');
    }, 1000);
  }

  useEffect(() => {
    if (jwt === null) {
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  }, [jwt]);

  if (jwt === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header/>
      <div className='flex items-center justify-center h-screen'>
        {jwt ? (
          <div className='flex m-2 p-2 flex-col flex-wrap justify-center items-center'>
            {/* Map through questions data */}
            {questions.map(question => (
              <div key={question.id}>
                <Link className='flex m-2 p-2 flex-col flex-wrap justify-center items-center' href={`./question/${question.id}`}>
                  <div>
                    <h2>{question.question_text}</h2>
                    <h5>Autorius: {question.userName}</h5>
                    <h5>Atsakymų skaičius: {question.answers.length}</h5> {/* updated from answers_id to answers */}
                  </div>
                </Link>              
                <button className='fixed bottom-0 m-2 right-0 z-50' onClick={logout}>Atsijungti</button>
              </div>
            ))}
          </div>
        ) : (
          <div className='shadow-md rounded-md bg-gray-300 p-5 pb-9'>
            <h1 className='p-4 m-4' >Prisijunkite, kad matytumėte turinį</h1>
            <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' href="/login">Prisijungti čia</Link> arba <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' href="/register">Užsiregistruokite čia</Link>
          </div>
        )}
      </div>
      <Footer/>    
    </>
  );
}
