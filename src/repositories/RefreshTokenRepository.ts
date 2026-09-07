import { AppDataSource } from "../database/data-source";
import { RefreshToken } from "../entities/RefreshToken";
import { DeepPartial } from "typeorm";

export class RefreshTokenRepository {

    private repository = AppDataSource.getRepository(RefreshToken);

    async save(refreshToken: DeepPartial<RefreshToken>) {
        return this.repository.save(refreshToken);
    }
    
    async findByToken(token: string) {

        return this.repository.findOne({
            where: { token },
            relations: {
                usuario: true
            }
        });
    }

    async revoke(token: string) {

        const refreshToken = await this.findByToken(token);

        if (!refreshToken) {
            return;
        }

        refreshToken.revogadoEm = new Date();

        await this.repository.save(refreshToken);
    }
}