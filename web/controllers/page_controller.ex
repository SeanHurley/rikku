defmodule Rikku.PageController do
  use Rikku.Web, :controller

  plug :action

  def index(conn, _params) do
    render conn, "index.html"
  end
end
