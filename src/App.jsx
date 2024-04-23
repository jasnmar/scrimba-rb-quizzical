import { useState, useEffect } from 'react'
import './App.css'
import Welcome from './components/Welcome/Welcome'
import Question from './components/Question/Question'

import { nanoid } from 'nanoid'
import { customizeResponse } from './utils/questionUtils'
import he from "he"



function App() {
  const [questionList, setQuestionList] = useState(customizeResponse())

  function questionClickHandler(event, questionId, answerId) {
    // console.log('a.target:', event.target)
    // console.log('questionId: ', questionId)
    // console.log('answerId: ', answerId)
    const newQuestions = [...questionList]
    const currentQuestion = newQuestions.find((question) => {
      return question.id === questionId
    })
    currentQuestion.answerList.map((answer) => answer.selected=false)
    const selectedAnswer = currentQuestion.answerList.find((answer) => {
      return answer.id === answerId
    })
    selectedAnswer.selected = true
    // console.log('currentQuestion: ', currentQuestion)
    // console.log('selectedAnswer: ', selectedAnswer)
    // console.log('questionList: ', questionList)
    setQuestionList(() => newQuestions)
  }

  const questions = 
    <div>
      {questionList.map((question) => {
        return <Question 
          key={question.id} 
          id={question.id}
          question={question.question} 
          answers={question.answerList}
          handleClick={questionClickHandler}
        /> 
      })}
        

    </div>

  return (
    <>
      <Welcome />
      {questions}
      <button className='app--check-answers'>Check Answers</button>
    </>
  )
}

export default App
