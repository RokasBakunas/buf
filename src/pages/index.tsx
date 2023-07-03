import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import Footer from './../components/footer/footer';
import Header from './../components/header/header';
import Logout from "./../components/logout/logout";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const router = useRouter();

  const [answered, setAnswered] = useState(null);  

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = Cookies.get('jwt'); 
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await axios.get(`http://localhost:3001/questions/answered=${answered}`, {
          headers: {
            Authorization: token,
          },
        });

 


        setQuestions(response.data);
      } catch (error) {
        console.error(error);
               // tikrinam ar galiojantis token, jei negalioja trinam cookies jwt ir perkeliam i login psl
               if (error.response && error.response.status === 401) {
                Cookies.remove('jwt'); 
                router.push('/login');
                return;
              }
      }
    };

    fetchQuestions();
  }, [answered]);

  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center">
        
      <div className="flex m-5 p-5">
  
    <button className='m-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={() => setAnswered(null)}>
        Visi
      </button>  
      <button className='m-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={() => setAnswered(true)}>
        Su atsakymais
      </button>
      <button className='m-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={() => setAnswered(false)}>
        Be atsakymų
      </button>

</div>




        <h1 className='p-3'>Vartotoju užduoti klausimai:</h1>
        {questions.map((question) => (
          <div key={question.id}>
            <Link href={`/question/${question.id}`}>
              <div className='p-2 m-1'>{question.question_text} ({question.answers_id ? question.answers_id.length : 0})</div>
            </Link>
          </div>
          
        ))}
      </div>

      <Footer /><Logout/>
    </>
  );
}

