import { NextFunction, Request, Response, Router } from "express";

import IController from "../interfaces/controller.interface";
import HttpException from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import cityModel from "./city.model";
import CreateCityDto from "./city.dto";
import ICity from "./city.interface";
import CityNotFoundException from "../exceptions/CityNotFoundException";

export default class CityController implements IController {
    public path = "/cities";
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllCities);
        this.router.get(`${this.path}/:id`, authMiddleware, this.getCityById);
        this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(CreateCityDto, true)], this.modifyCity);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteCity);
        this.router.post(this.path, [authMiddleware, validationMiddleware(CreateCityDto)], this.createCity);
    }

    private getAllCities = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cities = await cityModel.find();
            res.send({ cities: cities });
        } catch (error) {
            next(new HttpException(500, error.message));
        }
    };

    private getCityById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (id) {
                const city = await cityModel.findById(id);
                if (city) {
                    res.send(city);
                } else {
                    next(new CityNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(500, error.message));
        }
    };

    private modifyCity = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (id) {
                const cityData: ICity = req.body;
                const city = await cityModel.findByIdAndUpdate(id, cityData, { new: true });
                if (city) {
                    res.send(city);
                } else {
                    next(new CityNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private createCity = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cityData: ICity = req.body;
            const createdCity = new cityModel({
                ...cityData,
            });
            const savedCity = await createdCity.save();
            res.send(savedCity);
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteCity = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (id) {
                const successResponse = await cityModel.findByIdAndDelete(id);
                if (successResponse) {
                    res.sendStatus(200);
                } else {
                    next(new CityNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
}
