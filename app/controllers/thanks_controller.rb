class ThanksController < ApplicationController
  def index
    @thanks = Thank.order(date: :desc)
  end

  def create
    @thank = Thank.new(thank_params)
    if @thank.save
      redirect_to thanks_path, notice: '感謝が追加されました'
    else
      render :index
    end
  end

  def update
    @thank = current_user.thank.find(params[:id])
    if @thank.update(thank_params)
      redirect_to thanks_path, notice: '感謝が更新されました'
    else
      render :index
    end

  def destroy
    @thank = current_user.thank.find(params[:id])
    @thank.destroy
    redirect_to thank_params, notice: '感謝が削除されました'
  end

  private

  def thank_params
    params.require(:thank).permit(:category, :content, :date)
  end
end
