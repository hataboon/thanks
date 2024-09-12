class ApplicationController < ActionController::Base
  # Modern browser support (省略しても大丈夫です)
  allow_browser versions: :modern

  # ログイン後のリダイレクト
  def after_sign_in_path_for(resource_or_scope)
    flash[:notice] = "ログインに成功しました"
    root_path
  end

  # ログアウト後のリダイレクト
  def after_sign_out_path_for(resource_or_scope)
    flash[:alert] = "ログアウトしました"
    root_path
  end

  # サインアップ後のリダイレクト
  def after_sign_up_path_for(resource_or_scope)
    flash[:notice] = "サインアップしました"
    root_path
  end
end
