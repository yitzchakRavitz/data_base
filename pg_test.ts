import { randomUUID } from "crypto";

import pkg from 'pg';
const { Client } = pkg;

async function makeQuery(name: string, birthDay: Date, country: string, city: string,
    street_1: string,  postal_code: string, phone_number: string) {
        
    const client = new Client({
        user: 'student_server',
        password: '1234',
        database: 'school'
    })
    
    const id = randomUUID();
    await client.connect();
    const res = await client.query<{id: string}>(
        `INSERT INTO students.students(id, name, birthday, country, city, street_1, postal_code, phone_number)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING *;`,
        [id, name, birthDay.toISOString(), country, city, street_1, postal_code, phone_number] 
    )
    const select1 = await client.query(
        `SELECT id , country, city FROM students.students
        WHERE id = $1`,
        [res.rows[0].id]
    )
    console.log(select1.rows);


    const update = await client.query(
        `UPDATE students.students AS s
        SET city =$1,
        country = $2
        WHERE id = $3
        RETURNING *`,
        ["Tel Aviv","USA",res.rows[0].id]
    )
    
    console.log(update.rows);
    

    const deleted = await client.query(
        `DELETE FROM students.students
        WHERE id = $1
        RETURNING *`,
        [res.rows[0].id]
    )
    console.log(deleted.rows);


    //const res = await client.query('SELECT * from students.students')
    console.log("%j", res.rows);
    await client.end();

};

makeQuery("Yitzchak",new Date("02/15/1992"),"Israel","Petch tikva","street","1234","0541234567");
