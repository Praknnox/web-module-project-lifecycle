import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

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
        <TodoList 
        toggCheck={this.toggCheck}
        todos={this.state.todos}
        display={this.state.display}
        />
        <Form 
        subHand={this.subHand}
        taskName={this.state.taskName}
        changeHand={this.changeHand}
        toggleDis={this.toggleDis}
        display={this.state.display}
        />
      </div>
    )
  }
}
