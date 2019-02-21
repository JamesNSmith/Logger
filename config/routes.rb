Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#index' 

  get 'users' => 'users#index'
  get 'signup' => 'users#new'
  resources :users

  get 'clubs' => 'clubs#index'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'

end
