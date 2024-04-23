import "./Question.css"

function Question(props) {
    const answerList = getAnswerList()
    function getAnswerList() {
        const answerArray = props.answers
        return answerArray.map(answer => {
            return <li 
                onClick={(e) => props.handleClick(e, props.id, answer.id)} 
                id={answer.id} 
                key={answer.id}
                className={answer.selected ? "selected" : undefined}>
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