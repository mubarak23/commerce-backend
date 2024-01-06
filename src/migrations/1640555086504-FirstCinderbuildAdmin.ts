import PhoneNumber from 'awesome-phonenumber'

import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Account } from '../entity/Account';
import { User } from "../entity/User";
import { AccountType } from '../enums/AccountType';

const firstSuperAdminPhoneNumber = '0000000000'


export default class FirstCinderbuildAdmin1640555086504 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const countryLongName = 'Nigeria'
    const countryIso2Code = 'NG'

    const msisdn = new PhoneNumber(firstSuperAdminPhoneNumber, countryIso2Code).getNumber()
    const passwordHash = '$2b$10$2vraFno0Yw7TdGBdb5a4/ePz/fQjNVA4Q585q4wXOZG1vDLD5E60O'

    const user: User = new User().initializeAdmin('Cinderbuild', 'Admin',
      firstSuperAdminPhoneNumber, msisdn, passwordHash, countryIso2Code, countryLongName)    
    user.isEnabled = true

    const userRepoT = getRepository(User)  
    const firstUser = await userRepoT.save(user)
    const account = new Account().initialize(firstUser.id, AccountType.CUSTOMER_ACCOUNT)
    const accountRepo = getRepository(Account)
    await accountRepo.save(account)

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepo = getRepository(User)
    await userRepo.delete({phoneNumber: firstSuperAdminPhoneNumber})
  }
}
