import 'server-only';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialLink } from "@/components/ui/social-link";
import { Switch } from "@/components/ui/switch";
import { Mail } from "lucide-react";
import { SiLinkedin, SiGithub, SiGoogle } from "react-icons/si";
import { AnonymousLoginButton } from "./components/AnonymousLoginButton";
import { getTranslations } from "next-intl/server";

import Link from "next/link";
import PreferencesMenu from '@/components/PreferencesMenu';

export default async function Login() {
  const t = await getTranslations("login");

  return (
    <main className="min-h-dvh flex">
      <div
        aria-hidden="true"
        className="hidden md:basis-[70%] md:block bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500"
      />

      <section className="md:basis-[30%] mt-4 mx-8 flex flex-col justify-between">
        <header className="flex justify-end gap-2">
          <PreferencesMenu />
        </header>

        <section>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
            <p>{t('in-progress')}</p>
          </div>

          <form className="mt-3 space-y-3">
            <Label htmlFor="email">{t('email')}</Label>
            <Input disabled id="email" type="email" placeholder="Email (disabled)"></Input>

            <Label htmlFor="password">{t('password')}</Label>
            <Input disabled id="password" type="password" placeholder="Password (disabled)"></Input>

            <div className="flex justify-between items-center mt-6 mb-4">
              <div className="flex gap-2">
                <Switch disabled id="remember-me"/>
                <Label htmlFor="remember-me">{t('remember-me')}</Label>
              </div>

              <Link href="" className="text-blue-400 hover:underline">
                <small>{t('forgot-password')}</small>
              </Link>
            </div>

            <AnonymousLoginButton />

            <Button variant="outline" disabled className="w-full">
              <Link href="/home">{t('login-with-email')}</Link>
            </Button>

            <Button variant="outline" disabled className="w-full">
              <SiGoogle /> {t('login-with-google')}
            </Button>
          </form>

          <div className="flex justify-center mt-10">
            <small>
              {t('no-account')}{" "}

              <Link href="" className="text-blue-400 hover:underline">
                {t('sign-up')}
              </Link>
            </small>
          </div>
        </section>

        <footer className="flex flex-col md:flex-row justify-between items-center border-t pt-1 mb-1">
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
