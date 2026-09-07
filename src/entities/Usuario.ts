
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm';

export enum UsuarioRole {
    PACIENTE = "PACIENTE",
    MEDICO = "MEDICO",
    ADMIN = "ADMIN"
}

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column("varchar")
    nome!: string;

    @Column("varchar")
    email!: string;

    @Column("varchar")
    senha!: string;    

    @Column({
        type: "enum",
        enum: UsuarioRole,
        default: UsuarioRole.PACIENTE
    })
    role!: UsuarioRole;

    @CreateDateColumn()
    criadoEm!: Date;
}
