defmodule Rikku.Repo.Migrations.AddDateToTask do
  use Ecto.Migration

  def change do
    alter table(:tasks) do
      add :date, :datetime
    end
  end
end
