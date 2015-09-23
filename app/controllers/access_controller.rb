class AccessController < ApplicationController
	def index
		#display text and links
	end

	def login
		# login form
	end

	def attempt_login
		if params[:username].present? && params[:password].present?
			found_user = User.where(:username => params[:username]).first
			if found_user
				authorized_user = found_user.authenticate(params[:password])
			end
		end
		if authorized_user
			flash[:notice] = "Logged in successfully"
			redirect_to(:action => 'index')
		else
			flash[:notice] = 'Invalid username/password'
			redirect_to(:action => 'login')
		end
	end

	def logout
		# mark user as logged out
		flash[:notice] = 'Logged out'
		redirect_to(:action => 'login')
	end

end
