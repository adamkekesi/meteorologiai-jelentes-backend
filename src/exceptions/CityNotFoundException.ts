import HttpException from "./HttpException";

export default class CityNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `City with id ${id} not found`);
    }
}
