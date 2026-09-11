import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength
} from "class-validator";

export class CriarUsuarioDto {

    @IsString({
        message: "Nome deve ser um texto."
    })
    @IsNotEmpty({
        message: "Nome é obrigatório."
    })
    nome!: string;

    @IsEmail({}, {
        message: "E-mail inválido."
    })
    @IsNotEmpty({
        message: "E-mail é obrigatório."
    })
    email!: string;

    @IsString({
        message: "Senha deve ser um texto."
    })
    @IsNotEmpty({
        message: "Senha é obrigatória."
    })
    @MinLength(6, {
        message: "Senha deve ter no mínimo 6 caracteres."
    })
    senha!: string;
}