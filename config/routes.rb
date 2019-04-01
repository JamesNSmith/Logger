Rails.application.routes.draw do
  

  get 'club_link/new'

  get 'user_authentication/new'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#index' 

  #get 'users' => 'users#index'
  match '/users', to: 'users#index', via: [:get, :post]
  match '/signup', to: 'users#new', via: [:get, :post]
  

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

  #get '/flights' => 'flights#index'
  match '/flights', to: 'flights#index', via: :get
  get '/flights/:launch_date' => 'flights#show', as: :flight

  match '/logger', to: 'flights#logger', via: :get

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'

  mount ActionCable.server, at: '/cable'

  resources :users
  #resources :sessions
  resources :password_resets
  resources :user_authentication
  resources :club_link

end
