import {
  CARD_SCOPE,
  MEDIA_SCOPE,
  Scopes as ScopesType,
} from '../types/scopes.types'

export const Scopes: ScopesType = {
  CARD: {
    CREATE: CARD_SCOPE.CREATE,
    READ_ALL: CARD_SCOPE.READ_ALL,
    READ_MY: CARD_SCOPE.READ_MY,
    UPDATE: CARD_SCOPE.UPDATE,
    DELETE: CARD_SCOPE.DELETE,
  },
  MEDIA: {
    UPLOAD: MEDIA_SCOPE.UPLOAD,
  },
}
