import { NextLogo } from '#/ui/next-logo';
import { SearchIcon, ShoppingCartIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:py-8 lg:px-8">
      <div className="rounded-lg bg-black p-px shadow-lg shadow-black/20">
        

            <div>{children}</div>

      </div>
    </div>
  );
}
