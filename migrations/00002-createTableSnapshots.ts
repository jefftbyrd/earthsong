import type { Sql } from 'postgres';
import { z } from 'zod';

export type Snapshot = {
  id: number;
  sounds: any;
  userId: number;
};

// export async function up(sql: Sql) {
//   await sql`
//     CREATE TABLE snapshots (
//       id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//       title varchar(200) NOT NULL UNIQUE,
//       -- date date NOT NULL DEFAULT CURRENT_DATE,
//       sounds jsonb NOT NULL,
//       user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade
//     )
//   `;
// }

export const snapshotSchema = z.any();

// export const snapshotSchema = z.object({
//   // title: z.string().min(3).max(100),
//   sounds: z.any(),
// });

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE snapshots (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      sounds json NOT NULL,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade
    )
  `;
}

// export async function up(sql: Sql) {
//   await sql`
//     CREATE TABLE snapshots (
//       id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//       title varchar(100) NOT NULL UNIQUE,
//       text_content text NOT NULL,
//       user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade
//     )
//   `;
// }

export async function down(sql: Sql) {
  await sql`DROP TABLE snapshots`;
}
