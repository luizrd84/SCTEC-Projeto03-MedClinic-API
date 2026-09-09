import bcrypt from "bcryptjs";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { gerarToken, gerarRefreshToken } from "../utils/jwt";
import { TokenPayload } from "../utils/jwt";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import dotenv from "dotenv";
import { AppError } from "../errors/AppError";

export class AuthService {

    constructor(
        private usuarioRepository: UsuarioRepository,
        private refreshTokenRepository: RefreshTokenRepository
    ) {
        //constructor
    }

    async login(email: string, senha: string) {

        const usuario = await this.usuarioRepository.findOneBy({ email });

        if (!usuario) {
            throw new AppError(
                "Credenciais inválidas",
                401
            );
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            throw new AppError(
                "Credenciais inválidas",
                401
            );
        }

        const accessToken = gerarToken({
            sub: usuario.id,
            role: usuario.role
        });

        const refreshToken = gerarRefreshToken();

        const expiraEm = new Date();

        expiraEm.setHours(
            expiraEm.getHours() +
            Number(process.env.JWT_REFRESHTOKEN_EXPIRES_IN_HOURS || 8)
        );

        await this.refreshTokenRepository.save({
            token: refreshToken,
            usuarioId: usuario.id,
            expiraEm,
            revogadoEm: null
        });

        return {
            accessToken,
            refreshToken,
            usuario
        };
    }

    me(usuario: TokenPayload) {
        return {
            id: usuario.sub,
            role: usuario.role
        };
    }

    async refresh(refreshToken: string) {

        const tokenSalvo =
            await this.refreshTokenRepository.findByToken(refreshToken);

        if (!tokenSalvo) {
            throw new AppError(
                "Refresh token inválido",
                401
            );
        }

        if (tokenSalvo.revogadoEm) {
            throw new AppError(
                "Refresh token revogado",
                401
            );
        }

        if (tokenSalvo.expiraEm < new Date()) {
            throw new AppError(
                "Refresh token expirado",
                401
            );
        }

        const accessToken = gerarToken({
            sub: tokenSalvo.usuario.id,
            role: tokenSalvo.usuario.role
        });

        return {
            accessToken
        };
    }

    async logout(refreshToken: string) {

        await this.refreshTokenRepository.revoke(refreshToken);

        return {
            mensagem: "Logout realizado com sucesso."
        };
    }


}