import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </div>
    );
}
