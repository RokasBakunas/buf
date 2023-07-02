import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Link from 'next/link';

export default function QuestionPage() {
  const [question, setQuestion] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/question/${id}`,
          {
            headers: {
              Authorization: Cookies.get('jwt'),
            },
          }
        );
        setQuestion(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchQuestion();
    }
  }, [id]);

  const handleDeleteQuestion = async () => {
    try {
      await axios.delete(`http://localhost:3001/question/${id}`, {
        headers: {
          Authorization: Cookies.get('jwt'), 
        },
      });
      router.push('/'); 
    } catch (error) {
      console.error(error);
    }
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center">
        <h1>Klausimas: {question.question_text}</h1>
        <ul>
          {question.answers_id.map((answerId) => (
            <li key={answerId}>
              <Link href={`/atsakymai/${answerId}`}>
                Atsakymai #{answerId}
              </Link>
            </li>
          ))}
        </ul>

        <button onClick={handleDeleteQuestion}>Ištrinti klausimą</button>
      </div>

      <Footer />
    </>
  );
}
