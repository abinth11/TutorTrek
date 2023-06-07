import dotenv from 'dotenv'
dotenv.config();

const configKeys= {

    MONGO_DB_URL: process.env.DATABASE as string,

    PORT: process.env.PORT,

    JWT_SECRET: process.env.JWT_SECRET as string,

    NODE_ENV: process.env.NODE_ENV as string,

    GOOGLE_AUTH_CLIENT: process.env.GOOGLE_AUTH_CLIENT as string,
    
    ORIGIN_PORT: process.env.ORIGIN_PORT as string
}


export default configKeys