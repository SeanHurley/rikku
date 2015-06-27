defmodule Rikku.RTasksController do
  use Phoenix.Controller
  import Ecto.Query
  alias Rikku.Task

  plug :action

  def index(conn, _params) do
    render(conn, "index.html", tasks: tasks)
  end
end
