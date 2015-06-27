import TaskServerActions from "../actions/TaskServerActions.js"

let TaskSocket = {

  channel: null,

  join() {
    var socket = new Phoenix.Socket("/ws");
    socket.connect();
    socket.onClose( e => console.log("CLOSE", e))

    this.channel = socket.chan("tasks:list", {});
    this.channel.join().receive("ignore", () => console.log("auth error"))
      .receive("ok", this.initialState.bind(this))
      .after(10000, () => console.log("Connection interruption"));
    this.channel.onError(e => console.log("something went wrong", e));
    this.channel.onClose(e => console.log("channel closed", e));

    this.channel.on("create:task", msg => {
      TaskServerActions.newTask(msg.task)
    })
  },

  initialState(msg) {
    msg.tasks.forEach(t => {
      TaskServerActions.newTask(t)
    })
  },

  addTask(length, title, info, date) {
    this.channel && this.channel.push("create:task", {
      task: {
        length: length,
        date: date,
        title: title,
        info: info,
      }
    });
  }
}

export default TaskSocket
