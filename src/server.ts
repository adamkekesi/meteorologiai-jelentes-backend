import App from "./app";
import AuthenticationController from "./authentication/authentication.controller";
import UserController from "./user/user.controller";
import MeasurementController from "./measurement/measurement.controller";
import CityController from "./city/city.controller";

const app = new App([new AuthenticationController(), new UserController(), new MeasurementController(), new CityController()]);

app.listen();
