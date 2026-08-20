import { ToolNav } from "@/components/ToolNav";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:py-14">
      <ToolNav />
      {children}
    </main>
  );
}