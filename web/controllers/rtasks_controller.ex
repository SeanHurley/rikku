defmodule Rikku.RTasksController do
  use Phoenix.Controller
  import Ecto.Query
  alias Rikku.Task

  plug :action

  def index(conn, _params) do
    query = from t in Task,
          order_by: [desc: t.inserted_at],
          select: t
    tasks = Rikku.Repo.paginate(query, _params)
    render(conn, "index.html", tasks: tasks)
  end
end
