defmodule Rikku.RTaskChannel do
  use Phoenix.Channel
  require Logger

  alias Rikku.Repo
  alias Rikku.Task

  import Ecto.Query

  def join("tasks:list:" <> key, _message, socket) do
    Logger.debug "> join #{socket.topic}"
    [year, month, day] = String.split(key, "-")
    query = from t in Task,
          where: t.date == ^%Ecto.DateTime{year: year, month: month, day: day},
          order_by: [desc: t.inserted_at],
          select: t
    tasks = Repo.all(query)
    {:ok, %{tasks: tasks}, socket}
  end

  def handle_in("create:task", %{"task" => params}, socket) do
    Logger.debug "> create"
    task = create_task(params)
    if task do
      broadcast socket, "create:task", %{task: task}
    end
    {:reply, {:ok, %{msg: "test"}}, socket}
  end

  def event(socket, "delete:task", data) do
    task = delete_task(data["task_id"])
    broadcast socket, "delete:task", %{task: task}
    socket
  end

  def event(socket, "update:task", %{"task_id" => task_id, "task" => params}) do
    task = update_task(task_id, params)
    if task, do: broadcast(socket, "update:task", %{task: task})
    socket
  end

  def delete_task(task_id) do
    case Repo.get(Task, String.to_integer(task_id)) do
      task when is_map(task) ->
        Repo.delete(task)
        task
      _ ->
        nil
    end
  end

  defp update_task(task_id, params) do
    case Repo.get(Task, String.to_integer(task_id)) do
      task when is_map(task) ->
        atomized_keys_params = atomize_keys(params)
        task = Map.merge(task, atomized_keys_params)
        case task.validate(task) do
          [] ->
            Repo.update(task)
            task
          _ ->
            nil
        end
      _ ->
        nil
    end
  end

  defp create_task(params) do
    changeset = Task.changeset(%Task{}, params)

    if changeset.valid? do
      Repo.insert(changeset)
    else
      Logger.debug(changeset)
    end
  end


  defp atomize_keys(struct) do
    Enum.reduce struct, %{}, fn({k, v}, map) -> Map.put(map, String.to_atom(k), v) end
  end
end
