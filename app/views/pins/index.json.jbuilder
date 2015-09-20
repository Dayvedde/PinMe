json.array!(@pins) do |pin|
  json.extract! pin, :id, :title, :description, :latitude, :longitude, :user_id
  json.url pin_url(pin, format: :json)
end
