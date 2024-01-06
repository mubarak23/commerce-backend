import { Logger } from "tslog";

const log: Logger = new Logger({
  name: "CinderBuild", 
  maskValuesOfKeys: ['password', 'token', 'x-access-token']
})

export default log
