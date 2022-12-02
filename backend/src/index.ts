import * as express from "express"
import {Request, Response} from "express"
import {getDataSource} from "./utils/data-source"
import {User} from "./model/User";
import {Category} from "./model/Category";
import {Product} from "./model/Product";
require('dotenv').config()
const app = express();
app.use(express.json());


app.get("/user", async function (req: Request, res: Response) {
    const AppDataSource = await getDataSource();
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
});

app.get("/test", async function (req: Request, res: Response) {
    const AppDataSource = await getDataSource();
    const seasonRepo = AppDataSource.getRepository(Category);
    const categ = new Category("Example")
    await seasonRepo.save(categ)
    res.json(categ);
});

app.get("/testt", async function (req: Request, res: Response) {
    const AppDataSource = await getDataSource();
    const seasonRepo = AppDataSource.getRepository(Category);
    const categ = seasonRepo.find({
        where: {
            name: "Example"
        }
    }).then(result => {
        let xd = [];
        const categ = new Category("Example")
        xd.push(result)
        console.log(xd)
        const prod = new Product("xd", "httpxd", 5.0, "xd", 6.3)
        prod.categories = result
        console.log(prod)
        const seasonRepo2 = AppDataSource.getRepository(Product);
        seasonRepo2.save(prod)
        res.json(prod);
    })
});

app.get("/testtt", async function (req: Request, res: Response) {
    const AppDataSource = await getDataSource();
    const seasonRepo2 = AppDataSource.getRepository(Product);
    await seasonRepo2.find({
        where: {
            id: 9
        }
    }).then(xd => {
        console.log(xd)
        }
    )
});


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));