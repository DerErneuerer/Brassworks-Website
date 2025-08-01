"use client";

import { CodeBlock } from "@/components/docs/CodeBlock";
import { ImageBlock } from "@/components/docs/ImageBlock";
import { SectionTitle } from "@/components/docs/SectionTitle";
import { Paragraph } from "@/components/docs/Paragraph";
import { TableBlock } from "@/components/docs/TableBlock";
import { TableOfContents } from "@/components/docs/TableOfContents";

export default function DocsIntroductionPage() {
  const headers = ["RAM (GB)", "Total Threads", "Thread Units"];
  const rows = [
    [2, "0.8", 1],
    [4, "1.6", 2],
    [6, "2.4", 3],
    [8, "3.2", 4],
    [10, "4.0", 5],
    [12, "4.8", 6],
    [14, "5.6", 7],
    [16, "6.4", 8],
    [18, "7.2", 9],
    [20, "8.0", 10],
    [22, "8.8", 11],
    [24, "9.6", 12],
    [26, "10.4", 13],
    [28, "11.2", 14],
    [30, "12.0", 15],
    [32, "12.8", 16],
  ].map(row => row.map(String));

  return (
    <div className="grid max-w-7xl mx-auto grid-cols-1 xl:grid-cols-[1fr_280px] gap-4 px-4 !overflow-visible">
      <section className="max-w-4xl p-4 md:p-6 lg:p-8 space-y-8">
        <div className="rounded-2xl px-6 md:px-10 shadow-lg space-y-8">
          <SectionTitle id="getting-started" title="Getting Started" />
          <Paragraph>
            This guide walks you through registering your account, provisioning servers, and setting up projects to manage your game servers.
          </Paragraph>

          <SectionTitle id="account-setup" title="1. Account Registration & Setup" />
          <Paragraph>
            Begin by <a className="text-green-600 underline" target="_blank" href="/signup">creating your account</a>, you can then <a className="text-green-600 underline" target="_blank" href="">buy your own server</a>, <a className="text-green-600 underline" target="_blank" href="">and configure it</a>.
          </Paragraph>

          <SectionTitle id="server-provisioning" title="2. Server Provisioning and Selection" />
          <Paragraph>
            In <a target="_blank" href="/docs/introduction"></a>
            Choose your base server specifications, apply pre-configured templates, and use Zenth for handling resource payments.
          </Paragraph>
          <CodeBlock language="bash" code="code" />

          <SectionTitle id="projects" title="3. Projects" />
          <Paragraph>
            Organize your servers into projects, allowing for better management, resource allocation, and customization.
          </Paragraph>
          <CodeBlock
            language="bash"
            code={`zcloud create-project my-minecraft-cluster
zcloud add-server --project my-minecraft-cluster --ram 8GB --threads 4`}
          />

          <SectionTitle id="templates" title="4. Using Templates and Customization" />
          <Paragraph>
            Quickly get started using popular templates, then customize and save configurations to match your needs.
          </Paragraph>
          <ImageBlock
            src="/images/minecraft.jpg"
            alt="Minecraft server template preview"
          />
          <TableBlock headers={headers} rows={rows} />
        </div>
      </section>

      <aside className="hidden xl:block sticky top-[6rem] self-start h-fit">
        <TableOfContents />
      </aside>
    </div>
  );
}