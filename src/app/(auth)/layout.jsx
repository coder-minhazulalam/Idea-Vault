import Navbar from "@/Components/Navbar";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
