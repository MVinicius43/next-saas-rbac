import { defineAbilityFor, userSchema } from '@saas/auth'

import type { Role } from '@/generated/prisma/enums'

export function getUserPermissions(userId: string, role: Role) {
  const authUser = userSchema.parse({
    id: userId,
    role,
  })

  const ability = defineAbilityFor(authUser)

  return ability
}
