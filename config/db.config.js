import { createPool } from "mysql"

export const db = createPool({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "root",
    database: "expressDb",
    connectionLimit:10
})