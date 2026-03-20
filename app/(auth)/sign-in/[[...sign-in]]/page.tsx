import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
    return (
        <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
    );
}
