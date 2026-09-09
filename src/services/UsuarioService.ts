import bcrypt from "bcryptjs";
import { UsuarioRole } from "../entities/Usuario";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { TokenPayload } from "../utils/jwt";
import { AppError } from "../errors/AppError";

export class UsuarioService {

    constructor(
        private usuarioRepository: UsuarioRepository
    ) {
        //Constructor
    }

    async registrarUsuario(
        nome: string,
        email: string,
        senha: string,
        role: UsuarioRole
    ) {

        const usuarioExistente =
            await this.usuarioRepository.findOne({
                where: { email }
            });

        if (usuarioExistente) {
            throw new AppError(
                "E-mail já cadastrado",
                409
            );
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = this.usuarioRepository.create({
            nome,
            email,
            senha: senhaHash,
            role
        });

        return await this.usuarioRepository.save(usuario);
    }



    async buscarTodosOsUsuarios() {

        return await this.usuarioRepository.find();
    }


    async consultarUsuario(
        id: string
    ) {

        const usuario =
            await this.usuarioRepository.findOne({
                where: { id }
            });

        if (!usuario) {
            throw new AppError(
                "Usuário não encontrado",
                404
            );
        }

        return usuario;
    }


    async deletarUsuario(
        id: string,
        usuarioLogado: TokenPayload
    ) {

        const usuario =
            await this.usuarioRepository.findOne({
                where: { id }
            });

        if (!usuario) {
            throw new AppError(
                "Usuário não encontrado",
                404
            );
        }


        // Não permite excluir a própria conta
        if (usuario.id === usuarioLogado.sub) {
            throw new AppError(
                "Você não pode excluir o próprio usuário",
                400
            );
        }


        // ADMIN pode excluir GERENTE e ATENDENTE
        if (usuarioLogado.role === UsuarioRole.ADMIN) {

            if (
                usuario.role !== UsuarioRole.GERENTE &&
                usuario.role !== UsuarioRole.ATENDENTE
            ) {
                throw new AppError(
                    "ADMIN não pode excluir este usuário",
                    403
                );
            }
        }


        // GERENTE pode excluir somente ATENDENTE
        else if (usuarioLogado.role === UsuarioRole.GERENTE) {

            if (usuario.role !== UsuarioRole.ATENDENTE) {
                throw new AppError(
                    "GERENTE só pode excluir ATENDENTES",
                    403
                );
            }
        }


        // ATENDENTE não pode excluir usuários
        else {
            throw new AppError(
                "Você não possui permissão para excluir usuários",
                403
            );
        }


        await this.usuarioRepository.remove(usuario);
    }


    async alterarSenha(
        id: string,
        senhaAtual: string,
        novaSenha: string
    ) {

        const usuario =
            await this.usuarioRepository.findOne({
                where: { id }
            });

        if (!usuario) {
            throw new AppError(
                "Usuário não encontrado",
                404
            );
        }


        const senhaValida =
            await bcrypt.compare(
                senhaAtual,
                usuario.senha
            );

        if (!senhaValida) {
            throw new AppError(
                "Senha atual inválida",
                400
            );
        }


        const senhaHash =
            await bcrypt.hash(novaSenha, 10);

        usuario.senha = senhaHash;

        await this.usuarioRepository.save(usuario);
    }


}