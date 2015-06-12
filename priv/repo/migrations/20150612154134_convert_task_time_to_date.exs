defmodule Rikku.Repo.Migrations.ConvertTaskTimeToDate do
  use Ecto.Migration

  def change do
    alter table(:tasks) do
      modify :date, :date
    end
  end
end
