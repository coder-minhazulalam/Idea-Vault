import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="text-center">
        <p className="text-8xl font-black text-amber-500">404</p>

        <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">
          Page Not Found
        </h1>

        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link href="/">
          <button className="mt-8 rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-500 cursor-pointer">
            Go back home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
