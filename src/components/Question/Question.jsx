import "./Question.css"

function Question(props) {
    const answerList = getAnswerList()
    function getAnswerClass(answer) {
        //answer classnames...
        //If right doesn't exist, we haven't checked answers yet
        //We have 2 possible states. Selected or not
        //If right does exist we have 3 possible states
        //Selected and incorrect, selected an correct
        //Not selected
        let answerClass=""
        if(answer.checked) {
          console.log('answer: ', answer)
          //The answers have been checked
          if(answer.right) {
              //They got the right answer
              answerClass = "correct"
          } else {
            //answer.right != true
            if(answer.selected) {
              answerClass = "incorrect"
            } else {
              //the answer wasn't right and wasn't selected
              answerClass = "unused"
            }
          }  
        } else {
          if(answer.selected) {
            answerClass = "selected"
          }
        }
        return answerClass
    }
    function getAnswerList() {
        const answerArray = props.answers
        return answerArray.map(answer => {
          const ansClass = getAnswerClass(answer)
            return <li 
                onClick={(e) => props.handleClick(e, props.id, answer.id)} 
                id={answer.id} 
                key={answer.id}
                className={ansClass}>
                    {answer.answerText}
                </li>
        })
    }


    return (
        <section className="question">
            <h1>{props.question}</h1>
            <ul>
                {answerList}
            </ul>
            <hr/>
        </section>
    )
}

export default Question