import { Repair, repairStatus } from "../../data/postgress/models/repair.model";
import { CreateRepairDTO, CustomError } from "../../domain";
import { In } from "typeorm";
import { validate as uuidValidate } from 'uuid';

export class RepairService {
    async findAll() {
        try {
            return await Repair.find({
                where: {
                    status: In([repairStatus.pending, repairStatus.completed]),
                },
                relations: {
                    user: true,
                },
                select: {
                    user: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                }
            });
        } catch (error) {
            throw CustomError.internalServer("Error fetching repair data")
        }
    }

    async findOne(id: string) {
        if (!uuidValidate(id)) {
            throw CustomError.badRequest('Invalid ID format - UUID expected');
        }

        const repair = await Repair.findOne({
            where: {
                id: id,
                status: repairStatus.pending,
            },
        })
        if (!repair) {
            throw CustomError.notFound("Repair not found");
        }
        return repair;
    }

    async create(data: CreateRepairDTO) {
        if (!uuidValidate(data.userId)) {
            throw CustomError.badRequest('Invalid user ID format - UUID expected');
        }

        const repair = new Repair()
        repair.date = data.date;
        repair.userId = data.userId;
        repair.motorNumber = data.motorNumber;
        repair.description = data.description;
        try {
            return await repair.save();
        } catch (error) {
            throw CustomError.internalServer("Error creating repair")
        }
    }

    async update(id: string) {
        if (!uuidValidate(id)) {
            throw CustomError.badRequest('Invalid ID format - UUID expected');
        }

        const repair = await this.findOne(id);
        repair.status = repairStatus.completed;
        try {
            await repair.save()
            return {
                message: "Repair Updated",
            }
        } catch (error) {
            throw CustomError.internalServer("Error updating repair");
        }
    }

    async delete(id: string) {
        if (!uuidValidate(id)) {
            throw CustomError.badRequest('Invalid ID format - UUID expected');
        }

        const repair = await this.findOne(id);
        repair.status = repairStatus.canceled;
        try {
            await repair.save()
            return {
                message: "Repair canceled",
            }
        } catch (error) {
            throw CustomError.internalServer("Error deleting repair");
        }
    }
}
