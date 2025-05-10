import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { PasswordInput } from "../../../components/form/password-input";
import { toast } from "../../../components/ui/sonner";
import { type FormEvent, useState } from "react";
import { cn } from "../../../lib/utils";
import { useUserStore } from "../../../lib/user-store";
import { useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      toast.error("Aanmelden mislukt", {
        description: error instanceof Error ? error.message : "Er is een onverwachte fout opgetreden",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <img
            src="/logo.svg"
            alt="Vandijck Agrarisch Centrum"
            width={100}
            height={100}
            className="mb-6"
          />
          <CardTitle className="text-2xl">Meld je aan</CardTitle>
          <CardDescription className="text-balance">
            Voer je e-mailadres en wachtwoord in om je aan te melden.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mailadres</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="E-mailadres"
                  required
                  tabIndex={1}
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Wachtwoord</Label>
                  {/* <a
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    tabIndex={5}
                  >
                    Wachtwoord vergeten?
                  </a> */}
                </div>
                <PasswordInput
                  name="password"
                  placeholder="Wachtwoord"
                  required
                  tabIndex={2}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" tabIndex={3}>
                Aanmelden
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Heb je nog geen account?{" "}
              <a
                href="/signup"
                className="underline underline-offset-4"
                tabIndex={4}
              >
                Maak er een aan.
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
