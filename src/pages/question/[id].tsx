import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import WriteAnswer from '../../components/writeAnswer/writeAnswer'
import Logout from './../../components/logout/logout'
import Link from 'next/link';
import jwtDecode from 'jwt-decode';




export default function QuestionPage() {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  const router = useRouter();
  const { id } = router.query;

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


  useEffect(() => {
    const token = Cookies.get('jwt');
const decodedToken = jwtDecode(token);



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

  const handleLikeAnswer = async (answerId) => {
    try {
      await axios.post(`http://localhost:3001/answer/like`, { answerId }, {
        headers: {
          Authorization: Cookies.get('jwt'),
        },
      });
      fetchQuestion();
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
  const token = Cookies.get('jwt');
  const decodedToken = jwtDecode(token);
  return (
    
    <>
<Header />

<div className="flex flex-col items-center justify-center">
  <h1>Klausimas: {question.question_text}</h1>
  <WriteAnswer questionId={id}/>
  <ul>
    {answers.map((answer) => (
      <li key={answer.id}>

<div className="inline-flex items-center justify-center w-10 h-4 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800">
 {answer.gained_likes_number} 
 <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
   <path 
    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
    clipRule="evenodd" 
    fillRule="evenodd"/>
 </svg>
</div>




  {answer.answer_text}
          <button
                onClick={() => handleDeleteAnswer(answer.id)}
                className="ml-2 text-xs text-red-500"
              >
                Trinti atsakymą
              </button>
              <button
                  onClick={() => handleLikeAnswer(answer.id)}
                  className="ml-2 text-xs text-blue-500"
                >
                  {answer.likes.includes(decodedToken.id) ? 'Dislike' : 'Like'}
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
