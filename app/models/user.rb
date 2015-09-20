class User < ActiveRecord::Base
	# has many relation with pins
	has_many :pins

	validates :password, presence: true,
			  length: {minimum: 8}
	validates :email, presence: true
end
