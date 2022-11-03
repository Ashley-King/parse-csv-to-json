import ShortUniqueId from 'short-unique-id';

export const  zipsToArray = (data) => {
  data.map((item) => {
    let zip = item.zips.split(' ')
    item.zips = zip
  })
  return data
}

export const oneCityPerZip = (data) => {
  let newData = []
  data.map((item) => {
    item.zips.map((zip) => {
      let newItem = {
        id: new ShortUniqueId().randomUUID(10),
        city: item.city,
        state: item.state_id,
        state_name: item.state_name,
        lat: item.lat,
        lng: item.lng,
        zip: zip
      }
      newData.push(newItem)
    })
  })
  return newData
}