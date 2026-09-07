import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'db_produtos',
    synchronize: true,
    logging: true,
    logger: 'advanced-console',
    entities: ['src/entities/*.ts'],

})

/*
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    ssl: process.env.DB_SSL === "true" ? 
        {rejectUnauthorized: false} : false,
    synchronize: true,
    logging: false,
    entities: [Usuario, Paciente, Medico, Consulta]

});
*/