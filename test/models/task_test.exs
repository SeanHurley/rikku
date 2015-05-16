defmodule Rikku.TaskTest do
  use Rikku.TestCase

  alias Rikku.Task

  describe "changeset" do
    it "requires a length" do
      changeset = Task.changeset(%Task{}, %{
        length: nil,
      })

      assert changeset.errors[:length] == "can't be blank"
    end

    it "requires a valid length" do
      changeset = Task.changeset(%Task{}, %{
        length: "abc123",
      })

      assert changeset.errors[:length] == "is invalid"
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
