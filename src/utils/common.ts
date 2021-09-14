import { City } from './../models/city';

export const capitalizeString = (value: "male" | "female") => {
    if (value === undefined) {
        return
    }
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export const convertCity = (city: string) => {
    if (city === 'hn') {
        return 'Hà Nội'
    }
    if (city === 'hcm') {
        return 'Hồ Chí Minh'
    }
    if (city === 'dn') {
        return 'Đà Nẵng'
    }
    if (city === 'pt') {
        return 'Phan Thiết'
    }
    if (city === undefined) {
        return 'Vô gia cư'
    } 
}

export const markColor = (mark: number) => {
    if (mark >= 8) {
        return '#1a9148'
    }
    if (mark >= 6) {
        return '#d4ad22'
    }
    else return 'red'
}

export const convertCityTest = (cityList: City[], value: string) => {
    
    let cityName = ''
    // eslint-disable-next-line array-callback-return
    cityList.map(city => {
        if (city.code === value) {
            cityName = city.name
        }
        if (value === undefined) {
            cityName = 'Vô gia cư'
        }
    })
    return cityName
}