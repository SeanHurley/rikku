defmodule Rikku.TaskTest do
  use Rikku.TestCase

  alias Rikku.Task

  describe "changeset" do
    it "requires a start_time" do
      changeset = Task.changeset(%Task{}, %{
        start_time: nil,
      })

      assert changeset.errors[:start_time] == "can't be blank"
    end

    it "requires a valid start_time" do
      changeset = Task.changeset(%Task{}, %{
        start_time: "abc123",
      })

      assert changeset.errors[:start_time] == "is invalid"
    end

    it "requires an end_time" do
      changeset = Task.changeset(%Task{}, %{
        end_time: nil,
      })

      assert changeset.errors[:end_time] == "can't be blank"
    end

    it "requires a valid end_time" do
      changeset = Task.changeset(%Task{}, %{
        end_time: "abc123",
      })

      assert changeset.errors[:end_time] == "is invalid"
    end

    it "requires a title" do
      changeset = Task.changeset(%Task{}, %{
        title: nil,
      })

      assert changeset.errors[:title] == "can't be blank"
    end

    it "doesn't require info" do
      changeset = Task.changeset(%Task{}, %{
        info: nil,
      })

      assert changeset.errors[:info] == nil
    end
  end
end
