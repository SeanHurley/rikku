defmodule Rikku.Repo do
  use Ecto.Repo, otp_app: :rikku
  use Scrivener, page_size: 10
end
