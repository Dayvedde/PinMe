json.array!(@users) do |user|
  json.extract! user, :id, :username, :password, :email, :phone_number
  json.url user_url(user, format: :json)
end
