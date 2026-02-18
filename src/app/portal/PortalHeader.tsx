'use client';

import { signOut } from 'next-auth/react';

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface PortalHeaderProps {
  user?: User;
}

export default function PortalHeader({ user }: PortalHeaderProps) {
  return (
    <header className="h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-white">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
          <div className="text-right">
            <p className="text-sm font-medium text-white">
              {user?.name || 'Client User'}
            </p>
            <p className="text-xs text-zinc-500">
              {user?.email || ''}
            </p>
          </div>
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name || 'User'}
              className="w-9 h-9 rounded-full border border-zinc-700"
            />
          ) : (
            <div className="w-9 h-9 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center">
              <span className="text-emerald-400 font-semibold text-sm">
                {(user?.name || 'U')[0].toUpperCase()}
              </span>
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/portal/login' })}
            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
            title="Sign out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
