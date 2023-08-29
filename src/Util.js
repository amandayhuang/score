export const formatMtaData = (data) =>{
    console.log(data)
    const stations = Object.keys(data.stations)
    const formatted = []
    const stationNames = []
    stations.forEach((station) =>{
        const arrivals = data.stations[station]
        arrivals.trains.forEach((arrival) => {
            arrival.stationName = arrivals.name
            arrival.direction = station[station.length-1]
            formatted.push(arrival)
            if(!stationNames.includes(arrival.stationName)){
                stationNames.push(arrivals.name)
            }
        })
    })
    const sorted = formatted.sort((a,b) => a.rawEta < b.rawEta ? -1 : 1)
    return [sorted, stationNames.sort()]
}