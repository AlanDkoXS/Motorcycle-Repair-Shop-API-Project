import z from 'zod';

const CreateRepairSchema = z.object({
    date: z.date(),
    motorsNumber: z.string().min(1),
    description: z.string().min(1),
    userId: z.string().uuid(),
});

export class CreateRepairDTO {
    constructor(
        public date: Date, public userId: string, public motorsNumber: string, public description: string) { }

    static create(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
        const { date, userId, motorsNumber, description } = object;

        const result = CreateRepairSchema.safeParse({ date, userId, motorsNumber, description });

        if (!result.success) return [result.error.message];

        return [undefined, new CreateRepairDTO(date, userId, motorsNumber, description)];
    }
}
