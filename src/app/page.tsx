'use client';

import { ROUTES } from '@/lib/routes-config';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="flex flex-col items-center gap-6 p-10 rounded-xl border border-gray-700  shadow-lg">
        <h1 className="text-4xl font-bold">Next Chat App</h1>
        <p className="text-gray-400 text-center">
          Connect with friends instantly in a sleek dark environment.
        </p>

        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={() => router.push(ROUTES.LOGIN)}
            className="w-full px-4 py-3 rounded-lg border bg-gray-800 border-gray-600 hover:bg-gray-900 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push(ROUTES.REGISTER)}
            className="w-full px-4 py-3 rounded-lg border bg-gray-800 border-gray-600 hover:bg-gray-900 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
