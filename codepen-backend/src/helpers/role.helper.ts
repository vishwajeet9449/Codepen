import { ROLES } from '../configs/roles'
import { Role } from '../types'

export const getRole = (id: number): Role | undefined => {
  return ROLES.find((role) => role.id === id)
}
