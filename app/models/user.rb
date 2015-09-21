class User < ActiveRecord::Base
	# has many relation with pins
	has_many :pins, :dependent => :destroy

	validates :password, presence: true,
			  length: {minimum: 8}
	validates :email, presence: true

	accepts_nested_attributes_for :pins
end
