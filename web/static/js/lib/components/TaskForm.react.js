import React from 'react'
import TaskViewActions from '../actions/TaskViewActions'

export default class TaskForm extends React.Component {
  onAddClick(e) {
    e.preventDefault();
    var length = this.getValue(this.refs.length);
    var title = this.getValue(this.refs.title);
    var info = this.getValue(this.refs.info);
    TaskViewActions.addTask(length, title, info, this.props.date);
    this.focusInput()
  }

  getValue(key) {
    var node = React.findDOMNode(key);
    var value= node.value.trim();
    node.value = ""

    return value
  }


  componentDidMount() {
    this.focusInput()
  }

  focusInput() {
    var node = React.findDOMNode(this.refs.length)
    node.focus()
  }

  render() {
    return (
      <form onSubmit={this.onAddClick.bind(this)}>
        <div className="form-group col-md-4">
          <label>Length</label>
          <input autofocus="autofocus" ref="length" className="form-control" type="number"/>
        </div>

        <div className="form-group col-md-4">
          <label>Title</label>
          <input className="form-control" ref="title" type="text"/>
        </div>

        <div className="form-group col-md-4">
          <label>Info</label>
          <input className="form-control" ref="info" type="text"/>
        </div>

        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Submit"/>
        </div>

      </form>
    )
  }
}
