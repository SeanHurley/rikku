import React from 'react'
import TaskViewActions from '../actions/TaskViewActions'

export default class TaskForm extends React.Component {
  onAddClick(e) {
    e.preventDefault();
    var length = React.findDOMNode(this.refs.length).value.trim();
    var title = React.findDOMNode(this.refs.title).value.trim();
    var info = React.findDOMNode(this.refs.info).value.trim();
    TaskViewActions.addTask(length, title, info, this.props.date);
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
