class User < ApplicationRecord
	has_secure_password

	before_save { |user| user.username = username.downcase }
	# has many relation with pins
	has_many :pins, :dependent => :destroy

	validates :username, presence: true
	validates_uniqueness_of :username, :case_sensitive => false

	validates :password, presence: true,
			  length: {minimum: 1}

  	validates :password_confirmation, presence: true

	validates :email, presence: true

	accepts_nested_attributes_for :pins
end
