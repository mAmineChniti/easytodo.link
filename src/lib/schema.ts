import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { type Task, generateId } from "./utils";

export const lists = sqliteTable("lists", {
  id: text("id").$defaultFn(() => generateId()),
  title: text("title").notNull(),
  tasks: text("tasks", { mode: "json" }).$type<Task[]>()
});

export type List = typeof lists.$inferSelect;
export type ListInsert = typeof lists.$inferInsert;
