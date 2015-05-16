defmodule Rikku.Repo.Migrations.CreateTask do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :text
      add :info, :text
      add :length, :integer

      timestamps
    end

  end
end
