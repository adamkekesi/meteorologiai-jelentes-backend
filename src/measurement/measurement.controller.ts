import { NextFunction, Request, Response, Router } from "express";

import IController from "../interfaces/controller.interface";
import CreateMeasurementDto from "./measurement.dto";
import HttpException from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import IMeasurement from "./measurement.interface";
import authMiddleware from "../middleware/auth.middleware";
import measurementModel from "./measurement.model";
import validationMiddleware from "../middleware/validation.middleware";
import MeasurementNotFoundException from "../exceptions/MeasurementNotFoundException";
import HasRelationException from "../exceptions/HasRelationException";
import cityModel from "../city/city.model";

export default class MeasurementController implements IController {
    public path = "/measurements";
    public router = Router();
    private measurementM = measurementModel;
    private cityM = cityModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllMeasurements);
        this.router.get(`${this.path}/:id`, this.getMeasurementById);
        this.router.get(`${this.path}/:offset/:limit/:order/:sort/:keyword?`, this.getPaginatedMeasurements);
        this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(CreateMeasurementDto, true)], this.modifyMeasurement);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteMeasurements);
        this.router.post(this.path, [authMiddleware, validationMiddleware(CreateMeasurementDto)], this.createMeasurement);
    }

    private getAllMeasurements = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const count = await this.measurementM.countDocuments();
            const measurements = await this.measurementM.find();
            res.send({ count: count, measurements: measurements });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getPaginatedMeasurements = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const offset = parseInt(req.params.offset);
            const limit = parseInt(req.params.limit);
            const order = req.params.order;
            const sort = parseInt(req.params.sort); // desc: -1  asc: 1
            console.log(limit);
            let measurements = [];
            let count = 0;
            if (req.params.keyword) {
                const myRegex = new RegExp(req.params.keyword, "i"); // i for case insensitive
                count = await this.measurementM.find({ $or: [{ measurementName: myRegex }, { description: myRegex }] }).count();
                measurements = await this.measurementM
                    .find({ $or: [{ measurementName: myRegex }, { description: myRegex }] })
                    .sort(`${sort == -1 ? "-" : ""}${order}`)
                    .skip(offset)
                    .limit(limit);
            } else {
                count = await this.measurementM.countDocuments();
                measurements = await this.measurementM
                    .find({})
                    .sort(`${sort == -1 ? "-" : ""}${order}`)
                    .skip(offset)
                    .limit(limit);
            }
            res.send({ count: count, measurements: measurements });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getMeasurementById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (id) {
                const measurement = await this.measurementM.findById(id).populate("city");
                if (measurement) {
                    res.send(measurement);
                } else {
                    next(new MeasurementNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private modifyMeasurement = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (id) {
                const measurementData: IMeasurement = req.body;
                const measurement = await this.measurementM.findByIdAndUpdate(id, measurementData, { new: true });
                if (measurement) {
                    res.send(measurement);
                } else {
                    next(new MeasurementNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private createMeasurement = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const measurementData: IMeasurement = req.body;
            const createdMeasurement = new this.measurementM(measurementData);
            const savedMeasurement = await createdMeasurement.save();
            await savedMeasurement.populate("city");
            res.send(savedMeasurement);
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteMeasurements = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (id) {
                    const successResponse = await this.measurementM.findByIdAndDelete(id);
                    if (successResponse) {
                        res.sendStatus(200);
                    } else {
                        next(new MeasurementNotFoundException(id));
                    }
                
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
}
