class Pin < ApplicationRecord
	belongs_to :user

	validates :latitude, presence: true
	validates :longitude, presence:true
	validates :description, length: {maximum: 100}
	validates :title, length: {maximum: 20}
end
