import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Logo } from "@/components/Logo";
import { company } from "@/content/site";

async function authenticate(formData: FormData) {
  "use server";
  const password = formData.get("password") as string;
  const sitePassword = process.env.SITE_PASSWORD;

  if (!sitePassword || password === sitePassword) {
    (await cookies()).set("wmrs_auth", password ?? "", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      // Expires when the browser closes (session cookie)
    });
    redirect("/");
  }

  redirect("/password?error=1");
}

export default async function PasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-offwhite flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="border border-charcoal/10 bg-white p-8">
          <div className="w-6 h-px bg-accent mb-6" />
          <h1 className="text-lg font-bold text-charcoal mb-1">
            {company.legalName}
          </h1>
          <p className="text-sm text-charcoal/50 mb-6">
            This site is password-protected.
          </p>

          <form action={authenticate} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-charcoal mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                className="w-full border border-charcoal/20 bg-white px-4 py-3 text-sm focus:outline-none focus:border-charcoal transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">
                Incorrect password. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-charcoal text-white text-sm font-semibold py-3 hover:bg-charcoal/85 transition-colors"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
