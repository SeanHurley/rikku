import Immutable from 'immutable'
import {EventEmitter} from 'events'
import AppDispatcher from '../dispatcher/AppDispatcher'

const CHANGE_EVENT = "change_date"

class DateStore extends EventEmitter {

  constructor() {
    super()
    this.date = this.getToday()
    this.register()
  }

  register() {
    AppDispatcher.register( action => {
      switch(action.actionType) {
      case "back_date":
        this.updateDate(-1)
        this.emitChange()
        break
      case "forward_date":
        this.updateDate(1)
        this.emitChange()
        break
      default:
        break
      }
    })
  }

  get() {
    return this.getHash()
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

  updateDate(diff) {
    this.date.setDate(this.date.getDate() + diff)
  }

  getToday() {
    var today = new Date();
    return today
  }

  getHash() {
    var day = this.date.getDate();
    var month = this.date.getMonth() + 1;
    var year = this.date.getFullYear();

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

export default new DateStore()

