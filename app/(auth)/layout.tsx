export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
            {children}
        </main>
    );
}
