import { readFileSync } from "fs";
import { join } from "path";
import ResearchClient from "./ResearchClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function ResearchPage() {
  const root = process.cwd();
  const markdown = readFileSync(
    join(root, "content", "research", "market-research.md"),
    "utf8"
  );
  const sql = readFileSync(
    join(root, "content", "sql", "personas-seed.sql"),
    "utf8"
  );

  return <ResearchClient markdown={markdown} sql={sql} />;
}
