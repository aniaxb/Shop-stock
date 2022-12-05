import * as express from "express";
import {Request, Response} from "express";
import {errorHandler} from "./middleware/errorHandler";
import {corsOptions} from "./config/corsOptions";
import {logger} from "./middleware/logger";
import {verifyJWT} from "./middleware/verifyJWT";
import {Routes} from "./routes/route";

require('dotenv').config();
const app = express();
const cors = require('cors');

app.use(logger);
app.use(express.json());
app.use(cors(corsOptions))
app.use(verifyJWT);

Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next)
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

        } else if (result !== null && result !== undefined) {
            res.json(result)
        }
    })
})

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('json')) {
        res.json({
            "error": "404 Not Found"
        });
    }
});
app.use(errorHandler)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));