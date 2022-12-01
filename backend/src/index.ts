import * as express from "express"
import {Request, Response, Router} from "express"
import {getDataSource} from "./utils/data-source"
import {User} from "./entity/User";

const app = express();
app.use(express.json());
const port = 3000;


app.get("/user", async function (req: Request, res: Response) {
    const AppDataSource = await getDataSource();
    const seasonRepo = AppDataSource.getRepository(User);
    const users = await seasonRepo.find();
    res.json(users);
});


app.listen(port, () => console.log(`Server running on port ${port}`));