Rails.application.routes.draw do
  # Deviseのルートを追加
  devise_for :users

  # アプリケーションのルートを定義
  root "thanks#index"

  # Thanksリソースのルートを定義
  resources :thanks, except: [:new, :edit]

  # ヘルスチェック
  get "up" => "rails/health#show", as: :rails_health_check

  # PWA関連のルートを定義
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"
end
