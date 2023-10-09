Rails.application.routes.draw do
  devise_for :users
  root "pages#index"

  namespace :api do
    resources :users, only: :show
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  # root "articles#index"
end
