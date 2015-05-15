# Create the database, run migrations, and start the test transaction.
Mix.Task.run "ecto.create", ["--quiet"]
Mix.Task.run "ecto.migrate", ["--quiet"]
Ecto.Adapters.SQL.begin_test_transaction(Rikku.Repo)

defmodule Rikku.TestCase do
  use ExUnit.CaseTemplate

  using(opts) do
    quote do
      use ExSpec, unquote(opts)
    end
  end

  setup do
    Rikku.TestCase.with_test_transactions
  end

  def with_test_transactions do
    Ecto.Adapters.SQL.begin_test_transaction(Rikku.Repo)

    ExUnit.Callbacks.on_exit(fn ->
        Ecto.Adapters.SQL.rollback_test_transaction(Rikku.Repo)
    end)
  end
end

defmodule Rikku.ControllerTestCase do
  use ExUnit.CaseTemplate

  import Plug.Conn

  using(opts) do
    quote do
      use Rikku.TestCase, unquote(opts)
      use Plug.Test

      import Ecto.Query
      import Rikku.ControllerTestCase
    end
  end

  def send_request(conn) do
    conn
    |> put_private(:plug_skip_csrf_protection, true)
    |> Rikku.Endpoint.call([])
  end
end

ExUnit.start
