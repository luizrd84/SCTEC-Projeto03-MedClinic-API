import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { LoginDto } from "../entities/DTOs/LoginDto";
import { RefreshTokenDto } from "../entities/DTOs/RefreshTokenDto";

export class AuthController {

    constructor(
        private authService: AuthService
    ) {
        //Constructor
    }
  

    //POST /auth/login
    async login(req: Request, res: Response) {
        const { email, senha } = req.body as LoginDto;

        const resultado = await this.authService.login(email, senha);

        return res.json({
            accessToken: resultado.accessToken,
            refreshToken: resultado.refreshToken,

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


    //POST /auth/refresh
    async refresh(req: Request, res: Response) {

        const { refreshToken } = req.body as RefreshTokenDto;

        const resultado =
            await this.authService.refresh(refreshToken);

        return res.status(200).json(resultado);
    }


    //POST /auth/logout
    async logout(req: Request, res: Response) {

        const { refreshToken } = req.body as RefreshTokenDto;

        const resultado =
            await this.authService.logout(refreshToken);

        return res.status(200).json(resultado);
    }

        
    

}