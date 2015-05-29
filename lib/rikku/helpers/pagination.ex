defmodule Rikku.Helper.Pagination do
  def pagination_path({path_fn, [conn, action]}, pagination_options) do
    pagination_path({path_fn, [conn, action, []]}, pagination_options)
  end

  def pagination_path({path_fn, [conn, action, options]}, pagination_options) do
    apply(Rikku.Router.Helpers, path_fn, [conn, action, Dict.merge(options, pagination_options)])
  end
end

