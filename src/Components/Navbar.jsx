"use client";

import { useState, useEffect } from "react";
import { NavLink } from "./NavLink";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { HiSearch, HiMenu, HiX, HiPlus } from "react-icons/hi";
import { HiSun, HiMoon } from "react-icons/hi2";
import { Button } from "@heroui/react/button";
import { Avatar } from "@heroui/react/avatar";
import { Dropdown } from "@heroui/react/dropdown";
import { authClient } from "@/lib/auth-client";

// import { authClient } from "@/lib/auth-client";

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
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const { data: session } = authClient.useSession()
  const user = session?.user;
  console.log("User:", user);

  const SignOutHandler = async() => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signup"); // redirect to login page
        },
      },
    });
  }

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-divider bg-background/80 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* ── Logo + Brand ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative h-9 w-9 rounded-lg overflow-hidden">
              <Image
                src="/assets/NavLogo.png"
                alt="IdeaVault Logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-base font-black tracking-widest uppercase text-foreground group-hover:text-primary transition-colors duration-200 select-none">
              IdeaVault
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <NavLink href={href}>{label}</NavLink>
              </li>
            ))}
          </ul>

          {/* ── Right Controls (desktop) ── */}
          <div className="hidden md:flex items-center gap-2 shrink-0">

            {/* Search */}
            <div className="relative flex items-center">
              <HiSearch
                className="absolute left-3 text-default-400 pointer-events-none z-10"
                size={14}
              />
              <input
                className="pl-8 pr-4 py-1.5 text-sm rounded-full bg-default-100 hover:bg-default-200 focus:bg-default-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors w-44 placeholder:text-default-400 text-foreground"
                placeholder="Search vaults..."
                type="search"
                aria-label="Search vaults"
              />
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-default-600 hover:text-foreground hover:bg-default-100 transition-colors"
              aria-label="Toggle theme"
              suppressHydrationWarning
            >
              <span suppressHydrationWarning>
                {mounted ? (
                  theme === "dark" ? <HiSun size={18} /> : <HiMoon size={18} />
                ) : (
                  <HiMoon size={18} />
                )}
              </span>
            </button>

            {/* + PITCH button */}
            <Button
              size="sm"
              variant="solid"
              className="font-semibold px-4 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-1"
              onClick={() => router.push("/add-idea")}
            >
              <HiPlus size={16} />
              Pitch
            </Button>

            {/* Avatar Dropdown */}
            <Dropdown>
              <Dropdown.Trigger asChild>
                <div
                  className="flex rounded-full ring-2 ring-transparent hover:ring-primary/50 transition-all duration-200 cursor-pointer"
                  aria-label="User menu"
                  role="button"
                  tabIndex={0}
                >
                  <Avatar size="sm" color="primary">
                    <Avatar.Fallback className="text-xs font-bold">U</Avatar.Fallback>
                  </Avatar>
                </div>
              </Dropdown.Trigger>
              <Dropdown.Popover placement="bottom-end">
                <Dropdown.Menu>
                  <Dropdown.Item key="profile">
                    <Link href="/profile" className="block w-full">Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="my-ideas">
                    <Link href="/my-ideas" className="block w-full">My Ideas</Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="settings">
                    <Link href="/settings" className="block w-full">Settings</Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="logout" className="text-danger" onClick={SignOutHandler}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>

          {/* ── Mobile controls ── */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-default-600 hover:bg-default-100 transition-colors"
              aria-label="Toggle theme"
              suppressHydrationWarning
            >
              <span suppressHydrationWarning>
                {mounted ? (
                  theme === "dark" ? <HiSun size={18} /> : <HiMoon size={18} />
                ) : (
                  <HiMoon size={18} />
                )}
              </span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-default-600 hover:bg-default-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-divider bg-background/95 backdrop-blur-xl">
          <div className="mx-auto max-w-screen-xl px-4 py-4 flex flex-col gap-3">
            {/* Mobile Search */}
            <div className="relative flex items-center">
              <HiSearch
                className="absolute left-3 text-default-400 pointer-events-none z-10"
                size={16}
              />
              <input
                className="pl-9 w-full rounded-xl bg-default-100 text-sm py-2 placeholder:text-default-400 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Search vaults..."
                type="search"
                aria-label="Search vaults"
              />
            </div>

            {/* Mobile nav links */}
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ href, label }) => (
                <li key={href} onClick={() => setIsMenuOpen(false)}>
                  <NavLink href={href}>{label}</NavLink>
                </li>
              ))}
            </ul>

            {/* Mobile CTA */}
            <Button
              variant="solid"
              className="w-full rounded-full bg-primary text-white font-semibold flex items-center justify-center gap-1"
              onClick={() => {
                router.push("/add-idea");
                setIsMenuOpen(false);
              }}
            >
              <HiPlus size={16} />
              Pitch
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
