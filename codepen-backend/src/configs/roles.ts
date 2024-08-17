import { Role } from '../types'
import { Scopes } from './scopes'

/**
 * TODO: use database to store roles
 * as of now we are using this file to store roles
 * in future updates we will use database to store roles
 * and role helper will be removed and role will be populated from database
 */
export const ROLES: Role[] = [
  {
    id: 1,
    label: 'User',
    scopes: [
      // card
      Scopes.CARD.READ_MY,
      Scopes.CARD.CREATE,
      Scopes.CARD.UPDATE,
      Scopes.CARD.DELETE,

      // media
      Scopes.MEDIA.UPLOAD,
    ],
  },
  {
    id: 2,
    label: 'Admin',
    scopes: [
      // card
      Scopes.CARD.READ_ALL,
      Scopes.CARD.READ_MY,
      Scopes.CARD.CREATE,
      Scopes.CARD.UPDATE,
      Scopes.CARD.DELETE,

      // media
      Scopes.MEDIA.UPLOAD,
    ],
  },
]
