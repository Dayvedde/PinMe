class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
	# has many relation with pins
	has_many :pins

	validates :password, presence: true,
			  length: {minimum: 8}
	validates :email, presence: true
end
