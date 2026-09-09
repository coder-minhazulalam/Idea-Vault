import Navbar from "@/Components/Navbar";

// Main app pages — shows the Navbar
export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
    </>
  );
}
