"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";

import LoginCard from "@/components/auth/LoginCard";
import { Button } from "@/components/ui/button";

const variants = {
  initial: { x: 0 },
  shake: {
    x: [0, -10, 10, -10, 10, -5, 5, 0],
    transition: { duration: 0.4 },
  },
  fadeIn: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  fadeOut: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.4 },
  },
};

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [animation, setAnimation] = useState("fadeIn");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const timeout = setTimeout(() => {
        router.push(callbackUrl);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [status, router, callbackUrl]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <LoginCard title="Welcome back!">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="animate-spin w-6 h-6 text-primary" />
          <p className="text-sm text-muted-foreground">Redirecting...</p>
        </div>
      </LoginCard>
    );
  }

  const handleGoogleSignIn = async () => {
    // Mark Google as login source
    localStorage.setItem("login", "true");
    localStorage.setItem("provider", "google");

    const res = await signIn("google", {
      callbackUrl,
      redirect: false,
    });

    if (res?.url) {
      setTimeout(() => {
        window.location.href = res.url!;
      }, 1000);
    }
  };

  return (
    <LoginCard>
      <motion.div
        variants={variants}
        animate={animation}
        initial="initial"
        className="space-y-6"
      >
        <p className="text-sm text-muted-foreground text-center">
          Sign in with Google to continue
        </p>

        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full justify-center flex items-center cursor-pointer"
        >
          <FaGoogle className="mr-2 w-4 h-4" />
          Sign in with Google
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By continuing, you agree to our{" "}
          <span className="underline">terms</span> and{" "}
          <span className="underline">privacy policy</span>.
        </p>
      </motion.div>
    </LoginCard>
  );
}
