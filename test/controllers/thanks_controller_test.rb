require "test_helper"

class ThanksControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers  # 追加

  setup do
    @user = users(:one)  # テストユーザーをセット
    sign_in @user        # テストユーザーでログイン
  end

  test "should get index" do
    get thanks_url   # thanks_index_urlではなくthanks_urlに変更
    assert_response :success
  end
end
