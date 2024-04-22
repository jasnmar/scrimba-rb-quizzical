import "./Question.css"

function Question(props) {
    const answerList = getAnswerList()
    function getAnswerList() {
        const answerArray = props.answers
        return answerArray.map(answer => {
            return <div id={answer.id} data-questionid={props.question.id} key={answer.id} onClick={doSomething}>{answer.answerText}</div>
        })
    }

    function doSomething() {
        console.log("clicked")
    }

    return (
        <section className="question">
            <h1>{props.question}</h1>
            <div>
                {answerList}
            </div>
        </section>
    )
}

export default Question