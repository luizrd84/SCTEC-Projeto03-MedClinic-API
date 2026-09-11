import { UsuarioRole } from "../Usuario";

export class UsuarioResponseDto {

    id!: string;

    nome!: string;

    email!: string;

    role!: UsuarioRole;
}