import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Link from 'next/link';

export default function QuestionPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [filteredQuestion, setFilteredQuestion] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [answerText, setAnswerText] = useState('');

  const fetchQuestions = async () => {
    try {
      const jwt = Cookies.get('jwt');
      const response = await axios.get('http://localhost:3001/questions', {
        headers: {
          'authorization': `${jwt}`,
        },
      });
      setQuestions(response.data);
      console.log("setQuestions", setQuestions)
      console.log("response.data", response.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    if (jwt) {
      setLoggedIn(true);
      fetchQuestions();
    } else {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const filtered = questions.find((question) => question.id === router.query.id)?.answers;
      setFilteredQuestion(filtered);
    }
  }, [questions, router.query.id]);

  const logout = () => {
    Cookies.remove('jwt');
    setLoggedIn(false);
  };

  const submitAnswer = async (e, question_id) => {
    e.preventDefault();
    try {
      const jwt = Cookies.get('jwt');
      const response = await axios.post(
        `http://localhost:3001/question/answer/${question_id}`,
        {
          answer_text: answerText,
        },
        {
          headers: {
            authorization: jwt,
          },
        }
      );
      console.log(response.data);
      fetchQuestions();
      setAnswerText('');
    } catch (error) {
      console.error(error);
    }
  };

  if (!filteredQuestion || filteredQuestion.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div>
        {loggedIn ? (
          <div className='m-2'>
            {filteredQuestion && filteredQuestion.length > 0 ? (
              <div>
                <h2>{filteredQuestion[0].question_text}</h2>
                <h5>Autorius: {filteredQuestion[0].userName}</h5>
                <h5>Atsakymų skaičius: {filteredQuestion.length}</h5>
                {filteredQuestion.map((answer, index) => (
                  <div className='m-5' key={index}>
                    <h4>{answer.answer_text}</h4>
                    <p>Atsakėjas: {answer.userName}</p>
                  </div>
                ))}
                <form onSubmit={(e) => submitAnswer(e, filteredQuestion[0].question_id)}>
                  <input type="hidden" name="question_id" value={filteredQuestion[0].question_id} />
                  <textarea
                    name="answer_text"
                    placeholder="Įveskite savo atsakymą..."
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                  ></textarea>
                  <button type="submit">Pridėti atsakymą</button>
                </form>
              </div>
            ) : (
              <div>
                <h2>Klausimas nerastas</h2>
              </div>
            )}
            <button className='fixed bottom-0 m-2 right-0 z-50' onClick={logout}>
              Atsijungti
            </button>
          </div>
        ) : (
          <div className='flex m-2 p-2 flex-col flex-wrap justify-center items-center'>
            <h1>Prisijunkite, kad matytumėte turinį</h1>
            <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' href="/login">
              Prisijungti čia
            </Link>{' '}
            arba{' '}
            <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' href="/register">
              Užsiregistruokite čia
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
