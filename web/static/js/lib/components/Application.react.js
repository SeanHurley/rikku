import React from 'react'
import Immutable from 'immutable'
import TaskColumn from './TaskColumn.react'
import TaskStore from '../stores/TaskStore'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

export default class Application extends React.Component {
  mixins: [ ImmutableRenderMixin ]

  constructor(props) {
    super(props)
    this.state = { tasks: TaskStore.getAll() }
  }

  componentDidMount() {
    TaskStore.addChangeListener(this.onChange.bind(this))
  }

  componentWillUnmount() {
    TaskStore.removeChangeListener(this.onChange.bind(this))
  }

  onChange() {
    this.setState({ tasks: TaskStore.getAll() })
  }

  render() {
    var date = this.getToday()
    var key = date.year + "-" + date.month + "-" + date.day
    var data = this.state.tasks.get(key)
    if (data === undefined) {
      data = Immutable.List()
    }

    return (
      <div>
        <div style={{display: "inline-block"}}>
          <TaskColumn data={data} date={date}/>
        </div>
      </div>
    )
  }

  getToday() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    if(day < 10) {
      day = '0' + day
    }

    if(month < 10) {
      month = '0' + month
    }

    return {
      day: day,
      month: month,
      year: year
    }
  }
}
