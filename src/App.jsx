import { useEffect, useState } from "react"
import  getRandomIntInclusive  from "./complements/generator"
import Card from "./components/Card"
import "./global.css"

let selectValue = 0

function App() {
  const colors = ['rgb(110, 110, 235)', 'rgb(147, 119, 218)', 
                  'rgb(183, 128, 200)', 'rgb(219, 137, 182)',
                  'rgb(255, 145, 164)']

  const [color, setColor] = useState(0)
  const [list, setList] = useState("")
  const [listagem, setListagem] = useState([])
  
  let saves = localStorage.getItem('list')
  
  useEffect( () => {
    if (saves) {
      catchStorage()
    }
  }, [])

  useEffect(()=> {
    saveStorage()
  }, [listagem])

  const options = [
    {id: 0, name: '0'},
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 4, name: '4'}
  ]

  const addList = () => {
    const newTodo = {
      "color": colors[color],
      "dever": list,
      "id": getRandomIntInclusive(2, 999),
      "style": {'text': 'none', 'color': 'white'}
    }
    setListagem((prevState) => [...prevState, newTodo])
    document.getElementsByClassName("inputCard")[0].focus()
    document.getElementsByClassName("inputCard")[0].value = ""
   }

  const saveStorage = () => {
    const save = JSON.stringify(listagem)
    localStorage.setItem('list', save)    
  }

  const catchStorage = async () => {
      let json = JSON.parse(saves)
      setListagem([...json]) 
 }
 


  const removeTask = (id) => {
    const newListagem = listagem.filter(item => (
      item.id != id
    ))

    setListagem(newListagem)
  }

  const clearList = () => {
    let cleared = [{"id": 0, "style": {'text': 'none', 'color': 'white'}}]
    setListagem(cleared)
  }
  
  const finishTask = (id) =>{
    const newListagem = listagem.filter(item => (
      item.id == id
    ))
    removeTask(id)
    newListagem[0].style.text = 'line-through'
    newListagem[0].style.color = '#dfdbdb'
    setListagem((prevState) => [...prevState, ...newListagem])
  }
 
  return (
    <div className="container">
      <div className="entrada">
        <input type="text" onChange={ e => {
          setList(e.target.value)
        }} className = "inputCard"/>
        <div className="inputCor">
        <select onChange = { e => {setColor(e.target.value)}}>
          {
            options.map((item, index) => (
              <option key = {item.id} value={item.id}>{item.name}</option>
            ))
          }      
        </select>
        <div className="cor"><div className="box-cor" style={{background: colors[color]}}></div></div>
        </div>
      </div>
      <div className="botoes">
            <button type = 'button' onClick={addList}>Adicionar tarefa</button>
            <button onClick={clearList}>Limpar tudo</button>
          </div>
      <div className="cards">
        {
        listagem.map(e => {
          return (
            <Card id = {e.id} 
            key = {e.id} color = {e.color} name = {e.dever} 
            removeTask = {removeTask} finishTask = {finishTask} 
            text = {e.style.text} textColor = {e.style.color}/>
          )
        })
        }
      </div>
    </div>
  )
}

export default App
