import { useState, useEffect } from 'react'
import './App.css'
import Welcome from './components/Welcome/Welcome'
import Question from './components/Question/Question'
import { customizeResponse } from './utils/questionUtils'

function App() {
  //Manage State
    //Maintains the list of questions
  const [questionList, setQuestionList] = useState()
    //Tracks the number of correct answers when the user
    //clicks the "check" button
  const [numberCorrect, setNumberCorrect] = useState(0)
    //Manages whether or not the user has ended the game
  const [gameOver, setGameOver] = useState(false)
    //Manages whether or not the user has clicked passed the
    //Welcome screen
  const [gameStarted, setGameStarted] = useState(false)

  //Used to get a new set of questions when the user
  //restarts the game
  useEffect(() => {
    if(!gameOver) {
      const fetchData = async () => {
        const qlist = await customizeResponse();
        setQuestionList(qlist)
      }
      fetchData()
      }
  },[gameOver])
  
  //gets passed to the question component and handles clicks
  //on the answer items
  function answerClickHandler(event, questionId, answerId) {
    //Shallow copy the question list
    const newQuestions = [...questionList]
    //get the ID of the question (I put the questionID on the
    //on the answer as well)
    const currentQuestion = newQuestions.find((question) => {
      return question.id === questionId
    })
    //Iterate through all of the answers and find the one that was clicked
    currentQuestion.answerList.map((answer) => answer.selected=false)
    const selectedAnswer = currentQuestion.answerList.find((answer) => {
      return answer.id === answerId
    })
    //Add a new property to the answer, indicating it is clicked
    selectedAnswer.selected = true
    setQuestionList(() => newQuestions)
  }

  //Starts the game from the welcome screen
  function startButtonClickHandler(e) {
    e.preventDefault()
    setGameStarted(true)
  }

  const questions = renderQuestions()
  //Creates the list of questions
  function renderQuestions() {
    //Make sure there's a list to render
    if(questionList) {
      return (
      <div>
        {questionList.map((question) => {
          return <Question 
            key={question.id} 
            id={question.id}
            question={question.question} 
            answers={question.answerList}
            handleClick={answerClickHandler}
          /> 
        })}
      </div>
      )
    } else {
      //Fail kinda gracefully
      return <p>Something&apos;s not quite right </p>
    }
  }
  //Called by the button at the bottom of the quiz
  //checks the answers to see what's correct
  function checkQuizAnswers(e) {
    e.preventDefault()
    //Shallow copy again...
    const questionCheck = [...questionList]
    //Iterate through the questions
    const correctQuestions = questionCheck.map((question) => {
      //Iterate through the answers
      const answers = question.answerList.map((answer) => {
        //shallow copy the answer so we arent' changing the 
        //original
        answer = {...answer, checked: true }
        //If the answer is selected, and correct they got it
        //Right. I think this may be overcomplicated.
        if(answer.selected) {
          if(answer.correct) {
            //Update the state if it was right
            setNumberCorrect((numberCorrect)=> numberCorrect + 1)
          }
        }
        return answer
      })
      question.answerList = answers
      return question
    })
    //Update the state of the question list
    setQuestionList(questionCheck)
    //Mark the game as over
    setGameOver(true)
  }

  //Restart button after checking answers
  function restartGame(e) {
    e.preventDefault()
    setGameOver(false)
    setNumberCorrect(0)
  }

  //The different options for the bottom of the page
  //While the quiz is active it's a button to check
  //answers, but when that butt is clicked it becomes
  //a score and restart button.
  const footer = renderFooter()
  function renderFooter() {
    if (questionList) {
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
    } else {
      return (
        <button
          onClick={restartGame}
          className='btn'>
            Try Again
        </button>
      )
    }
  }

  //This is the "main" portion of the app
  return (
    <div className='container'>
      {gameStarted ? <>
            {questions}
            {footer}
        </> :
        <Welcome clickHandler={startButtonClickHandler} />
        } 
     </div>
  )
}

export default App
