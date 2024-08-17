export const enum CARD_SCOPE {
  CREATE = 'card:create',
  UPDATE = 'card:update',
  DELETE = 'card:delete',
  READ_ALL = 'card:read_all',
  READ_MY = 'card:read_my',
}

export const enum MEDIA_SCOPE {
  UPLOAD = 'media:upload',
}

export type ScopeList = `${CARD_SCOPE}` | `${MEDIA_SCOPE}`

export interface Scopes {
  CARD: {
    CREATE: CARD_SCOPE.CREATE
    READ_ALL: CARD_SCOPE.READ_ALL
    READ_MY: CARD_SCOPE.READ_MY
    UPDATE: CARD_SCOPE.UPDATE
    DELETE: CARD_SCOPE.DELETE
  }
  MEDIA: {
    UPLOAD: MEDIA_SCOPE.UPLOAD
  }
}
