import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { encryptAdapter } from "../../../config/encrypt.adapter";
import { Repair } from "./repair.model";

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

    @OneToMany(() => Repair, (repair) => repair.user)
        repairs: Repair[];

    @BeforeInsert()
    encriptedPassword() {
        this.password = encryptAdapter.hash(this.password);
    }
}
