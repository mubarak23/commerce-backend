
export interface LoginWithPhone {
  phoneNumber: string,
  countryIso2: string,
}

export interface LoginWithPhoneOtpVerify {
  phoneNumber: string,
  countryIso2: string,
  otp: string
}
