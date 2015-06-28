import TaskSocket from '../services/TaskSocket'
import AppDispatcher from '../dispatcher/AppDispatcher'

export default {
  addTask(length, title, info, date) {
    TaskSocket.addTask(length, title, info, date)
  },
  dateBack() {
    AppDispatcher.dispatch({
      actionType: "back_date",
    })
  },
  dateForward() {
    AppDispatcher.dispatch({
      actionType: "forward_date",
    })
  }
}
