defmodule Rikku.TaskControllerTest do
  use Rikku.ControllerTestCase

  alias Rikku.Task
  @valid_params task: %{end_time: %{day: 17, hour: 14, min: 0, month: 4, year: 2010}, info: "some info", start_time: %{day: 17, hour: 14, min: 0, month: 4, year: 2010}, title: "some content"}
  @invalid_params task: %{}

  describe "index" do
    it "renders tasks" do
      conn = conn(:get, "/tasks") |> send_request
      assert conn.status == 200
      assert conn.resp_body =~ "Listing tasks"
    end
  end

  describe "new" do
    it "renders tasks" do
      conn = conn(:get, "/tasks/new") |> send_request
      assert conn.status == 200
      assert conn.resp_body =~ "New task"
    end
  end

  describe "create" do
    it "creates tasks with valid data" do
      conn = conn(:post, "/tasks", @valid_params) |> send_request
      assert conn.status == 302
      assert get_resp_header(conn, "location") == ["/tasks"]

      [task] = Rikku.Task
      |> where([t], t.title == "some content")
      |> Rikku.Repo.all

      assert task.title == "some content"
      assert task.info == "some info"
      assert task.end_time == %Ecto.DateTime{day: 17, hour: 14, min: 0, month: 4, sec: 0, usec: 0, year: 2010}
      assert task.start_time == %Ecto.DateTime{day: 17, hour: 14, min: 0, month: 4, sec: 0, usec: 0, year: 2010}
    end

    it "shows the new page with invalid data" do
      conn = conn(:post, "/tasks", @invalid_params) |> send_request
      assert conn.status == 200
      assert conn.resp_body =~ "New task"

      tasks = Rikku.Task
      |> where([t], t.title == "some content")
      |> Rikku.Repo.all

      assert tasks == []
    end
  end

  describe "show" do
    it "renders a task" do
      task = Rikku.Repo.insert %Task{}
      conn = conn(:get, "/tasks/#{task.id}") |> send_request
      assert conn.status == 200
      assert conn.resp_body =~ "Show task"
    end
  end

  describe "edit" do
    it "renders a task" do
      task = Rikku.Repo.insert %Task{}
      conn = conn(:get, "/tasks/#{task.id}/edit") |> send_request
      assert conn.status == 200
      assert conn.resp_body =~ "Edit task"
    end
  end

  describe "update" do
    it "updates tasks with valid data" do
      task = Rikku.Repo.insert %Task{}
      conn = conn(:put, "/tasks/#{task.id}", @valid_params) |> send_request
      assert conn.status == 302
      assert get_resp_header(conn, "location") == ["/tasks"]

      [task] = Rikku.Task
      |> where([t], t.title == "some content")
      |> Rikku.Repo.all

      assert task.title == "some content"
      assert task.info == "some info"
      assert task.end_time == %Ecto.DateTime{day: 17, hour: 14, min: 0, month: 4, sec: 0, usec: 0, year: 2010}
      assert task.start_time == %Ecto.DateTime{day: 17, hour: 14, min: 0, month: 4, sec: 0, usec: 0, year: 2010}
    end

    it "renders the edit page with invalid data" do
      task = Rikku.Repo.insert %Task{}
      conn = conn(:put, "/tasks/#{task.id}", @invalid_params) |> send_request
      assert conn.status == 200
      assert conn.resp_body =~ "Edit task"
    end
  end

  describe "delete" do
    it "renders a task" do
      task = Rikku.Repo.insert %Task{}
      conn = conn(:delete, "/tasks/#{task.id}") |> send_request
      assert conn.status == 302
      assert get_resp_header(conn, "location") == ["/tasks"]
      refute Rikku.Repo.get(Task, task.id)
    end
  end
end
