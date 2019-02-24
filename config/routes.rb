Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#index' 

  #get 'users' => 'users#index'
  match '/users', to: 'users#index', via: [:get, :post]
  get 'signup' => 'users#new'
  resources :users

  match '/clubs', to: 'clubs#index', via: [:get, :post]
  match '/clubs/add', to: 'clubs#new', via: [:get, :post]
  #get 'addclub' => 'clubs#new'
  #post 'clubs' => 'clubs#create'
  delete '/clubs/del' => 'clubs#destroy'
  match '/clubs/members', to: 'clubs#show', via: [:get, :post]

  #get '/memberships' => 'memberships#index'
  match '/memberships', to: 'memberships#index', via: :get
  match '/memberships/club', to: 'memberships#show', via: :get
  match '/memberships/add', to: 'memberships#new', via: [:get, :post]

  match '/aircraft', to: 'aircrafts#index', via: :get
  match '/aircraft/club', to: 'aircrafts#showclub', via: :get
  match '/aircraft/user', to: 'aircrafts#showuser', via: :get
  match '/aircraft/add', to: 'aircrafts#new', via: [:get, :post]

  match '/flights', to: 'flights#index', via: :get

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'

end
