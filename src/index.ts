import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.get("/", (req: Request, res: Response) => {
	res.send("ini server graphQL");
});

const port = 4100;
app.listen(port, () => {
	console.log("server graphQL berjalan di port: " + port);
});
