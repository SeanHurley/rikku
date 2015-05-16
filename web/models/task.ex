defmodule Rikku.Task do
  use Rikku.Web, :model

  schema "tasks" do
    field :title, :string
    field :info, :string
    field :start_time, Ecto.DateTime
    field :end_time, Ecto.DateTime

    timestamps
  end

  @required_fields ~w(title start_time end_time)
  @optional_fields ~w(info)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If `params` are nil, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
