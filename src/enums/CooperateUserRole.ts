export enum CooperateUserRole {
  ACCOUNT_LEVEL = 'ACCOUNT_LEVEL',
  WARE_HOUSE_LEVEL = 'WARE_HOUSE_LEVEL'
}

export const displayCorporateUserRole = (role: CooperateUserRole) => {
  if(role === CooperateUserRole.ACCOUNT_LEVEL) {
    return 'Account Level'
  }
  if(role === CooperateUserRole.WARE_HOUSE_LEVEL) {
    return 'Ware House Level'
  }
  return ''
}
