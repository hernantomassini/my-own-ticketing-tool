import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialLink } from "@/components/ui/social-link";
import { Switch } from "@/components/ui/switch";
import { Mail } from "lucide-react";
import { SiLinkedin, SiGithub, SiGoogle } from "react-icons/si";
import Link from "next/link";

export default function Login() {
  return (
    <main className="min-h-dvh flex">
      <div
        aria-hidden="true"
        className="hidden md:basis-[70%] md:block bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500"
      />

      <section className="md:basis-[30%] mt-25 mb-8 mx-8 flex flex-col gap-6">
        <div className="gap-5">
          <h1 className="text-3xl font-bold mb-4">My Ticketing Tool</h1>
          <p>Login is in progress... Auth is not implemented yet.</p>
        </div>

        <form className="mt-3 space-y-3">
          <Label htmlFor="email">Email</Label>
          <Input disabled id="email" type="email" placeholder="Email (disabled)"></Input>

          <Label htmlFor="password">Password</Label>
          <Input disabled id="password" type="password" placeholder="Password (disabled)"></Input>

          <div className="flex justify-between items-center mt-5">
            <div className="flex gap-2">
              <Switch disabled id="remember-me"/>
              <Label htmlFor="remember-me">Remember me</Label>
            </div>

            <Link href="" className="text-blue-400 hover:underline">
              <small>Forgot password?</small>
            </Link>
          </div>

          <Button asChild className="mt-5 w-full">
            <Link href="/board">Continue to Dashboard</Link>
          </Button>

          <Button disabled className="mt-5 w-full">
            <SiGoogle /> Sign in with Google
          </Button>
        </form>

        <div className="flex justify-center">
          <small>
            Don&apos;t have an account?{" "}
            {/* <a className="hover:underline cursor-pointer text-blue-400">Sign up now!</a> */}

            <Link href="" className="text-blue-400 hover:underline">
              Sign up now!
            </Link>

          </small>
        </div>

        <footer className="flex justify-between items-center mt-auto border-t pt-2">
          <div className="flex">
            <SocialLink
              href="https://www.linkedin.com/in/hernantomassini/?locale=en_US"
              label="LinkedIn"
              icon={SiLinkedin}
            />

            <SocialLink
              href="https://github.com/hernantomassini"
              label="GitHub"
              icon={SiGithub}
            />

            <SocialLink
              href="mailto:hernantomassini@gmail.com"
              label="Email"
              icon={Mail}
            />
          </div>

          <p className="text-sm">© 2025 Hernán Tomassini</p>
        </footer>

      </section>
    </main>
  );
}
