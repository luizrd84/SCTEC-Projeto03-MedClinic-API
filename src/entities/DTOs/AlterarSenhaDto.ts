import {
    IsNotEmpty,
    IsString,
    MinLength
} from "class-validator";

export class AlterarSenhaDto {

    @IsString({
        message: "Senha atual deve ser um texto."
    })
    @IsNotEmpty({
        message: "Senha atual é obrigatória."
    })
    senhaAtual!: string;

    @IsString({
        message: "Nova senha deve ser um texto."
    })
    @IsNotEmpty({
        message: "Nova senha é obrigatória."
    })
    @MinLength(6, {
        message: "Nova senha deve ter no mínimo 6 caracteres."
    })
    novaSenha!: string;
}