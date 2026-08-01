import Link from "next/link";
import LoginForm from "../_components/LoginForm";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12 overflow-hidden bg-background">
      {/* Background Glow Effect */}
      <div className="absolute size-96 rounded-full bg-primary/10 blur-3xl pointer-events-none -z-10 animate-pulse" />

      <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card/85 backdrop-blur-xl p-8 shadow-2xl space-y-6 transition-all duration-300 hover:shadow-primary/5">
        
        {/* Top Icon / Brand Accent */}
        <div className="flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary shadow-inner">
            <LogIn className="size-6" />
          </div>
        </div>

        {/* Form Generic Texts */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Welcome Back!</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form Component */}
        <LoginForm />

        {/* Register / Sign Up Option */}
        <div className="text-center text-sm pt-2 text-muted-foreground border-t border-border/50">
          Don&apos;t have an account?{" "}
          <Link 
            href="/register" 
            className="font-semibold text-primary hover:underline transition-colors"
          >
            Create an account
          </Link>
        </div>

      </div>
    </div>
  );
}