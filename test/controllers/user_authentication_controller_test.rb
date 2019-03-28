require 'test_helper'

class UserAuthenticationControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get user_authentication_new_url
    assert_response :success
  end

end
