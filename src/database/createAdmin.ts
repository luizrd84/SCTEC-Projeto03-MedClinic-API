
import bcrypt from "bcryptjs";
import { AppDataSource } from "./data-source";
import { Usuario, UsuarioRole } from "../entities/Usuario";

async function createAdmin(): Promise<void> {

    const nome = process.env.ADMIN_NOME;
    const email = process.env.ADMIN_EMAIL;
    const senha = process.env.ADMIN_SENHA;

    if (!nome || !email || !senha) {
        throw new Error(
            "ADMIN_NOME, ADMIN_EMAIL e ADMIN_SENHA devem estar definidos no .env"
        );
    }

    try {

        await AppDataSource.initialize();

        const usuarioRepository =
            AppDataSource.getRepository(Usuario);

        // Verifica se já existe um usuário com esse e-mail
        const usuarioExistente =
            await usuarioRepository.findOne({
                where: {
                    email
                }
            });

        if (usuarioExistente) {
            console.log("Já existe um usuário com este e-mail.");
            return;
        }

        // Cria o hash da senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Cria o ADMIN
        const admin = usuarioRepository.create({
            nome,
            email,
            senha: senhaHash,
            role: UsuarioRole.ADMIN
        });

        await usuarioRepository.save(admin);

        console.log("ADMIN criado com sucesso!");
        console.log(`E-mail: ${email}`);

    } finally {

        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

createAdmin()
    .catch((error) => {
        console.error("Erro ao criar ADMIN:", error);
        process.exit(1);
    });

