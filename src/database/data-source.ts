import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from "dotenv";

dotenv.config();

const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    DB_SSL,
} = process.env;

if (!DB_HOST || !DB_USERNAME || !DB_PASSWORD || !DB_DATABASE) {
    throw new Error('Variáveis de ambiente do banco de dados não configuradas.');
}

export const AppDataSource = new DataSource({
    type: 'postgres',

    host: DB_HOST,
    port: Number(DB_PORT) || 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,

    ssl: DB_SSL === 'true'
        ? { rejectUnauthorized: false }
        : false,

    synchronize: true,
    logging: true,
    logger: 'advanced-console',

    entities: ['src/entities/*.ts'],
});