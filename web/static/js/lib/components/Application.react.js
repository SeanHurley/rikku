import React from 'react'
import Immutable from 'immutable'
import TaskColumn from './TaskColumn.react'
import DateStore from '../stores/DateStore'
import TaskStore from '../stores/TaskStore'
import TaskSocket from '../services/TaskSocket'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

export default class Application extends React.Component {
  mixins: [ ImmutableRenderMixin ]

  constructor(props) {
    super(props)
    this.state = { tasks: TaskStore.getAll(), date: DateStore.get() }
  }

  componentDidMount() {
    TaskStore.addChangeListener(this.onChange.bind(this))
    DateStore.addChangeListener(this.onChangeDate.bind(this))
  }

  componentWillUnmount() {
    TaskStore.removeChangeListener(this.onChange.bind(this))
    DateStore.removeChangeListener(this.onChangeDate.bind(this))
  }

  onChange() {
    this.setState({ tasks: TaskStore.getAll(), date: this.state.date })
  }

  onChangeDate() {
    this.setState({ tasks: this.state.tasks, date: DateStore.get() })
  }

  render() {
    var date = this.state.date
    var key = date.year + "-" + date.month + "-" + date.day
    var data = this.state.tasks.get(key)
    if (data === undefined) {
      data = Immutable.List()
    }
    TaskSocket.join(key)

    return (
      <div>
        <div style={{display: "inline-block"}}>
          <TaskColumn data={data} date={date}/>
        </div>
      </div>
    )
  }
}
