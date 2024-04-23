import { useState, useEffect } from 'react'
import './App.css'
import Welcome from './components/Welcome/Welcome'
import Question from './components/Question/Question'

import { nanoid } from 'nanoid'
import { customizeResponse } from './utils/questionUtils'
import he from "he"

function App() {
  const [questionList, setQuestionList] = useState()
  const [numberCorrect, setNumberCorrect] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    if(!gameOver) {
    const fetchData = async () => {
      const qlist = await customizeResponse();
      console.log('qlist: ', qlist)
      setQuestionList(qlist)
    }
    fetchData()
    }
  },[gameOver])
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

  function startButtonClickHandler(e) {
    e.preventDefault()
    setGameStarted(true)
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
    const questionCheck = [...questionList]
    const correctQuestions = questionCheck.map((question) => {
      const answers = question.answerList.map((answer) => {
        answer = {...answer, checked: true }
        if(answer.selected) {
          if(answer.correct) {
            answer = {...answer, right: true}
            setNumberCorrect((numberCorrect)=> numberCorrect + 1)
          } else {
            answer = {...answer, right: false}
          }
        }
        return answer
      })
      question.answerList = answers
      return question
    })
    setQuestionList(questionCheck)
    setGameOver(true)
  }
  function restartGame(e) {
    e.preventDefault()
    setGameOver(false)
    setNumberCorrect(0)

  }

  const footer = renderFooter()
  function renderFooter() {
    return gameOver ? <div className='footer'>
      <p className='score'>
        You scored {numberCorrect}/5 correct answers</p>
        <button 
          onClick={restartGame}
          className="btn">
          NewGame
        </button> 
    </div>: 
    <button 
      onClick={checkQuizAnswers} 
      className='btn'>
        Check Answers
    </button>
  }

  return (
    <>
    <div className='container'>
      {gameStarted ? <>
            {questions}
            {footer}
        </> :
        <Welcome clickHandler={startButtonClickHandler} />
        } 
     </div>
    </>
  )
}

export default App
