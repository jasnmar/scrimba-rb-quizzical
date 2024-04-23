import "./Welcome.css"

function Welcome(props) {
    return (
        <main className="welcome--main">
            <h1>Quizzical</h1>
            <h2>Some description if needed</h2>
            <button onClick={props.clickHandler} className="btn">Start quiz</button>
        </main>
    )
}

export default Welcome