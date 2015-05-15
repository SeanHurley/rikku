defmodule Rikku.Router do
  use Rikku.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Rikku do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index

    resources "/tasks", TaskController
  end

  # Other scopes may use custom stacks.
  # scope "/api", Rikku do
  #   pipe_through :api
  # end
end
