class User < ApplicationRecord
	has_secure_password

	#before_save :encrpyt_password
	# has many relation with pins
	has_many :pins, :dependent => :destroy

	validates :password, presence: true,
			  length: {minimum: 8}
  	validates :password_confirmation, presence: true
	validates :email, presence: true

	accepts_nested_attributes_for :pins
end
