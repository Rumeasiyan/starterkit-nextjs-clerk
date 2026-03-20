import Link from 'next/link';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';

export default async function Home() {
    let users:
        | Array<{
              id: number;
              email: string;
              name: string | null;
              createdAt: Date;
          }>
        = [];
    let databaseError: string | null = null;

    try {
        users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
        });
    } catch (error) {
        console.error('Failed to load users on the home page.', error);
        databaseError =
            'Failed to load users. Check DATABASE_URL and run the Prisma database setup commands.';
    }

    return (
        <main className="flex flex-1">
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:justify-center lg:py-16">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
                    <section className="min-w-0 max-w-3xl space-y-6">
                        <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                            StarterKit auth
                        </p>
                        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Minimal authentication starter with clean defaults.
                        </h1>
                        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                            App Router, Clerk keyless mode, custom auth routes,
                            and a simple theme switcher. The auth UI stays close
                            to Clerk&apos;s defaults so it is easy to replace or
                            expand later.
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button asChild size="lg">
                                <Link href="/sign-up">Create account</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/sign-in">Sign in</Link>
                            </Button>
                        </div>
                    </section>

                    <section className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                        <div className="rounded-2xl border bg-card p-5 text-card-foreground shadow-sm">
                            <p className="text-sm font-medium">
                                Custom auth routes
                            </p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Sign in and sign up pages live in the App Router.
                            </p>
                        </div>
                        <div className="rounded-2xl border bg-card p-5 text-card-foreground shadow-sm">
                            <p className="text-sm font-medium">
                                Clerk defaults
                            </p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                The layout wraps Clerk cleanly without heavy visual overrides.
                            </p>
                        </div>
                        <div className="rounded-2xl border bg-card p-5 text-card-foreground shadow-sm">
                            <p className="text-sm font-medium">
                                Theme switcher
                            </p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Dark and light modes are available from the header.
                            </p>
                        </div>
                        <div className="rounded-2xl border bg-card p-5 text-card-foreground shadow-sm">
                            <p className="text-sm font-medium">Database</p>
                            {databaseError ? (
                                <p className="mt-2 text-sm leading-6 text-destructive">
                                    {databaseError}
                                </p>
                            ) : users.length === 0 ? (
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    Connected to PostgreSQL. No users found yet.
                                </p>
                            ) : (
                                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                    {users.map((user) => (
                                        <li key={user.id} className="rounded-lg bg-muted px-3 py-2">
                                            <p className="font-medium text-foreground">
                                                {user.name ?? 'Unnamed user'}
                                            </p>
                                            <p>{user.email}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
