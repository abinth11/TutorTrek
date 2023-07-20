
 export const client_id = "868341844656-jr4d6pb4gro123nbet4d3th7cvogpbpq.apps.googleusercontent.com"
 export const redirect_uri = 'http://localhost:3000'
 export const STRIPE_PUBLISHABLE_KEY='pk_test_51NRzOqSFuPFI6PEIm2JqtP4KzHSXPAzJUGsRziDz2lzr71fjzyebwf6V59coC03n6ZWHtxk51GWUE4x8OnjEzNYG00mLqdPeaG'
 export const APP_LOGO = "https://res.cloudinary.com/dwucedjmy/image/upload/v1689655073/logo-no-background_avwjsd.png"
 const CONSTANTS_COMMON = {
    API_BASE_URL: 'http://localhost:5000',
    GOOGLE_URL_FOR_LOGIN:`https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=openid%20email%20profile`

 }

 export default CONSTANTS_COMMON