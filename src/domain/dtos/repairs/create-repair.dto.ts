import z from 'zod';

const CreateRepairSchema = z.object({
    date: z.string({ message: 'Date is required' }).date(),
    motorNumber: z.string().min(5 , { message: 'Motor number is required' }),
    description: z.string().min(10, { message: 'Description is required' }),
    userId: z.string().uuid({ message: 'User id is required' }),
});

export class CreateRepairDTO {
    constructor(
        public date: Date, public userId: string, public motorNumber: string, public description: string) { }

    static create(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
        const { date, userId, motorNumber, description } = object;

        const result = CreateRepairSchema.safeParse(object);

        if (!result.success) {
            const errorMessages = result.error.errors.reduce((acc: any, err: any) => {
                const field = err.path.join('.');
                console.log(field);
                console.log(err.message);
                acc[field] = err.message;
                return acc;
            }, {} as Record<string, string>);
            return [errorMessages];
        }

        return [undefined, new CreateRepairDTO(date, userId, motorNumber, description)];
    }
}
