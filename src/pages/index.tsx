import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import Footer from './../components/footer/footer';
import Header from './../components/header/header';

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

        const response = await axios.get(`http://94.244.94.82:3001/questions/answered=${answered}`, {
          headers: {
            Authorization: token,
          },
        });


        //bandom rusiuoti pagal data
        const sortedQuestions = response.data.sort((a, b) => {
          const dateA = new Date(a.addDate);
          const dateB = new Date(b.addDate);
          return dateB - dateA;
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
            <title>BestQuestion</title>

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




          <h1 className='rounded-lg	box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white mb-2 py-1 px-3'>
            Mūsų bendruomenės nariai, kurie turi atitinkamas žinias ar patirtį, atsakys į jūsų klausimus.</h1>

          <table className='table-fixed sm'>            
            <thead>
    <tr>
      <th>Klausimas</th>
      <th>Atsakymų</th>
    </tr>
  </thead>
  <tbody>
        {questions.map((question) => (
       
            <tr key={question.id} className='questionsTable '>
      <td className='text-center'><Link href={`/question/${question.id}`}>{question.question_text}</Link></td>
      <td className='text-center'>{question.answers_id ? question.answers_id.length : 0}</td>
    
    </tr>
  


  
            
            
          
        ))}
          </tbody>
</table>


      </div>

      <Footer />
    </>
  );
}

