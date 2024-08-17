import { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken'

namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'dev' | 'prod'
    PORT: string
    MONGO_URL: string
    JWT_ACCESS_TOKEN_SECRET: Secret | GetPublicKeyOrSecret
    JWT_ACCESS_TOKEN_EXPIRES_IN: string
    JWT_REFRESH_TOKEN_SECRET: Secret | GetPublicKeyOrSecret
    JWT_REFRESH_TOKEN_EXPIRES_IN: string
    NODE_MAILER_CLIENT_SECRET: string,
    NODE_MAILER_CLIENT_ID: string,
    JWT_REFRESH_TOKEN_EXPIRES_IN: string,
    AWS_S3_BUCKET_NAME: string,
    AWS_S3_KEY_ID: string,
    AWS_S3_SECRET_ACCESS_KEY: string,
  }
}
