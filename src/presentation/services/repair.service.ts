import { Repair, repairStatus } from "../../data/postgress/models/repair.model";
import { CreateRepairDTO, CustomError } from "../../domain";


export class RepairService {
    async findAll() {
        try {
            return await Repair.find({
                where: {
                    status: repairStatus.pending
                },
            });
        } catch (error) {
            throw CustomError.internalServer("Error fetching repair data")
        }
    };

    async findOne(id: string) {
        const repair = await Repair.findOne({
            where: {
                status: repairStatus.pending,
                id: id,
            },
        })
        if (!repair) {
            throw CustomError.notFound("Repair not found");
        }
        return repair;
    };


    async create(data: CreateRepairDTO) {
        const repair = new Repair()
        repair.date = data.Date;
        repair.userId = data.userId;
        try {
            return await repair.save();
        } catch (error) {
            throw CustomError.internalServer("Error creating repair")
        }
    };

    async update(id: string) {
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
    };

    async delete(id: string) {
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
    };

}
