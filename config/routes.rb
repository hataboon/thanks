Rails.application.routes.draw do
  get "invitations/new"
  get "invitations/create"
  # Deviseのルートを追加
  devise_for :users

  # アプリケーションのルートを定義
  root "thanks#index"

  # Thanksリソースのルートを定義
  resources :thanks, except: [ :new, :edit ]

  resources :invitations, only: [:new, :create]
end
