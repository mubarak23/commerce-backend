// AddInvestorToProjectRequestDto

export interface AddInvestorToProjectRequestDto {
  firstName:string,
  lastName: string,
  phoneNumber: string,
  emailAddress: string,
  numberOfSlots: number,
  projectUuid: string,
  amountPaid: number,
  durationLeft: number,
  susbscriptionDate: Date, 
}