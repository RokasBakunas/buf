import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import WriteAnswer from '../../components/writeAnswer/writeAnswer'
import Logout from './../../components/logout/logout'
import Link from 'next/link';

export default function QuestionPage() {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

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
        setAnswers(response.data.answers || []);

      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchQuestion();
    }
  }, [id]);

  const handleDeleteAnswer = async (answerId) => {
    try {
      await axios.delete(`http://localhost:3001/answer/${answerId}`, {
        headers: {
          Authorization: Cookies.get('jwt'),
        },
      });
      const updatedAnswers = answers.filter((answer) => answer.id !== answerId);
      setAnswers(updatedAnswers);
    } catch (error) {
      console.error(error);
    }
  };

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
  <WriteAnswer questionId={id}/>
  <ul>
    {answers.map((answer) => (
      <li key={answer.id}>
          {answer.answer_text}
          <button
                onClick={() => handleDeleteAnswer(answer.id)}
                className="ml-2 text-xs text-red-500"
              >
                Trinti atsakymą
              </button>
      </li>
    ))}
  </ul>
  <Logout/>
  <button onClick={handleDeleteQuestion}>Ištrinti klausimą</button>
</div>

<Footer />
    </>
  );
}
