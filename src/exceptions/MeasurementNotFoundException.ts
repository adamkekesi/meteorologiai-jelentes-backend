import HttpException from "./HttpException";

export default class MeasurementNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Measurement with id ${id} not found`);
    }
}
