import dotenv from 'dotenv'
dotenv.config()
const env_config = {
  SERVER_PORT: process.env.SERVER_PORT,
  CLIENT_PORTS: process.env.CLIENT_PORTS,
  CLIENT_URL: process.env.CLIENT_URL,
  DB_URI: process.env.DB_URI,
  DB_NAME: process.env.DB_NAME,
  HASH_PASSWORD_SECRET: process.env.HASH_PASSWORD_SECRET,
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET
  },
  DB_COLLECTION: {
    USERS: process.env.DB_COLLECTION_USERS,
    REFRESH_TOKENS: process.env.DB_COLLECTION_REFRESH_TOKENS,
    PROPERTIES: process.env.DB_COLLECTION_PROPERTIES,
    FURNITURES: process.env.DB_COLLECTION_FURNITURES,
    FURNITURE_DETAILS: process.env.DB_COLLECTION_FURNITURE_DETAILS,
    REAL_ESTATE_NEWS: process.env.DB_COLLECTION_REAL_ESTATE_NEWS,
    COMMENTS: process.env.DB_COLLECTION_COMMENTS,
    IMAGES: process.env.DB_COLLECTION_IMAGES,
    FAVORITES: process.env.DB_COLLECTION_FAVORITES,
    REPORTS_INTERACTION: process.env.DB_COLLECTION_REPORTS_INTERACTION,
    PROJECTS: process.env.DB_COLLECTION_PROJECTS,
    NEWS: process.env.DB_COLLECTION_NEWS,
    VIP_PACKAGES: process.env.DB_COLLECTION_VIP_PACKAGES,
    PAYMENTS: process.env.DB_COLLECTION_PAYMENTS,
    VIP_USER_DETAILS: process.env.DB_COLLECTION_VIP_USER_DETAILS
  },
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_AUTH_USER: process.env.EMAIL_AUTH_USER,
  EMAIL_AUTH_PASS: process.env.EMAIL_AUTH_PASS,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_SERCURE: process.env.EMAIL_SERCURE,
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  EMAIL_VERIFY_TOKEN_EXPIRES_IN: process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN,
  FORGOT_PASSWORD_TOKEN_EXPIRES_IN: process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
  EMAIL_VERIFICATION_SECRET_KEY: process.env.EMAIL_VERIFICATION_SECRET_KEY,
  FORGOT_PASSWORD_SECRET_KEY: process.env.FORGOT_PASSWORD_SECRET_KEY,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
}
export default env_config
