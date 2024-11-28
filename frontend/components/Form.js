import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <div>
        <form id='todoform' 
        onSubmit={this.props.subHand}>
          <input 
          type='text' 
          placeholder='type todo' 
          value={this.props.taskName} 
          onChange={this.props.changeHand}
          ></input>
          <input type='submit'></input>
        </form>
          <button onClick={this.props.toggleDis}>
            {this.props.display?'Clear finished tasks':'Show All Tasks'}
            </button>
      </div>
    )
  }
}
