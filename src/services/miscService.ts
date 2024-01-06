import { getFreshConnection } from "../db"
import { Findus } from "../entity/FindUs"


export const handleIncreaseCountOption = async (name: string): Promise<boolean> => {
  const connection = await getFreshConnection()
  const findusRepo = connection.getRepository(Findus)

  const findUsOption = await findusRepo.findOne({ name })
  if(!findUsOption) {
    return false
  }
 
  await findusRepo.createQueryBuilder()
    .update(Findus)
    .set({ counts: findUsOption.counts + 1})
    .where({
      id: findUsOption.id
    })
    .execute()
  
  return true
}

export const addUserCreatedfindUsOption = async (name: string): Promise<boolean> => {
  const connection = await getFreshConnection()
  const findusRepo = connection.getRepository(Findus)

  const createNewOption = new Findus().initialize(name);
  await findusRepo.save(createNewOption);
  
  await findusRepo.createQueryBuilder()
    .update(Findus)
    .set({ counts: 1})
    .where({
      id: createNewOption.id
    })
    .execute()
  return true
}

export const handlefindUsProcesses = async (name: string): Promise<boolean> => {
  const connection = await getFreshConnection()
  const findusRepo = connection.getRepository(Findus)

  const isOptionExists = await findusRepo.findOne({ name })
  if(isOptionExists){
    await handleIncreaseCountOption(isOptionExists.name)
    return true
  }
  await addUserCreatedfindUsOption(name)
    
  return true
}
