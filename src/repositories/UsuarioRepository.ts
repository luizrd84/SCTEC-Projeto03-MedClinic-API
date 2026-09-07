import { AppDataSource } from "../database/data-source";
import { Usuario } from "../entities/Usuario";
import { Repository } from "typeorm";

export class UsuarioRepository extends Repository<Usuario> {

    constructor() {
        super(Usuario, AppDataSource.manager);
    }


    //Implemtnar métodos além dos básicos

}