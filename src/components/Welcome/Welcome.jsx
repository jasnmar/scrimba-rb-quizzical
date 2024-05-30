import "./Welcome.css"

function Welcome(props) {
    return (
        <main className="welcome--main">
            <h1>Quizzical</h1>
            <h2>A quick little quiz game</h2>
            <button onClick={props.clickHandler} className="btn">Start quiz</button>
        </main>
    )
}

export default Welcome