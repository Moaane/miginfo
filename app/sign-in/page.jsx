"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(50, "Maximum length of username is 50 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Minimum password length is 8 characters"),
});

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result.ok) {
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        const errorMessage = new URLSearchParams(result.error).get("error");
        toast.error(
          errorMessage ||
            "Login failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      toast.error("Unexpected error during login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username and password to login to your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                {...form.register("username")}
              />
              {form.formState.errors.username && (
                <p className="text-red-500">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {loading ? (
              <Button className="w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full" type="submit">
                Sign in
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
