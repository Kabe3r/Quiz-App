import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const {questions, handleChange, handleSubmit, error} = useGlobalContext();

  return (
    <main>
    <section className='quiz quiz-small'>
    <form className='setup-form'>
      <h2>quiz app</h2>
      <div className='form-control'>
      <label htmlFor='amount'>number of questions:</label>
      <input type='number' className='form-input' name='amount' id='amount' min={1} max={50} value={questions.amount} onChange={handleChange}  />
      </div>

      {/* Category */}
      <div className="form-control">
        <label htmlFor="category">select category:</label>
        <select name="category" id="category" className="form-input" value={questions.category} onChange={handleChange}>
          <option value='any category'>any category</option>
          <option value='books'>books</option>
          <option value='film'>film</option>
          <option value='nature'>science & nature</option>
          <option value='computers'>science & computers</option>
          <option value='mathematics'>science & mathematics</option>
          <option value='sports'>sports</option>
          <option value='geography'>geography</option>
          <option value='history'>history</option>
          <option value='politics'>politics</option>
        </select>
      </div>

      {/* Diffculty */}
      <div className='form-control'>
            <label htmlFor='difficulty'>select difficulty</label>
            <select
              name='difficulty'
              id='difficulty'
              className='form-input'
              value={questions.difficulty}
              onChange={handleChange}
            >
              <option value='any diffculty'>any difficulty</option>
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>
          {error && (
            <p className='error'>
              can't generate questions, please try different options
            </p>
          )}
      <button className="submit-btn" type='submit' onClick={handleSubmit}>start</button>
    </form>
    </section>
    </main>
  )
}

export default SetupForm
