import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link';
import Footer from './../components/footer/footer';
import Header from './../components/header/header';

export default function Home() {
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

//atsijungimas istrinam jwt cookies
  const logout = () => {
    Cookies.remove('jwt');
    setJwt(null);
  }



  if (jwt === null) {
    return <div>Loading...</div>
  }

  return (
    <>
    <Header/>
      {jwt ? (
        <div className='flex m-2 p-2 flex-col flex-wrap justify-center items-center'>
          {/* mapinam is question laukelio duomenis */}
          {questions.map(question => (
           <>
            <Link className='flex m-2 p-2 flex-col flex-wrap justify-center items-center' href={`./question/${question.id}`}>
            <div key={question.id}>
              <h2>{question.question_text}</h2>
              <h5>Autorius: {question.userName}</h5>
              <h5>Atsakymų skaičius: {question.answers_id.length}</h5>

            </div></Link>              <button className='fixed bottom-0 m-2 right-0 z-50' onClick={logout}>Atsijungti</button>

            </>
            
            
          ))}

        </div>
      ) : (
        <div>
          <h1>Prisijunkite, kad matytumėte turinį</h1>
          <Link href="/login">Prisijungti čia</Link> arba <Link href="/register">Užsiregistruokite čia</Link>
        </div>
      )}

    <Footer/>    
    </>
  );
}
