import { readFileSync } from "fs";
import { join } from "path";
import SalesPlanClient from "./SalesPlanClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function SalesPlanPage() {
  const root = process.cwd();
  const markdown = readFileSync(
    join(root, "content", "research", "sales-plan.md"),
    "utf8"
  );
  return <SalesPlanClient markdown={markdown} />;
}
