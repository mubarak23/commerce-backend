
import PhoneNumber from "awesome-phonenumber";
import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { ADMIN_USER_1, ADMIN_USER_2 } from '../constants';
import { Account } from "../entity/Account";
import { User } from "../entity/User";
import { AccountType } from "../enums/AccountType";
import * as Utils from "../utils/core";

const cinderbuildAdminUser1 = '0110011001';
const cinderbuildAdminUser2 = '1001100110'

export class CinderbuildAdminUsers1687169321849 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        const countryLongName = 'Nigeria'
        const countryIso2Code = 'NG'
        
       
        const msisdn1 = new PhoneNumber(cinderbuildAdminUser1, countryIso2Code).getNumber()
        const passwordUser1Hash = await Utils.generatePasswordHash(ADMIN_USER_1);
        const userRepoT = getRepository(User) 
        const accountRepo = getRepository(Account)

        // User Admin 1
        const user1: User = new User().initializeAdmin('Operation', 'Admin',
        cinderbuildAdminUser1, msisdn1, passwordUser1Hash, countryIso2Code, countryLongName)    
        user1.isEnabled = true;
        user1.isAdmin = true;
        user1.adminCanEdit = false;
        user1.adminCanView = true;
    
         
        const adminUser1 = await userRepoT.save(user1)
        const account = new Account().initialize(adminUser1.id, AccountType.CUSTOMER_ACCOUNT)
        await accountRepo.save(account)

        // User Admin 2
        const msisdn2 = new PhoneNumber(cinderbuildAdminUser1, countryIso2Code).getNumber()
        const passwordUser2Hash = await Utils.generatePasswordHash(ADMIN_USER_2);
        
        const user2: User = new User().initializeAdmin('Product', 'Admin',
        cinderbuildAdminUser2, msisdn2, passwordUser2Hash, countryIso2Code, countryLongName)    
        user1.isEnabled = true;
        user1.isAdmin = true;
        user1.adminCanEdit = true;
        user1.adminCanView = true;
    
      
        const adminUser2 = await userRepoT.save(user2)
        const account2 = new Account().initialize(adminUser2.id, AccountType.CUSTOMER_ACCOUNT)
        
        await accountRepo.save(account2)
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const userRepo = getRepository(User)
        await userRepo.delete({phoneNumber: cinderbuildAdminUser1})
        await userRepo.delete({phoneNumber: cinderbuildAdminUser2})
    }

}
