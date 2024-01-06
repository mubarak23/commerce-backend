import ConfigProperties from "../enums/ConfigProperties"

const configProperties: any[] = [
  {id: 1, name: ConfigProperties.ESCROW_CHARGE_PERCENTAGE, value: '0.005', description: 'The number multiplied by the quote total price to arrive at escrow charge amount'},
  {id: 2, name: ConfigProperties.SEND_REAL_SMS, value: 'false', description: 'Send sms through third party provider in dev environment'},
  {id: 3, name: ConfigProperties.CINDERBUILD_REVENUE_PERCENTAGE, value: '0.05', description: 'The number multiplied by the seller price to compute the price the buyer will see.'},
  {id: 4, name: ConfigProperties.COOPERATE_ACCOUNT_DISCOUNT, value: 'false', description: 'The number add N200,000 to a delivery wallet fee (secondary wallet)'},
  {id: 4, name: ConfigProperties.VAT, value: '5', description: 'Value added tax'},
]

export default configProperties
