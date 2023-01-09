import axios from 'axios';
import React, { useState, useContext} from 'react'

const table = {
  books: 10,
  film: 11,
  nature: 17,
  computers: 18,
  mathematics: 19,
  sports: 21,
  geography: 22,
  history: 23,
  politics: 24,
  celebrities: 26
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage]  = useState(0);
  const [correct, setCorrect]  = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [questions, setQuestions] = useState({
    amount: 10,
    category: 'any category',
    difficulty: 'any difficulty'
    
  });
  
  const fetchUrl = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err))

    if (response) {
      const results = response.data.results;
      if (results.length > 0) {
        setData(results);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true)
    }
  }

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setModalOpen(false);
  }

  const checkAnswer = (val) => {
     if (val) {
      setCorrect(prevCorrect => prevCorrect + 1)
     }
     handlePage();
  }


  const handlePage = () => {
    setPage(prevPage => {
      const currPage = prevPage + 1;
      if (currPage > data.length - 1) {
        openModal();
        return 0;
      } else {
        return currPage;
      }
    })
  }
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuestions({ ...questions, [name]: value })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

   const { amount, category, difficulty } = questions;
   
   const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
   fetchUrl(url);
   
  }


  return <AppContext.Provider value={{
    questions,
    handleChange,
    handleSubmit,
    data,
    loading,
    page,
    handlePage,
    waiting,
    modalOpen,
    closeModal,
    correct,
    checkAnswer,
    error
  }} >
  {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
