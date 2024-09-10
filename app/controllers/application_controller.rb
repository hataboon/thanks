class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  def after_sign_in_path_for(resource)
    flash[:notice] = "ログインに成功しました" #　 <-任意で
    root_path  #　指定したいパスに変更
  end

  # サインアウト後のリダイレクト先をトップページへ
  def after_sign_out_path_for(resource)
    flash[:alert] = "ログアウトしました"
    root_path
  end

  def after_sign_up_path_for(resource)
    flash[:notice] = "サインアップしました" #　 <-任意で
    root_path  #　指定したいパスに変更
  end
end
