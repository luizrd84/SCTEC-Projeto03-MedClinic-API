import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './database/data-source';
import { errorMiddleware } from './middlewares/errorMiddleware';
import cors from 'cors';
import { routes } from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes); 

app.use(errorMiddleware);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source inicializado com sucesso!");
        app.listen( process.env.PORT, () => {
            console.log(`Servidor rodando na porta ${process.env.PORT}`);
        })
    }).catch((err) => {
        console.log("Erro ao inicilizar o Data Source", err);
    });
