Rails.application.routes.draw do
  get 'access/index'
  get '/login', to: 'access#login'
  get '/signup', to: 'users#new'
  get 'logout', to: 'access#logout'
  resources :pins
  resources :users
  #match 'home' => 'users#index' , via:[:get, :post]
  root 'users#index'
  match ':controller(/:action(/:id))', :via => [:get, :post]

end
