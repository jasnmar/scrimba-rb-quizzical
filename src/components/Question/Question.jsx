import "./Question.css";

function Question(props) {
  const answerList = getAnswerList();
  //Logic to figure out what class should be applied to the
  //answer. I was riding the struggle bus trying to figure
  //this out.
  function getAnswerClass(answer) {
    let answerClass = "";
    if (answer.checked) {
      //The answers have been checked
      if (answer.correct) {
        //This is the correct answer
        answerClass = "correct";
      } else {
        //answer.right != true
        if (answer.selected) {
          answerClass = "incorrect";
        } else {
          //the answer wasn't right and wasn't selected
          answerClass = "unused";
        }
      }
      //The answers have not been checked
      //(the game is still active)
    } else {
      if (answer.selected) {
        answerClass = "selected";
      }
    }
    return answerClass;
  }

  //Builds the list of answers associated with a question.
  function getAnswerList() {
    const answerArray = props.answers;
    //Iterate throught the answers in the array
    return answerArray.map((answer) => {
      //Get the class the answer should have from logic above
      const ansClass = getAnswerClass(answer);
      //Builds the answer element
      return (
        <li
          onClick={(e) => props.handleClick(e, props.id, answer.id)}
          id={answer.id}
          key={answer.id}
          className={ansClass}
        >
          {answer.answerText}
        </li>
      );
    });
  }

  //the "main" section of the component
  return (
    <section className="question">
      <h1>{props.question}</h1>
      <ul>{answerList}</ul>
      <hr />
    </section>
  );
}

export default Question;
