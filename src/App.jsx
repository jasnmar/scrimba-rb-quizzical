import { useState, useEffect } from 'react'
import './App.css'
import Welcome from './components/Welcome/Welcome'
import Question from './components/Question/Question'
import { data } from './data'
import { nanoid } from 'nanoid'
import he from "he"

const debug = true

function App() {
  const [questionList, setQuestionList] = useState(customizeResponse())
  //So that I don't slam the API I have some data
  //locally to work with
  function getQuestions() {
    if(debug) {
        return data
    } else {
        return fetchQuestions()
    }
  }

  //I want the shape of the data to be a little different than the
  //way the API returns it, so I'm reshaping it a bit.
  function customizeResponse() {
    const apiResponse = getQuestions()
    const questionList = apiResponse.results
    const formattedQuestions = questionList.map(question => {
      const questionId = nanoid()
      const answerList = fixAnswerList(question, questionId)
      question = {
        ...question, 
        question: he.decode(question.question), 
        answerList:answerList, 
        id:questionId}
      return question
    })
    return formattedQuestions
  }
  console.log('questionList: ', questionList)

  function fixAnswerList(question, qid) {
    const answerListLength = question.incorrect_answers.length + 1;
    const randomNumber = getRandomInt(answerListLength)
    const answerList = [...question.incorrect_answers]
    const answerObjects = answerList.map(answer => {
      return writeAnswer(answer, false, qid)
    })
    answerObjects.splice(randomNumber, 0, writeAnswer(question.correct_answer, true, qid))
    return answerObjects
  }

  function writeAnswer(text, correct, qid) {
    return {
      answerText: 
      he.decode(text), 
      correct: correct, 
      questionid: qid, 
      id: nanoid()
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  async function fetchQuestions() {
    const res = await fetch('https://opentdb.com/api.php?amount=5')
    const questionObject = await res.json()
    return questionObject
  }

  const questions = 
    <div>
      {questionList.map((question) => {
        {console.log(question)}
        return <Question key={question.id} question={question.question} answers={question.answerList}/> 
      })}
        

    </div>

  return (
    <>
      <Welcome />
      {questions}
    </>
  )
}

export default App
