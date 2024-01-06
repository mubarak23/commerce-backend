export interface ResetPasswordRequestDto {
  oldPassword: string,
  newPassword: string,
}

export interface ResetForgottenPasswordRequestDto {
  newPassword: string,
}
