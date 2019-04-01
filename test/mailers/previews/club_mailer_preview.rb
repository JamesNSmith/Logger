# Preview all emails at http://localhost:3000/rails/mailers/club_mailer
class ClubMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/club_mailer/confirmation
  def confirmation
    ClubMailer.confirmation
  end

end
