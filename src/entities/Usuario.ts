import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm';
import { MinLength } from "class-validator";

export enum UsuarioRole {
    ADMIN = "ADMIN", 
    GERENTE = "GERENTE",
    ATENDENTE = "ATENDENTE"
}

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column("varchar")
    nome!: string;

    @Column("varchar")
    email!: string;

    @MinLength(6)
    @Column("varchar")
    senha!: string;    

    @Column({
        type: "enum",
        enum: UsuarioRole,
        default: UsuarioRole.ATENDENTE
    })
    role!: UsuarioRole;

    @CreateDateColumn()
    criadoEm!: Date;
}
