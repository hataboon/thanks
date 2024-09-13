require "test_helper"

class ThanksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)  # テストユーザーをセット
    sign_in @user        # テストユーザーでログイン
  end

  test "should get index" do
    get thanks_url   # thanks_index_urlではなくthanks_urlに変更
    assert_response :success
  end
end
