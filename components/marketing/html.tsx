import fs from "node:fs";
import path from "node:path";

export function MarketingHtml({ name }: { name: string }) {
  const html = fs.readFileSync(
    path.join(process.cwd(), "content/marketing", `${name}.html`),
    "utf8",
  );

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
