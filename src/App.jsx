import { useState, useEffect } from 'react'
import './App.css'
import Welcome from './components/Welcome/Welcome'
import Question from './components/Question/Question'

import { nanoid } from 'nanoid'
import { customizeResponse } from './utils/questionUtils'
import he from "he"



function App() {
  const [questionList, setQuestionList] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const qlist = await customizeResponse();
      console.log('qlist: ', qlist)
      setQuestionList(qlist)
    }
    fetchData()
  },[])
  console.log('questionList: ', questionList)

  function questionClickHandler(event, questionId, answerId) {
    const newQuestions = [...questionList]
    const currentQuestion = newQuestions.find((question) => {
      return question.id === questionId
    })
    currentQuestion.answerList.map((answer) => answer.selected=false)
    const selectedAnswer = currentQuestion.answerList.find((answer) => {
      return answer.id === answerId
    })
    selectedAnswer.selected = true
    setQuestionList(() => newQuestions)
  }

  function renderQuestions() {
    if(questionList) {
      return (
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
      )
    } else {
      return <p>getting questions</p>
    }
  }
  const questions = renderQuestions()
  function checkQuizAnswers(e) {
    e.preventDefault()
    console.log(e.target)
    const questionCheck = [...questionList]
    const correctQuestions = questionCheck.map((question) => {
      const answers = question.answerList.map((answer) => {
        answer = {...answer, checked: true }
        if(answer.selected) {
          if(answer.correct) {
            answer = {...answer, right: true}
          } else {
            answer = {...answer, right: false}
          }
        }
        // console.log('answer: ', answer)
        return answer
      })
      question.answerList = answers
      console.log('question: ', question)
      return question
    })
    setQuestionList(questionCheck)
  }
  return (
    <>
      <Welcome />
      <div className='container'>

      {questions}
      <button onClick={checkQuizAnswers} className='app--check-answers-btn'>Check Answers</button>
      </div>
    </>
  )
}

export default App
