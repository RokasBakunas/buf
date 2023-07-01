import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link';

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

  if (jwt === null) {
    return <div>Loading...</div>
  }

  return (
    <>
      {jwt ? (
        <div>
          {questions.map(question => (
            <div key={question.id}>
              <h2>{question.question_text}</h2>
              <h5>Autorius: {question.userName}</h5>
              <h5>Atsakymų skaičius: {question.answers_id.length}</h5>

            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>Prisijunkite, kad matytumėte turinį</h1>
          <Link href="/login">Prisijungti čia</Link> arba <Link href="/register">Užsiregistruokite čia</Link>
        </div>
      )}
    </>
  );
}
