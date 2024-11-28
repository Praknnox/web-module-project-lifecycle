import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state={
    todos:[],
    error:'',
    taskName:'',
    display:true
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
  toggCheck=id=>()=>{
    axios.patch(`${URL}/${id}`)
    .then(res=>{
      this.setState({...this.state,todos:this.state.todos.map(td=>{
        if(td.id!==id)return td
        return res.data.data
      })})
    })
    .catch(err=>{this.setState({
      ...this.state,error:err.response.data.message
    })})
  }
  toggleDis=()=>{
    this.setState({...this.state,display:!this.state.display})
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
          {this.state.todos.reduce((acc,td)=>{
            if(this.state.display||!td.completed)return acc.concat(
              <div key={td.id} onClick={this.toggCheck(td.id)}>{td.name}{td.completed?'  :D':''}</div>
            )
              return acc
          },[])}
        </div>
        <form id='todoform' onSubmit={this.subHand}>
          <input type='text' placeholder='type todo' value={this.state.taskName} onChange={this.changeHand}></input>
          <input type='submit'></input>
        </form>
          <button onClick={this.toggleDis}>{this.state.display?'Clear finished tasks':'Show All Tasks'}</button>
      </div>
    )
  }
}
