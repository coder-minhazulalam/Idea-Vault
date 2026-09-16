"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { HiSun, HiMoon } from "react-icons/hi2";
import { Avatar } from "@heroui/react/avatar";
import { Dropdown } from "@heroui/react/dropdown";
import { NavLink } from "./NavLink";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/add-idea", label: "Add Idea" },
  { href: "/my-ideas", label: "My Ideas" },
  { href: "/my-interactions", label: "My Interactions" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme, resolvedTheme } = useTheme();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration-safe session check: matches SSR initially, updates cleanly on mount
  const isUser = mounted && Boolean(user);

  // Show all routes when logged in with a session; otherwise only show Home & Ideas
  const visibleLinks = isUser
    ? navLinks
    : navLinks.filter((link) => link.href === "/" || link.href === "/ideas");

  const signOutHandler = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const toggleTheme = () => {
    const current = resolvedTheme || theme;
    setTheme(current === "dark" ? "light" : "dark");
  };

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-divider bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-9 w-9">
              <Image
                src="/assets/NavLogo.png"
                alt="IdeaVault Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <span className="font-bold text-foreground text-lg tracking-tight">
              IdeaVault
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6">
            {visibleLinks.map(({ href, label }) => (
              <li key={href}>
                <NavLink href={href}>{label}</NavLink>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Theme Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              {isDark ? (
                <HiSun size={20} className="text-amber-400" />
              ) : (
                <HiMoon size={20} className="text-zinc-600 dark:text-zinc-300" />
              )}
            </button>

            {/* User Dropdown */}
            {isUser ? (
              <Dropdown>
                <Dropdown.Trigger className="rounded-full cursor-pointer p-0 min-w-0 h-auto bg-transparent border-none ring-2 ring-transparent hover:ring-amber-500/50 transition-all focus:outline-none">
                  <Avatar
                    size="sm"
                    src={user?.image}
                    name={user?.name}
                  />
                </Dropdown.Trigger>

                <Dropdown.Popover>
                  <Dropdown.Menu>

                    <Dropdown.Item key="profile">
                      <Link href="/profile" className="w-full block">
                        Profile
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key="signout"
                      onClick={signOutHandler}
                    >
                      Sign Out
                    </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : ( 
            <ul className="flex items-center gap-3">
              <li><NavLink href="/login"> Login </NavLink> </li>
              <li><NavLink href="/signup"> SignUp </NavLink> </li>
            </ul>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {isMenuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-divider bg-background">
          <ul className="flex flex-col gap-3 p-4">
            {visibleLinks.map(({ href, label }) => (
              <li
                key={href}
                onClick={() => setIsMenuOpen(false)}
              >
                <NavLink href={href}>{label}</NavLink>
              </li>
            ))}
            {!isUser && (
              <div className="pt-3 mt-1 border-t border-divider flex flex-col gap-2">
                <li onClick={() => setIsMenuOpen(false)}>
                  <NavLink href="/login">Login</NavLink>
                </li>
                <li onClick={() => setIsMenuOpen(false)}>
                  <NavLink href="/signup">SignUp</NavLink>
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};


export default Navbar;
