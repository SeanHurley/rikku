import TaskSocket from '../services/TaskSocket'

export default {
  addTask(length, title, info, date) {
    TaskSocket.addTask(length, title, info, date)
  }
}
