class MessagesController < ApplicationController

	skip_before_action :verify_authenticity_token
	before_action :confirm_logged_in

	def notify
		client = Twilio::REST::Client.new Rails.application.secrets.twilio_account_sid, Rails.application.secrets.twilio_auth_token
		user = User.find(session[:user_id])
		bodyMsg = "Pin Me: You are far away from your destination"
		user_phone_number = user.phone_number

		message = client.messages.create from: '+12262100539', to: user_phone_number,
					body: bodyMsg

		render plain: message.status
	end

end