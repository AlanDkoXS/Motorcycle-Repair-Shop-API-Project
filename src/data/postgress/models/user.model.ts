import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

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
        unique: true
    })
    name: string;



    @Column("varchar", {
        length: 80,
        nullable: false
    })
    email: string;


    @Column("varchar", {
        length: 80,
        nullable: false
    })
    password: string;

    role: Role;
    @Column("enum", {
        enum: Role,
        default: Role.client,
    })

    @Column("enum", {
        enum: Status,
        default: Status.available,
    })
    status: Status;
}
