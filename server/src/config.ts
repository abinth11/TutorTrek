import dotenv from 'dotenv';
dotenv.config();

const configKeys = {
  MONGO_DB_URL: process.env.DATABASE as string,

  PORT: process.env.PORT,

  DB_NAME: process.env.DB_NAME,

  JWT_SECRET: process.env.JWT_SECRET as string,

  JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET as string,

  NODE_ENV: process.env.NODE_ENV as string,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,

  GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET as string,

  ORIGIN_PORT: process.env.ORIGIN_PORT as string,

  EMAIL_NODE_MAILER: process.env.EMAIL_USERNAME as string,

  PASSWORD_NODE_MAILER: process.env.EMAIL_PASSWORD as string,

  FROM_EMAIL_NODE_MAILER:process.env.FROM_EMAIL as string,




  AWS_ACCESS_KEY:process.env.AWS_ACCESS_KEY  as string,

  AWS_SECRET_KEY:process.env.AWS_SECRET_KEY as string,

  AWS_BUCKET_REGION:process.env.AWS_BUCKET_REGION as string,

  AWS_BUCKET_NAME:process.env.AWS_BUCKET_NAME as string,

  CLOUDFRONT_DISTRIBUTION_ID:process.env.CLOUDFRONT_DISTRIBUTION_ID as string,

  CLOUDFRONT_DOMAIN_NAME:process.env.CLOUDFRONT_DOMAIN_NAME as string,

  STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY  as string,

  STRIPE_PUBLISHABLE_KEY:process.env.STRIPE_PUBLISHABLE_KEY as string,

  DB_CLUSTER_URL:process.env.DB_CLUSTER_URL as string,

  REDIS_URL:process.env.REDIS_URL as string

};

export default configKeys;
