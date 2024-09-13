class ThanksController < ApplicationController
  before_action :authenticate_user!, only: [ :new, :create, :destroy ]
  before_action :set_thank, only: [ :edit, :update, :destroy ]

  def index
    if current_user
      @thanks = current_user.thanks.order(date: :desc)
      @thanks_json = @thanks.to_json
      puts "Debug: @thanks_json = #{@thanks_json}" # デバッグ用

    else
      @thanks = []
      @thanks_json = [].to_json
    end
  end

  def new
    @thank = Thank.new
  end

  def create
    @thank = current_user.thanks.new(thank_params)
    if @thank.save
      redirect_to thanks_path, notice: "感謝しました"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @thank.update(thank_params)
      redirect_to thanks_path, notice: "更新されました"
    else
      render :edit
    end
  end

  def destroy
    @thank.destroy
    redirect_to thanks_path, notice: "削除されました"
  end

  private

  def set_thank
    @thank = current_user.thanks.find(params[:id])
  end

  def thank_params
    params.require(:thank).permit(:category, :content, :date)
  end
end
