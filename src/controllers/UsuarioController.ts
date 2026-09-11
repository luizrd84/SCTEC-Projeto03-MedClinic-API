import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";
import { UsuarioRole } from "../entities/Usuario";
import { CriarUsuarioDto } from "../entities/DTOs/CriarUsuarioDto";
import { UsuarioResponseDto } from "../entities/DTOs/UsuarioResponseDto";
import { UsuarioIdParamDto } from "../entities/DTOs/UsuarioIdParamDto";
import { AlterarSenhaDto } from "../entities/DTOs/AlterarSenhaDto";

export class UsuarioController {

    constructor(
        private usuarioService: UsuarioService
    ) {
        //Constructor
    }

    async registrarUsuario(
        req: Request,
        res: Response,
        role: UsuarioRole
    ) {

        const { nome, email, senha } = req.body as CriarUsuarioDto;
       
        try {

            const usuario =
                await this.usuarioService.registrarUsuario(
                    nome,
                    email,
                    senha,
                    role
                );

            return res.status(201).json({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                role: usuario.role
            });

        } catch (error) {

            if (
                error instanceof Error &&
                error.message === "E-mail já cadastrado"
            ) {
                return res.status(400).json({
                    erro: error.message
                });
            }

            throw error;
        }
    }


 
    async buscarTodosOsUsuarios(
        req: Request,
        res: Response
    ) {
        const usuarios = await this.usuarioService.buscarTodosOsUsuarios();

       const usuariosResponse: UsuarioResponseDto[] =
            usuarios.map(usuario => ({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                role: usuario.role
            }));

        return res.status(200).json(usuariosResponse);
    }


    async consultarUsuario(
        req: Request,
        res: Response
    ) {
        const { id } = req.params as { id: string };

        const usuario =
            await this.usuarioService.consultarUsuario(id);

        const usuarioResponse: UsuarioResponseDto = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            role: usuario.role
        };

        return res.status(200).json(usuarioResponse);
    }


    async deletarUsuario(
        req: Request,
        res: Response
    ) {

        const { id } = req.params as { id: string };

        const usuarioLogado = req.usuario!;

        await this.usuarioService.deletarUsuario(
            id,
            usuarioLogado
        );

        return res.status(204).send();
    }


    async alterarSenha(
        req: Request,
        res: Response
    ) {

        const { senhaAtual, novaSenha } = req.body as AlterarSenhaDto;
        
        const usuarioLogado = req.usuario!;

        await this.usuarioService.alterarSenha(
            usuarioLogado.sub,
            senhaAtual,
            novaSenha
        );

        return res.status(200).json({
            mensagem: "Senha alterada com sucesso."
        });
    }
}