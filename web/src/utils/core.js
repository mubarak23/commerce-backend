import * as _ from 'underscore'


export const SportIdToName = {
  '16': 'Baseball',
  '18': 'Basketball',
  '1': 'Soccer',
  '13': 'Tennis',

  '78': 'Handball',
  '91': 'Volleyball',
  '17': 'Ice Hockey',
  '92': 'Table Tennis'
}

export const LocalStorageKeys = {
  sportLeagueFetchTimes: 'sportLeagueFetchTimes',
  leagueEventsFetchTimes: 'leagueEventsFetchTimes',
  cachedSportLeagues: 'cachedSportLeagues',
  cachedLeagueEvents: 'cachedLeagueEvents',
  profile: 'profile',
  token: 'token'
}

export const TopLeagues = {
  '1': {
    'England Premier League': true,
    'Spain Primera Liga': true,
    'Germany Bundesliga I': true,
    'France Ligue 1': true,
    'Italy Serie A': true,
    'Netherlands Eredivisie': true,
    'Brazil Serie A': true,
  },
}


Date.prototype.toIsoString = function() {
  var tzo = -this.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
          var norm = Math.floor(Math.abs(num));
          return (norm < 10 ? '0' : '') + norm;
      };
  return this.getFullYear() +
      '-' + pad(this.getMonth() + 1) +
      '-' + pad(this.getDate()) +
      'T' + pad(this.getHours()) +
      ':' + pad(this.getMinutes()) +
      ':' + pad(this.getSeconds()) +
      dif + pad(tzo / 60) +
      ':' + pad(tzo % 60);
}


export function firstWord(value, def) {
  if(!value)
    return value;

  value = value.split(' ')
  return value[0]
}

export function limitTo(word, maxLength) {
  if(word.length > maxLength) word = word.substring(0, maxLength)
  return word
}

export function humanize(str) {
  var i, frags = str.split('_');
  for (i=0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}


export const betOptionHeaderInterpretation = (json, sportEvent) => {
  const obj = JSON.parse(json)
  
  let completeHeader = obj.name

  if(obj.header) {
    completeHeader += ` (${obj.header})`
  }

  if(obj.header && (obj.header === obj.name)) {
    return obj.name
  }

  return completeHeader
}

export const betOptionNameInterpretation = (json) => {
  const obj = JSON.parse(json)
  return obj.name
}

export const floorTopBetSlipOdds = (odds) => {
  if(Number(odds) > 10) {
    return 10
  } else {
    return Math.floor(Number(odds))
  }
}

export const calculateAccumulatedOdds = (betSlipCart) => {
  const totalOdds = betSlipCart.reduce(
    (acc, cartItem) => acc * cartItem.odds, 1
  )

  return totalOdds.toFixed(2)
}

export const normalizeExplicitOddsRange = (oddsValue) => {
  if(oddsValue === "2<=x<3") {
    return "2"
  } else if(oddsValue === "3<=x<4") {
    return "3"
  } else if(oddsValue === "4<=x<5") {
    return "4"
  } else if(oddsValue === "5<=x<6") {
    return "5"
  } else if(oddsValue === "6<x<7") {
    return "6"
  } else if(oddsValue === "7<=x<8") {
    return "7"
  } else if(oddsValue === "8<=x<9") {
    return "8"
  } else if(oddsValue === "9<=x<10") {
    return "9"
  } else if(oddsValue === "x>=10") {
    return '10+'
  }
}

export const nFormatter = (num, digits) => {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export const datesAreOnSameDay = (first8601, second8601) => {
  const first = new Date(first8601)
  const second = new Date(second8601)

  return first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate()
}

export const formatDateTime = (dateTime) => {
  return `${formatDateTimeToDay(dateTime)} ${formatDateTimeToTime(dateTime)}`
}

export const formatDateTimeToDay = (dateTime) => {
  return new Date(dateTime).toLocaleDateString("sv")
  // const localeTimezone = window.Intl.DateTimeFormat().resolvedOptions().timeZone
  // console.log(`localeTimezone: `, localeTimezone)

  // return new Date(dateTime).toLocaleDateString("sv", {timeZone: localeTimezone})
}

export const formatDateTimeToTime = (dateTime) => {
  // return new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const localeTimezone = window.Intl.DateTimeFormat().resolvedOptions().timeZone

  return new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }, { timeZone: localeTimezone })
}


export const getDayHourCombo = (dateTime) => {
  const hour = new Date(dateTime).toLocaleTimeString([], { hour: '2-digit' })
  return `${formatDateTimeToDay(dateTime)} ${hour}`
}


export const isHistoryGroundZero = (selectedBetSlipDetails) => {
  let result = true;
  if(selectedBetSlipDetails && selectedBetSlipDetails.successRate) {
    for(const rate of selectedBetSlipDetails.successRate) {
      if(rate.totalBetSlipsNumber !== '0') {
        result = false
        break;
      }
    }  
  }
  return result
}

export const isWinsGroundZero = (selectedBetSlipDetails) => {
  let result = true;
  if(selectedBetSlipDetails && selectedBetSlipDetails.successRate) {
    for(const rate of selectedBetSlipDetails.successRate) {
      if(rate.winsNumber !== '0') {
        result = false
        break;
      }
    }  
  }
  return result
}


export const sortLeaguesInBetSlipStudio = (selectedSportLeagues) => {
  selectedSportLeagues = selectedSportLeagues || []

  let higherTierLeagues = []
  selectedSportLeagues.forEach(league => {
    if(league.leagueRanking !== -1) {
      higherTierLeagues.push(league)
    }
  })

  const leaguesGroupedByRank = _.groupBy(selectedSportLeagues, 'leagueRanking')
  const lowerTierLeagues = leaguesGroupedByRank[-1]

  higherTierLeagues.sort((a, b) => {
    if (a.leagueRanking === b.leagueRanking) {
      return a.leagueName.localeCompare(b.leagueName, 'en', {'sensitivity': 'base'})
    }
    return a.leagueRanking > b.leagueRanking ? 1 : -1;
  })

  const sortedLowerTierLeagues = _.sortBy(lowerTierLeagues, 'leagueName')
  const sortedLeagues = higherTierLeagues.concat(sortedLowerTierLeagues)

  return _.toArray(sortedLeagues)
}

export function padArray(array, length, fill) {
  return length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array;
}


export const handleAxiosRequestError = (error, isSilent) => {
  if (error.response) {
    /*
    * The request was made and the server responded with a
    * status code that falls out of the range of 2xx
    */
    if(!isSilent) {
      window.alert(error.response.data.error)
    }
    return error.response.data.error
  } else if (error.request) {
    /*
    * The request was made but no response was received, `error.request`
    * is an instance of XMLHttpRequest in the browser and an instance
    * of http.ClientRequest in Node.js
    */
    const errorMessage = 'The server seems down at the moment. Please try again later.'
    if(!isSilent) {
    window.alert(errorMessage)
    }
    return errorMessage
  } else {
    // Something happened in setting up the request and triggered an Error
    if(!isSilent) {
      window.alert(error.message)
    }
    return error.message
  }
}
