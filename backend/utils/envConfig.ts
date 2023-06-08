import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.NODE_ENV_PORT;
const MONGODB_URL = process.env.NODE_ENV_MONGODB_URL;
const SECRET = "process.NODE_ENV_env.SECRET";

export { MONGODB_URL, PORT, SECRET };
