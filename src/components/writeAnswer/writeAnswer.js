import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';


const AnswerForm = ({ questionId }) => {
  const [answerText, setAnswerText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get('jwt'); 
      if (!token) {
        router.push('/login');
        return;
      }
      await axios.post(
        `https://bub-ka8e.onrender.com/question/answer/${questionId}`,
        {
          answer_text: answerText,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log('Atsakymas sėkmingai pateiktas!');
      setTimeout(() => {

        setAnswerText('');

        router.reload(`/question/${questionId}`);
      }, 0.1);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Įvyko klaida. Bandykite dar kartą.');
      }
    }
  };



  return (
<form onSubmit={handleSubmit} className="mt-4">
  <label className="block mb-2">
    <span className="text-gray-700">Atsakymas:</span>
    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

    <input
      type="text"
      value={answerText}
      onChange={(e) => setAnswerText(e.target.value)}
      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
    />
  </label>
  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
    Pateikti atsakymą
  </button>
</form>

  );
};

export default AnswerForm;
