export class CreateRepairDTO {
    constructor(
        public Date: Date, public userId: string) { }

    static create(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
        const { date, userId } = object;

        if (!date) return ["Date required"];
        if (!userId) return ["User ID required"];

        return [undefined, new CreateRepairDTO(date, userId)];
    }
}
