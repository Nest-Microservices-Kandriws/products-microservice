import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    NODE_ENV: string;
    DATABASE_URL: string;
    NATS_SERVERS: string;
}

const envVarsSchema = joi.object({
    NODE_ENV: joi
        .string()
        .valid('development', 'production', 'test')
        .required(),
    PORT: joi.number().default(3000),
    DATABASE_URL: joi.string().required(),

    NATS_SERVERS: joi.array().items(joi.string()).required()
}).unknown(true);

const { error, value } = envVarsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    PORT: envVars.PORT,
    NODE_ENV: envVars.NODE_ENV,
    DATABASE_URL: envVars.DATABASE_URL,
    NATS_SERVERS: envVars.NATS_SERVERS
};