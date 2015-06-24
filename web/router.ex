defmodule Rikku.Router do
  use Rikku.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
  end

  scope "/" do
    pipe_through :browser # Use the default browser stack

    # get "/", TaskController, :index
    resources "/tasks", Rikku.TaskController

    get "/", Rikku.RTasksController, :index, as: :root
  end

  socket "/ws" do
    channel "tasks:*", Rikku.RTaskChannel
  end
end
