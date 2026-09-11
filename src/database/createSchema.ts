import fs from "fs/promises";
import path from "path";

import { AppDataSource } from "./data-source";

async function createSchema() {
    try {
        await AppDataSource.initialize();

        console.log("Conexão com o banco estabelecida.");

        const filePath = path.join(__dirname, "schema.sql");

        const sql = await fs.readFile(filePath, "utf-8");

        await AppDataSource.query(sql);

        console.log("Banco criado com sucesso!");
    } catch (error) {
        console.error("Erro ao criar schema:", error);
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

createSchema();