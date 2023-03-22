import HttpException from "./HttpException";

export default class hasRelationException extends HttpException {
    constructor(id: string) {
        super(400, `Document with id=${id} has relation(s), you can't delete!`);
    }
}
