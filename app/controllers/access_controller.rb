class AccessController < ApplicationController

	before_action :confirm_logged_in, 
		:except => [:login, :attempt_login, :logout]

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
			# Remember saved user in session
			session[:user_id] = authorized_user.id
			session[:username] = authorized_user.username

			flash[:notice] = "Logged in successfully"
			redirect_to(:controller => 'users', :action => 'index')
		else
			flash[:notice] = 'Invalid username/password'
			redirect_to(:action => 'login')
		end
	end

	def logout
		# mark user as logged out
		# Remember saved user in session
		session[:user_id] = nil
		session[:username] = nil

		flash[:notice] = 'Logged out'
		redirect_to(:action => 'login')
	end

end
