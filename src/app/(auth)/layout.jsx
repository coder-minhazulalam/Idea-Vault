import Navbar from "@/Components/Navbar";

// Auth pages don't show the Navbar — this layout wraps only login/signup
export default function AuthLayout({ children }) {
  
  return <>
  <Navbar />
  <main>
      {children}
  </main>
  
  </>;
}
