import { useUserStore } from "@core/lib/user-store";
import type { UserWithoutPassword } from "@core/data/users";

export function useUser(): UserWithoutPassword | null {
  return useUserStore(x => x.user);
}

export function useActiveTeam() {
  return useUserStore(x => x.activeTeam);
}

export function useTeams() {
  return useUserStore(x => x.teams);
}