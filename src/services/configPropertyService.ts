import { getFreshConnection } from "../db"
import { ConfigProperty } from "../entity/ConfigProperty"
import ConfigProperties from "../enums/ConfigProperties"
import { NotFoundError } from "../utils/error-response-types"


export const getConfigProperty = async (configPropertyName: string): Promise<string | number | boolean> => {
  const connection = await getFreshConnection()

  const configPropertyRepo = connection.getRepository(ConfigProperty)
  const configProperty = await configPropertyRepo.findOne({
    name: configPropertyName
  })
  if (!configProperty) {
    throw new NotFoundError(`There are was an internal server error.`)
  }
  if(configPropertyName === ConfigProperties.ESCROW_CHARGE_PERCENTAGE) {
    return Number(configProperty.value)
  }
  if(configPropertyName === ConfigProperties.SEND_REAL_SMS) {
    return configProperty ? configProperty.value === 'true' : false
  }
  if(configPropertyName === ConfigProperties.CINDERBUILD_REVENUE_PERCENTAGE) {
    return Number(configProperty.value)
  }
  if(configPropertyName === ConfigProperties.ORDER_PAYMENT_DEFAULT_DAILY_CHARGE_PERCENTAGE){
    return Number(configProperty.value)
  }
  if(configPropertyName === ConfigProperties.C_STORE_DEFAULT_PAYMENT_CHARGE_PERCENTAGE){
    return Number(configProperty.value)
  } 

  return configProperty.value
}
