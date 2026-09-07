import { UsuarioRole } from "../entities/Usuario";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UsuarioRepository } from "../repositories/UsuarioRepository";


export class UsuarioController {

    constructor(
        private usuarioRepository: UsuarioRepository
    ) {
        //Constructor
    }
  

    //POST /usuarios/register/gerente
    async registrarGerente(req: Request, res: Response) {

        const { nome, email, senha } = req.body;

        if(!nome || !email || !senha ) {
            return res.status(400).json({
                erro: "nome, email e senha são obrigatórios."
            })
        }

        const emailExiste = await this.usuarioRepository.findOneBy({email});
        if(emailExiste) {
            return res.status(400).json({
                erro: "E-mail já cadastrado"
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = this.usuarioRepository.create({
            nome, email, senha: senhaHash, role: UsuarioRole.GERENTE
        });

        await this.usuarioRepository.save(usuario);
     
        return res.status(201).json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            role: usuario.role,
        });

    }


}