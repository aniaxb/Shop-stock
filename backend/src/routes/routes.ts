import {AuthRoutes} from "./authRoutes";
import {UserRoutes} from "./userRoutes";
import {ProductRoutes} from "./productRoutes";
import {CategoryRoutes} from "./categoryRoutes";
import {OrderRoutes} from "./orderRoutes";
import {StatusRoutes} from "./statusRoutes";

export const Routes = [
    ...AuthRoutes,
    ...UserRoutes,
    ...ProductRoutes,
    ...CategoryRoutes,
    ...OrderRoutes,
    ...StatusRoutes
]