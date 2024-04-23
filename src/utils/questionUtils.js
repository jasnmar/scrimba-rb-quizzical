import { nanoid } from 'nanoid'
import { data } from '../data'
import he from "he"
const tmp = false
//Turn this off for prod
const debug = false

//I want the shape of the data to be a little different than the
//way the API returns it, so I'm reshaping it a bit.
export async function customizeResponse() {

  try {
    const apiResponse = await getQuestions()
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

  } catch (err) {
    console.error(err)
  }
}

//So that I don't slam the API I have some data
//locally to work with
async function getQuestions() {
  if (debug) {
    return data;
  } else {
    return fetchQuestions();
  }
}

//Calls the opentrivia DB.
//Not being used for dev, as they have rate limits and vite
//refreshes kill it.
async function fetchQuestions() {
  const res = await fetch("https://opentdb.com/api.php?amount=5");
  const questionObject = await res.json();
  return questionObject;
}

//The opentrivia DB returns a list of incorrect answers
//as well as a correct answer. I want them all combined
//so that they are easy to render. This makes them into
//an array of objects, with one of them having a 
//correct: true field.
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

//Just a little utility that builds the answer object
//in a consistent way
function writeAnswer(text, correct, qid) {
  return {
    answerText: 
    he.decode(text), 
    correct: correct, 
    questionid: qid, 
    id: nanoid(),
    selected: false
  }
}

//Used to figure out where in the answer list to insert 
//the correct answer
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}