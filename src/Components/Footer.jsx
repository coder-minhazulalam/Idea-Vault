"use client";

import Link from "next/link";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  Send,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { FaGithub, FaGoogle, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
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


              <span className="text-sm font-bold text-zinc-900 dark:text-white">
                IdeaVault
              </span>
            </Link>

            <p className="mt-3 max-w-xs text-[10px] leading-5 text-zinc-500 dark:text-zinc-400">
              Where startup concepts turn into validated products. Share ideas
              early, gather unbiased builder feedback, and find your next
              co-founder.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-wide text-zinc-900 dark:text-white">
              Platform
            </h3>

            <div className="mt-3 space-y-2">
              <Link
                href="/ideas"
                className="block text-[10px] text-zinc-500 transition hover:text-pink-500"
              >
                Explore Ideas
              </Link>

              <Link
                href="/categories"
                className="block text-[10px] text-zinc-500 transition hover:text-pink-500"
              >
                Categories
              </Link>

              <Link
                href="/trending"
                className="block text-[10px] text-zinc-500 transition hover:text-pink-500"
              >
                Trending
              </Link>

              <Link
                href="/add-idea"
                className="block text-[10px] text-zinc-500 transition hover:text-pink-500"
              >
                Submit Idea
              </Link>

              <Link
                href="/how-it-works"
                className="block text-[10px] text-zinc-500 transition hover:text-pink-500"
              >
                How it works
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-wide text-zinc-900 dark:text-white">
              Contact & Support
            </h3>

            <div className="mt-3 space-y-3">

              <a
                href="mailto:contact@ideavault.io"
                className="flex items-center gap-2 text-[10px] text-zinc-500 transition hover:text-pink-500"
              >
                <Mail className="h-3 w-3" />
                contact@ideavault.io
              </a>

              <a
                href="mailto:support@ideavault.io"
                className="flex items-center gap-2 text-[10px] text-zinc-500 transition hover:text-pink-500"
              >
                <MessageSquare className="h-3 w-3" />
                support@ideavault.io
              </a>

              <Link
                href="/feedback"
                className="flex items-center gap-2 text-[10px] text-zinc-500 transition hover:text-pink-500"
              >
                <Send className="h-3 w-3" />
                Send Feedback
              </Link>

            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-wide text-zinc-900 dark:text-white">
              Connect & Community
            </h3>

            <p className="mt-3 max-w-xs text-[10px] leading-4 text-zinc-500 dark:text-zinc-400">
              Follow our updates, community highlights, and releases.
            </p>

            <div className="mt-3 flex items-center gap-2">

              <a
                href="#"
                className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 transition hover:bg-pink-500 hover:text-white dark:bg-zinc-800 dark:text-zinc-300"
              >
                <FaGoogle />
              </a>

              <a
                href="#"
                className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 transition hover:bg-pink-500 hover:text-white dark:bg-zinc-800 dark:text-zinc-300"
              >
                <FaGithub className="h-3.5 w-3.5"/>
              </a>

              <a
                href="#"
                className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 transition hover:bg-pink-500 hover:text-white dark:bg-zinc-800 dark:text-zinc-300"
              >
                <FaTwitter className="h-3.5 w-3.5" />
              </a>

              <a
                href="#"
                className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 transition hover:bg-pink-500 hover:text-white dark:bg-zinc-800 dark:text-zinc-300"
              >
                <FaLinkedin className="h-3.5 w-3.5" />
              </a>



            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-4 border-t border-zinc-200 pt-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
            © 2025 IdeaVault. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              href="/privacy-policy"
              className="text-[10px] text-zinc-500 transition hover:text-pink-500"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-[10px] text-zinc-500 transition hover:text-pink-500"
            >
              Terms of Service
            </Link>

            <Link
              href="/cookies"
              className="text-[10px] text-zinc-500 transition hover:text-pink-500"
            >
              Cookies
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
};


export default Footer;