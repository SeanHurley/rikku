import AppDispatcher from '../dispatcher/AppDispatcher'

export default {

  newTask(task) {
    AppDispatcher.dispatch({
      actionType: "new_task",
      task,
    })
  }
}
