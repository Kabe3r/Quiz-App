import React from 'react'
import { useGlobalContext } from './context'
import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'

function App() {
  const { loading, data, page, correct, handlePage, waiting, checkAnswer } = useGlobalContext();
    
if (waiting) return  <SetupForm />;
  
if (loading) return <Loading />;  
  
const {question, incorrect_answers, correct_answer} =  data[page];

let options = [...incorrect_answers];
const optIdx = Math.floor(Math.random() * 4);

if (optIdx === 3) {
  options.push(correct_answer);
} else {
  options.push(options[optIdx]);
  options[optIdx] = correct_answer;
}

      return (
        <main>
        <Modal />
        <section className='quiz'>
        <p className="correct-answers">
        correct answers: {correct} / {page}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
          {options.map((opt, index) =>{
            return (
            <button key={index} className="answer-btn" onClick={() => checkAnswer(opt === correct_answer)} dangerouslySetInnerHTML={{ __html: opt }} /> 
            )})}
          </div> 
        </article>
         <button className="next-question" onClick={handlePage}>next question</button>
        </section>
        </main>
      )
     
     
}

export default App
