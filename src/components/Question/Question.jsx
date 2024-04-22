import "./Question.css"

function Question(props) {
    const answerList = getAnswerList()
    function getAnswerList() {
        const answerArray = props.answers
        return answerArray.map(answer => {
            return <div 
                onClick={(e) => props.handleClick(e, props.id, answer.id)} 
                id={answer.id} 
                key={answer.id}>
                    {answer.answerText}
                </div>
        })
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