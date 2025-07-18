# frozen_string_literal: true

class Auth::FacebookAuthenticator < Auth::ManagedAuthenticator
  AVATAR_SIZE = 480

  def name
    "facebook"
  end

  def display_name
    "Facebook"
  end

  def provider_url
    "https://www.facebook.com"
  end

  def enabled?
    SiteSetting.enable_facebook_logins
  end

  def register_middleware(omniauth)
    omniauth.provider :facebook,
                      setup:
                        lambda { |env|
                          strategy = env["omniauth.strategy"]
                          strategy.options[:client_id] = SiteSetting.facebook_app_id
                          strategy.options[:client_secret] = SiteSetting.facebook_app_secret
                          strategy.options[:info_fields] = "name,first_name,last_name,email"
                          strategy.options[:image_size] = {
                            width: AVATAR_SIZE,
                            height: AVATAR_SIZE,
                          }
                          strategy.options[:secure_image_url] = true
                        },
                      scope: "email"
  end

  # facebook doesn't return unverified email addresses so it's safe to assume
  # whatever email we get from them is verified
  # https://developers.facebook.com/docs/graph-api/reference/user/
  def primary_email_verified?(auth_token)
    true
  end
end
