"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { 
  User, 
  Mail, 
  Key, 
  Lightbulb, 
  MessageSquare, 
  PlusCircle, 
  LogOut, 
  ExternalLink,
  ShieldCheck
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [ideaCount, setIdeaCount] = useState(0);
  const [interactionCount, setInteractionCount] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);

  // Client-side protection fallback: if not authenticated, redirect to login
  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login?callbackUrl=/profile");
    }
  }, [user, isPending, router]);

  // Fetch user stats (ideas count and comments count)
  useEffect(() => {
    if (!user?.id) return;

    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const [ideasRes, commentsRes] = await Promise.all([
          fetch(`http://localhost:5000/ideas/user/${user.id}`).then((r) => r.json()).catch(() => []),
          fetch(`http://localhost:5000/comments/user/${user.id}`).then((r) => r.json()).catch(() => []),
        ]);

        if (Array.isArray(ideasRes)) setIdeaCount(ideasRes.length);
        if (Array.isArray(commentsRes)) setInteractionCount(commentsRes.length);
      } catch (err) {
        console.error("Failed to load user profile stats:", err);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [user?.id]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  // Loading state
  if (isPending || (!user && isPending)) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initials = (user.name || "User")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-[#09090b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your personal profile and account activity.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111113] sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            
            {/* Avatar */}
            <div className="relative">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="h-24 w-24 rounded-full border-2 border-amber-500 object-cover shadow"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                  {initials}
                </div>
              )}
              <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" title="Active" />
            </div>

            {/* User Details */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                  {user.name || "IdeaVault User"}
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified User
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span>{user.email}</span>
                </div>

                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <Key className="h-4 w-4 text-slate-400" />
                  <span className="font-mono text-xs">User ID: {user.id}</span>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="mt-2 sm:mt-0">
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Activity & Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          
          {/* Ideas Stat Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111113]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Ideas Submitted
                </p>
                <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
                  {statsLoading ? "..." : ideaCount}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-pink-500 dark:bg-pink-500/10 dark:text-pink-400">
                <Lightbulb className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4 dark:border-white/10">
              <Link
                href="/my-ideas"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-500 dark:text-amber-400"
              >
                View all my ideas
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Interactions Stat Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111113]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Total Interactions
                </p>
                <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
                  {statsLoading ? "..." : interactionCount}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400">
                <MessageSquare className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4 dark:border-white/10">
              <Link
                href="/my-interactions"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-500 dark:text-amber-400"
              >
                View my interactions
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>

        </div>

        {/* Quick Actions Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111113]">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Quick Actions
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link
              href="/add-idea"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-amber-500/50 hover:bg-amber-50/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-amber-500/40 dark:hover:bg-amber-500/10"
            >
              <PlusCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Add New Idea
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Share a new concept
                </p>
              </div>
            </Link>

            <Link
              href="/my-ideas"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-pink-500/50 hover:bg-pink-50/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-pink-500/40 dark:hover:bg-pink-500/10"
            >
              <Lightbulb className="h-5 w-5 text-pink-500 dark:text-pink-400" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  My Ideas
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage your posts
                </p>
              </div>
            </Link>

            <Link
              href="/my-interactions"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-500/50 hover:bg-blue-50/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10"
            >
              <MessageSquare className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  My Interactions
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Comments & activity
                </p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
} 
