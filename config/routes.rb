Rails.application.routes.draw do
  # Deviseのルートを追加
  devise_for :users, controllers: { invitations: 'devise/invitations' }

  # アプリケーションのルートを定義
  root "thanks#index"

  # Thanksリソースのルートを定義
  resources :thanks, except: [ :new, :edit ]
end
