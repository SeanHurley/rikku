import DateChange from './DateChange.react'
import React from 'react'
import Task from './Task.react'
import TaskList from './TaskList.react'
import TaskForm from './TaskForm.react'

export default class TaskColumn extends React.Component {

  render() {
    return (
      <div>
        <DateChange/>
        <TaskForm data={this.props.data} date={this.props.date}/>
        <TaskList data={this.props.data} date={this.props.date}/>
      </div>
    )
  }
}
