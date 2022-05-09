import "./style.css"


function Card(props) {
    if (props.id !== 1 && props.id !== 0) {
        return (
            <div className="principal" onDoubleClick={() => props.finishTask(props.id)}>
                <div className="card" style = {{backgroundColor: props.color}}>
                    <p style= {{textDecoration: props.text, color: props.textColor}}>{props.name}</p>
                    <div className="x" style={{color: props.color}} onClick = {() => props.removeTask(props.id)}>
                        X
                    </div>
                </div>
            </div>
        )
    }
    
}


export default Card