class InvitationsController < ApplicationController
  def new
    @invitation = Invitation.new
  end

  def create
    @invitation = Invitation.new(invitation_params)
    if @invitation.save
      InvitationMailer.send_invitation(@invitation).deliver_now
      redirect_to  root_path, notice: '招待メールが送信されました'
    else
      render :new
    end
  end

  private

  def invitation_params
    params.require(:invitation).permit(:email)
  end
end
