import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

export enum repairStatus {
    pending = "pending",
    completed = "completed",
    canceled = "canceled"
}

@Entity()
export class Repair extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("date", {
        nullable: false
    })
    date: Date;

    @Column("varchar", {
        nullable: false
    })
    motorNumber: string;

    @Column("text", {
        nullable: false,
    })
    description: string;

    @Column("enum", {
        enum: repairStatus,
        default: repairStatus.pending,
    })
    status: repairStatus;

    @Column("varchar", {
        nullable: false
    })
    userId: string;

    @ManyToOne(() => User, (user) => user.repairs)
    user: User;
}
