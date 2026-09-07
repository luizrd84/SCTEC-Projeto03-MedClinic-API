import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";

import { Usuario } from "./Usuario";

@Entity("refresh_tokens")
export class RefreshToken {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar", { unique: true })
    token!: string;

    @Column("timestamp")
    expiraEm!: Date;

    @Column("timestamp", { nullable: true })
    revogadoEm!: Date | null;

    @Column("uuid")
    usuarioId!: string;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "usuarioId" })
    usuario!: Usuario;

    @CreateDateColumn()
    criadoEm!: Date;
}