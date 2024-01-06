import Joi from 'joi'
import DisputTypes from '../enums/DisputeTypes'

export interface OrderDisputeRequestDto {
  disputeType: DisputTypes,
  disputeText: string,
}
