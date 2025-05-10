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
import { type FormEvent, useState } from "react";
import { toast } from "../../../components/ui/sonner";
import { cn } from "../../../lib/utils";
import { useUserStore } from "../../../lib/user-store";
import { useNavigate } from "react-router-dom";

export default function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/");
    } catch (error) {
      toast.error("Registratie mislukt", {
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
          <CardTitle className="text-2xl">Maak een account</CardTitle>
          <CardDescription className="text-balance">
            Voer je e-mailadres en wachtwoord in om een account te maken.
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
                <Label htmlFor="password">Wachtwoord</Label>
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
                Maak een account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Heb je al een account?{" "}
              <a
                href="/login"
                className="underline underline-offset-4"
                tabIndex={4}
              >
                Aanmelden
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
