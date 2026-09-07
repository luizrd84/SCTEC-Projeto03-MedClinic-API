import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './database/data-source';
import { errorMiddleware } from './middlewares/errorMiddleware';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());


// app.use(routes); //ver as rotas que vou usar


app.use(errorMiddleware);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source inicializado com sucesso!");
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000");
        })
    }).catch((err) => {
        console.log("Erro ao inicilizar o Data Source", err);
    });
