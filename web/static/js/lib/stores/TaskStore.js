import Immutable from 'immutable'
import {EventEmitter} from 'events'
import AppDispatcher from '../dispatcher/AppDispatcher'

const CHANGE_EVENT = "change"

class TaskStore extends EventEmitter {

  constructor() {
    super()
    this.tasks = Immutable.Map()
    this.register()
  }

  register() {
    AppDispatcher.register( action => {
      switch(action.actionType) {
      case "new_task":
        this.add(action.task)
        this.emitChange()
        break
      default:
        break
      }
    })
  }

  add(task) {
    var dayTasks = this.tasks.get(task.date)
    if (dayTasks === undefined) {
      dayTasks = Immutable.List.of(task)
    } else {
      dayTasks = dayTasks.push(task)
    }
    this.tasks = this.tasks.set(task.date, dayTasks)
  }

  getAll() {
    return this.tasks
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
}

export default new TaskStore()

