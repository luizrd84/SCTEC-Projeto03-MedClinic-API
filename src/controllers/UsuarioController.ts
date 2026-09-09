import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";
import { UsuarioRole } from "../entities/Usuario";

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

        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: "nome, email e senha são obrigatórios."
            });
        }

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

        const usuarios =
            await this.usuarioService.buscarTodosOsUsuarios();

        return res.status(200).json(
            usuarios.map(usuario => ({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                role: usuario.role
            }))
        );
    }


    async consultarUsuario(
        req: Request,
        res: Response
    ) {

        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                erro: "ID do usuário é obrigatório."
            });
        }

        const usuario =
            await this.usuarioService.consultarUsuario(id);


        return res.status(200).json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            role: usuario.role
        });
    }


    async deletarUsuario(
        req: Request,
        res: Response
    ) {

        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                erro: "ID do usuário é obrigatório."
            });
        }

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

        const { senhaAtual, novaSenha } = req.body;

        if (!senhaAtual || !novaSenha) {
            return res.status(400).json({
                erro: "senhaAtual e novaSenha são obrigatórias."
            });
        }

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