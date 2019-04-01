require 'test_helper'

class ClubLinkControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get club_link_new_url
    assert_response :success
  end

end
