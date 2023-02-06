import { ResI } from '../interfaces'
import { fishLogService } from './fishLogService'

export async function UpdateFishLog(
  log_id: string,
  name: string | undefined,
  largeGroup: string | undefined,
  group: string | undefined,
  species: string | undefined,
  latitude: string | undefined,
  longitude: string | undefined,
  photoString: string | undefined | undefined,
  length: string | undefined,
  weight: string | undefined,
  visible: boolean,
  token?: string
) {
  const userToken = `Bearer ${token}`
  let photo = ''

  const coordenates = {
    latitude: latitude ? parseFloat(latitude) : null,
    longitude: longitude ? parseFloat(longitude) : null,
  }
  if (photoString) {
    photo = photoString
  } else {
    photo = null
  }
  const res: ResI = await fishLogService.put(
    `/fishLog/${log_id}`,
    {
      name,
      largeGroup,
      group,
      species,
      coordenates,
      photo,
      length: length ? parseFloat(length) : null,
      weight: weight ? parseFloat(weight) : null,
      visible,
    },
    { headers: { Authorization: userToken } },
  )
  return res.data
}
