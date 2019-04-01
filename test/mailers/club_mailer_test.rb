require 'test_helper'

class ClubMailerTest < ActionMailer::TestCase
  test "confirmation" do
    mail = ClubMailer.confirmation
    assert_equal "Confirmation", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
