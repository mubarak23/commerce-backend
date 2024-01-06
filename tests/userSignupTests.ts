/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
import 'mocha'
import express from 'express'

// import * as chai from 'chai'
const chai = require("chai")

// @ts-ignore:
import chaiHttp from 'chai-http'
import * as _ from 'underscore'

chai.use(chaiHttp)
const {expect} = chai

import { getRepository, In } from 'typeorm'
import { PhoneVerification } from '../src/entity/PhoneVerification'
import { User } from '../src/entity/User'

export const runUserSignupTests = function(app: express.Application) {
  describe('User Signup', function() {
    const phoneNumber = '07030000001'

    it(`User signup with Nigerian Phone number of non-existing user should succeed`, async function(done) {  
      const userSignupPayload = {
        firstName: 'SteelHeart',
        lastName: 'SteelWill',
        password: 'aaaaa',
        emailAddress: 'thanos@marvel.com',
        phoneNumber,
        countryLongName: "Nigeria",
        isSeller: true,
      }
  
      const userSignupPhoneRes = await chai.request(app)
        .post('/api/onboarding/signup')
        .send(userSignupPayload)
  
      expect(userSignupPhoneRes.body.status).to.be.true
  
      const phoneVerificationRepo = getRepository(PhoneVerification)
      const phoneVerification = await phoneVerificationRepo.findOne({
        phoneNumber,
        isVerified: false
      })

      expect(phoneVerification).to.not.be.null
      expect(phoneVerification!.verificationCode).to.not.be.null
      // --Phone Verification step
      const {verificationCode} = phoneVerification!
  
      const userPhoneVerifyPayload = {
        phoneNumber,
        verificationCode,
      }
  
      const userSignupPhoneVerifyRes = await chai.request(app)
        .post('/api/onboarding/verify')
        .send(userPhoneVerifyPayload)
  
      expect(userSignupPhoneVerifyRes.body.status).to.be.true
      expect(userSignupPhoneVerifyRes.body).to.have.property('data')
      expect(userSignupPhoneVerifyRes.body.data).to.be.an('object')
      expect(userSignupPhoneVerifyRes.body.data).to.have.property('token')
      expect(userSignupPhoneVerifyRes.body.data.token).to.be.a('string')
  
      expect(userSignupPhoneVerifyRes.body.data).to.have.property('refreshToken')
      expect(userSignupPhoneVerifyRes.body.data.refreshToken).to.be.a('string')
  
      const userRepo = getRepository(User)
      const userWithSavedPhone = await userRepo.findOne({
        phoneNumber: phoneNumber.startsWith('0') ? phoneNumber.substring(1) : phoneNumber,
      })
      expect(userWithSavedPhone!.uuid).to.not.be.null
      //--
      const businessInfoPayload = {
        businessName: 'Steel Inc',
        businessAddress: "Backyard",
        cacNumber: "11111111111",
      }
      const accessToken = userSignupPhoneVerifyRes.body.data.token

      const userSignupInfopRes = await chai.request(app)
        .put('/api/onboarding/businessinfo')
        .set('x-access-token', accessToken)
        .send(businessInfoPayload)
  
      expect(userSignupInfopRes.body.status).to.be.true
  
      done()
    })
  
    it(`User LOG-IN with OTP should succeed`, async function(done) {
      const userLoginPayload = {
        phoneNumber,
        countryIso2: 'NG',
      }

      const userLoginByPhoneRes = await chai.request(app)
        .post('/api/access/login/phonenumber')
        .send(userLoginPayload)
      expect(userLoginByPhoneRes.body.status).to.be.true
      expect(userLoginByPhoneRes.body.data.phoneVerificationOtp).to.be.a('string')

      const userLoginPhoneVerifyPayload = {
        phoneNumber,
        countryIso2: 'NG',
        otp: userLoginByPhoneRes.body.data.phoneVerificationOtp,
      }
  
      const userLoginPhoneVerifyRes = await chai.request(app)
        .post('/api/access/login/phonenumber/verify/otp')
        .send(userLoginPhoneVerifyPayload)
  
      expect(userLoginPhoneVerifyRes.body.status).to.be.true
      expect(userLoginPhoneVerifyRes.body).to.have.property('data')
      expect(userLoginPhoneVerifyRes.body.data).to.be.an('object')
      expect(userLoginPhoneVerifyRes.body.data).to.have.property('token')
      expect(userLoginPhoneVerifyRes.body.data.token).to.be.a('string')
      expect(userLoginPhoneVerifyRes.body.data.token).to.not.be.null
  
      expect(userLoginPhoneVerifyRes.body.data).to.have.property('refreshToken')
      expect(userLoginPhoneVerifyRes.body.data.refreshToken).to.be.a('string')
      expect(userLoginPhoneVerifyRes.body.data.refreshToken).to.not.be.null

      done()
    })
  
    it(`User LOG-IN with password should succeed`, async function(done) {
      const userLoginPayload = {
        phoneNumber,
        password: 'aaaaa',
      }

      const userLoginWithPasswordRes = await chai.request(app)
        .post('/api/access/login/password')
        .send(userLoginPayload)
  
      expect(userLoginWithPasswordRes.body.status).to.be.true
      expect(userLoginWithPasswordRes.body).to.have.property('data')
      expect(userLoginWithPasswordRes.body.data).to.be.an('object')
      expect(userLoginWithPasswordRes.body.data).to.have.property('token')
      expect(userLoginWithPasswordRes.body.data.token).to.be.a('string')
      expect(userLoginWithPasswordRes.body.data.token).to.not.be.null
  
      expect(userLoginWithPasswordRes.body.data).to.have.property('refreshToken')
      expect(userLoginWithPasswordRes.body.data.refreshToken).to.be.a('string')
      expect(userLoginWithPasswordRes.body.data.refreshToken).to.not.be.null

      done()
    })
  })
}
