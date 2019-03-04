Rails.application.routes.draw do
  resources :notifications
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
  #match '/create', to: 'flights#index', via: :get

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'

  #match '/notifications', to: 'notifications#index', via: :get
  #match '/notifications', to: 'notifications#show', via: :get

  get '/notifications' => 'notifications#index'
  #get '/notifications.json' => 'notifications#index'

  #get '/notifications/1' => 'notifications#show'
  #get '/notifications/1.json' => 'notifications#show'


  #post '/notifications' => 'notifications#create'
  #post '/notifications.json' => 'notifications#create'

  #patch '/notifications/1' => 'notifications#update'
  #patch '/notifications/1.json' => 'notifications#update'

  #mount ActionCable.server, at: '/cable'
end
