import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CategoriesMenu from "./(navbar)/CategoriesMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Taskly — organize your tasks in multiple lists",
    template: "%s · Taskly",
  },
  description:
    "A multi-list to-do app: one list for what you need to do, another for what you need to buy, and more.",
};

export const viewport: Viewport = {
  themeColor: "#f7f8fb",
};

function CategoriesMenuFallback() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-slate-200/70 bg-white/80 px-4 backdrop-blur-xl lg:hidden">
        <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200/70" />
        <div className="h-8 w-44 animate-pulse rounded-full bg-slate-200/70" />
      </header>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-slate-200/70 bg-white/80 backdrop-blur-xl lg:flex">
        <div className="flex items-center gap-3 px-5 pt-6">
          <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200/70" />
          <div className="space-y-2">
            <div className="h-3.5 w-24 animate-pulse rounded bg-slate-300/70" />
            <div className="h-2.5 w-28 animate-pulse rounded bg-slate-200/70" />
          </div>
        </div>
        <div className="mt-10 px-5">
          <div className="mx-1 h-2.5 w-20 animate-pulse rounded bg-slate-200/70" />
        </div>
        <div className="mt-4 space-y-1.5 px-2.5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-9 w-full animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
        <div className="border-t border-slate-200/70 p-4">
          <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200/70" />
        </div>
      </aside>
    </>
  );
}

function ContentFallback() {
  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] items-center justify-center px-4 lg:min-h-screen">
      <div className="flex items-center gap-1.5" role="status" aria-label="Loading">
        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.2s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.4s]" />
      </div>
    </div>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col text-slate-700">
        <Suspense fallback={<CategoriesMenuFallback />}>
          <CategoriesMenu />
        </Suspense>
        <main className="flex-1 pt-14 lg:pt-0 lg:pl-72">
          <Suspense fallback={<ContentFallback />}>{children}</Suspense>
        </main>
      </body>
    </html>
  );
}
