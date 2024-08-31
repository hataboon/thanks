class ThanksController < ApplicationController
  def index
    @thanks = Thank.order(date: :desc)
    render json: @thanks
  end

  def create
    @thank = Thank.new(thank_params)
    if @thank.save
      render json: @thank, status: :created
    else
      render json: @thank.erros, status: :unprocessable_entitiy
    end
  end

  def update
    @thank = current_user.thank.find(params[:id])
    if @thank.update(thank_params)
      render json: @thank
    else
      render json: @thank.erros, status: :unprocessable_entitiy
  end

  def destroy
    @thank = current_user.thank.find(params[:id])
    @thank.destroy
  end

  private

  def thank_params
    params.require(:thank).permit(:category, :content, :date)
  end
end
