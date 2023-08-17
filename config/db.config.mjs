import mysql from "mysql"




export const db = mysql.createPool({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "kome12345",
    database: "expressdb",
    connectionLimit:10
})


db.getConnection((error, connection) => {
    if (error) {
        console.error("Error getting connection:", error);
        return;
    }

    connection.query("SELECT 1", (queryError, results) => {
        connection.release(); // Release the connection back to the pool

        if (queryError) {
            console.error("Error executing test query:", queryError);
            return;
        }

        console.log("Connection to database is successful:", results);
    });
});