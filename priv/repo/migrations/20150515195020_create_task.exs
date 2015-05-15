defmodule Rikku.Repo.Migrations.CreateTask do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :text
      add :info, :text
      add :start_time, :datetime
      add :end_time, :datetime

      timestamps
    end

  end
end
