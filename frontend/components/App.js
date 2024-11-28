import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state={
    todos:[],
    error:'',
    taskName:''
  }
  changeHand=evt=>{
    const {value}=evt.target
    this.setState({...this.state,taskName:value})
  }
  addTodo=()=>{
    axios.post(URL,{name:this.state.taskName})
    .then(res=>{
      this.setState({...this.state,todos:this.state.todos.concat(res.data.data)})
      this.setState({...this.state,taskName:''})
    })
    .catch(err=>{this.setState({
      ...this.state,error:err.response.data.message
    })})
  }
  subHand=evt=>{
    evt.preventDefault()
    this.addTodo()
  }
  getTodos=()=>{
    axios.get(URL)
    .then(res=>{this.setState({
      ...this.state,todos:res.data.data
    })})
    .catch(err=>{this.setState({
      ...this.state,error:err.response.data.message
    })})
  }
  componentDidMount(){
    this.getTodos()
  }
  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
        <div id='todos'>
          <h2>Todos:</h2>
          {this.state.todos.map(td=>{
            return <div key={td.id}>{td.name}</div>
          })}
        </div>
        <form id='todoform' onSubmit={this.subHand}>
          <input type='text' placeholder='type todo' value={this.state.taskName} onChange={this.changeHand}></input>
          <input type='submit'></input>
          <button>Clear</button>
        </form>
      </div>
    )
  }
}
