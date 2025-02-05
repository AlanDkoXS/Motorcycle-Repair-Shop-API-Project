import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";
import { encriptAdapter } from "../../../config/encrypt.adapter";

export enum Role {
    employee = "employee",
    client = "client",
}

export enum Status {
    available = "available",
    disabled = "disabled",
}

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", {
        length: 80,
        nullable: false,
    })
    name: string;

    @Column("varchar", {
        length: 80,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column("varchar", {
        length: 80,
        nullable: false,
    })
    password: string;

    @Column("enum", {
        enum: Role,
        default: Role.client,
    })
    role: Role;

    @Column("enum", {
        enum: Status,
        default: Status.available,
    })
    status: Status;

    @BeforeInsert()
    encriptedPassword() {
        this.password = encriptAdapter.hash(this.password);
    }
}
