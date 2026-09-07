import bcrypt from "bcryptjs";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { gerarToken } from "../utils/jwt";
import { TokenPayload } from "../utils/jwt";

export class AuthService {

    constructor(
        private usuarioRepository: UsuarioRepository
    ) {
        //constructor
    }

    async login(email: string, senha: string) {

        const usuario = await this.usuarioRepository.findOneBy({ email });

        if (!usuario) {
            throw new Error("Credenciais inválidas");
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            throw new Error("Credenciais inválidas");
        }

        const token = gerarToken({
            sub: usuario.id,
            role: usuario.role
        });

        return {
            token,
            usuario
        };
    }

    me(usuario: TokenPayload) {
        return {
            id: usuario.sub,
            role: usuario.role
        };
    }


}