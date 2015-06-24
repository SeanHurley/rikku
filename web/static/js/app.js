import {Socket} from "phoenix";

let App = {
  init: function() {
    this.socket = new Socket("/ws");
    this.socket.connect();
    this.socket.onClose( e => console.log("CLOSE", e))

    this.toDoListContainer = $("#to_do_list_container");
    this.toDoList = $("#to_do_list");
    this.newtask = $("#new_task");
    this.sortableCollection = {};
    var app = this;
    var chan = this.socket.chan("tasks:list", {});

    chan.join().receive("ignore", () => console.log("auth error"))
      .receive("ok", () => console.log("join ok"))
      .after(10000, () => console.log("Connection interruption"));
    chan.onError(e => console.log("something went wrong", e));
    chan.onClose(e => console.log("channel closed", e));
    app.bindAndListenToEvents(chan);
  },

  bindAndListenToEvents: function(channel) {
    this.bindEventsForCreatingtask(channel);
    this.listenToCreatingtaskEvent(channel);
    this.bindEventsForDeletingtask(channel);
    this.listenToDeletingtaskEvent(channel);
    this.bindEventForEditingtask();
    this.bindEventsForUpdatingtask(channel);
    this.listenToUpdatingtaskEvent(channel);
  },
  bindEventsForCreatingtask: function(channel) {
    var app = this;
    this.newtask.off("keypress").on("keypress", function(e){
      if(e.keyCode == 13) { // enter key
        channel.push("create:task", {
          task: {
            length: 10,
            date: {
              day:17,
              month: 6,
              year: 2015
            },
            title: app.newtask.val()
          }
        });
        app.newtask.val("");
      }
    });
  },
  listenToCreatingtaskEvent: function(channel) {
    var app = this;
    channel.on("create:task", function(data){
      var task = data.task;
      app.toDoList.append("<li>" + task.length + " - " + task.title + " - " + task.info + "</li>");
    });
  },
  bindEventForEditingtask: function() {
    this.toDoListContainer.delegate("span.edit-task", "click", function(e) {
      var taskContainer = $(this).parent();
      var taskDescription = taskContainer.find("span.task-description");
      var edittaskDescription = taskContainer.find("span.edit-task-description");
      taskDescription.toggleClass("hidden");
      edittaskDescription.toggleClass("hidden").find("input").val(taskDescription.html()).focus();
      if($(this).hasClass("cancel-edit-task")) {
        $(this).html("edit");
      } else {
        $(this).html("cancel");
      }//end else
      $(this).toggleClass("cancel-edit-task");
    });
  },
  bindEventsForUpdatingtask: function(channel) {
    var app = this;
    app.toDoListContainer.delegate("span.edit-task-description input", "keypress", function(e) {
      if(e.keyCode == 13) {
        var newDescription = $(this).val();
        var taskContainer = $(this).parents("li:first");
        var taskDescription = taskContainer.find("span.task-description");
        var taskCheckBox = taskContainer.find("input.task-done");
        var edittaskLink = taskContainer.find("span.edit-task");
        var edittaskDescription = taskContainer.find("span.edit-task-description");
        taskDescription.html(newDescription).toggleClass("hidden");
        edittaskDescription.toggleClass("hidden");
        edittaskLink.html("edit");

        channel.push("update:task", {
          task_id: taskCheckBox.attr("id").replace("task_", ""),
          task: { description: newDescription }
        });
      }
    });
  },
  listenToUpdatingtaskEvent: function(channel) {
    var app = this;
    channel.on("update:task", function(data) {
      var task = data.task;
      app.toDoListContainer.find("#task_" + task.id)
      .parent().find("span.task-description").html(task.description);
    });
  },
  bindEventsForDeletingtask: function(channel) {
    var app = this;
    app.toDoListContainer.delegate("span.delete-task", "click", function(e) {
      var taskContainer = $(this).parent();
      taskContainer.fadeOut(function() {
        var taskCheckBox = taskContainer.find("input.task-done");
        taskContainer.remove(); // remove the task from the list
        channel.push("delete:task", {task_id: taskCheckBox.attr("id").replace("task_", "")});
      });
    });
  },
  listenToDeletingtaskEvent: function(channel) {
    var app = this;
    channel.on("delete:task", function(data) {
      var task = data.task;
      app.toDoListContainer.find("#task_" + task.id).parent().fadeIn(function() {
        $(this).remove();
      });
    });
  }
}

$( () => App.init() )

export default App
