import {v4 as uuid} from 'uuid';


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
        id: uuid(),
        city: item.city,
        state_id: item.state_id,
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

export const cityAltArray = (data) => {
  let newData = []
  data.map(item => {
    if(item.city_alt.length > 0){
      let alt = {
        id: uuid(),
        city: item.city_alt,
        state_id: item.state_id,
        state_name: item.state_name,
        lat: item.lat,
        lng: item.lng,
        zips: item.zips
      }
      newData.push(alt)
    }
  })
  return newData
}