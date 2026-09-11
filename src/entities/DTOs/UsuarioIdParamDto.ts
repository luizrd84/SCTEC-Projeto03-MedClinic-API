import { IsNotEmpty, IsUUID } from "class-validator";

export class UsuarioIdParamDto {

    @IsUUID("4", {
        message: "ID do usuário deve ser um UUID válido."
    })
    @IsNotEmpty({
        message: "ID do usuário é obrigatório."
    })
    id!: string;
}