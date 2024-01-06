export default interface NewWareHouseRequestDto {
  name: string,
  state: string,
  country: string,
  contactFullName: string,
  contactPhoneNumber: string,
  isDefault?: boolean | null
}
