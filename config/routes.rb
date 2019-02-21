Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#index' 

  get 'users' => 'users#index'
  get 'signup' => 'users#new'
  resources :users

  match '/clubs', to: 'clubs#index', via: [:get, :post]
  match '/addclub', to: 'clubs#new', via: [:get, :post]
  #get 'addclub' => 'clubs#new'
  #post 'clubs' => 'clubs#create'
  delete '/delclub' => 'clubs#destroy'
  match '/club/members', to: 'clubs#show', via: [:get, :post]

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'

end
