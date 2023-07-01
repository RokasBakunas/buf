import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Link from 'next/link';


export default function QuestionPage() {
  const router = useRouter();
  const { id } = router.query;

  const [question, setQuestion] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    if (jwt) {
      setLoggedIn(true);
      const fetchQuestion = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/question/${id}`, {
            headers: {
              'authorization': `${jwt}`,
            },
          });
          setQuestion(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchQuestion();
    } else {
      setLoggedIn(false);
    }
  }, [id]);

  const logout = () => {
    Cookies.remove('jwt');
    setLoggedIn(false);
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div>
        {loggedIn ? (
          <div>
            
            <h2>{question.question_text}</h2>
            <h5>Autorius: {question.userName}</h5>
            <h5>Atsakymų skaičius: {question.answers_id.length}</h5>
           
            <button className='fixed bottom-0 m-2 right-0 z-50' onClick={logout}>Atsijungti</button>
          </div>
        ) : (
          <h1>Prisijunkite, kad matytumėte turinį</h1>
        )}
      </div>
      <Footer />
    </>
  );
}
