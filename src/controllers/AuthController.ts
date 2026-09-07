import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";


export class AuthController {

    constructor(
        private authService: AuthService
    ) {
        //Constructor
    }
  

    //POST /auth/login
    async login(req: Request, res: Response) {
       const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                erro: "email e senha são obrigatórios."
            });
        }

        const resultado = await this.authService.login(email, senha);

        return res.json({
            token: resultado.token,

            usuario: {
                id: resultado.usuario.id,
                nome: resultado.usuario.nome,
                email: resultado.usuario.email,
                role: resultado.usuario.role
            }
        });
    }

    //GET /auth/me
    me(req: Request, res: Response): Response {

        if (!req.usuario) {
            return res.status(401).json({
                erro: "Não autenticado."
            });
        }

        const usuario = this.authService.me(req.usuario);

        return res.status(200).json(usuario);
    }

        
    

}