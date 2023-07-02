import React, { useState } from 'react';
import axios from 'axios';

const AnswerForm = ({ questionId }) => {
  const [answerText, setAnswerText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3001/question/answer/${questionId}`, {
        answer_text: answerText,
      });
      console.log('Atsakymas sėkmingai pateiktas!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
<form onSubmit={handleSubmit} className="mt-4">
  <label className="block mb-2">
    <span className="text-gray-700">Atsakymas:</span>
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
