// const detto = new Date('December 17, 1995 12:04:00')
// console.log(detto)

export default function time24to12(dfDt) {
  const leadingZeros = (num) => {
    return num <= 9 ? "0"+num : num;
  }

  let hr = dfDt.getHours();
  let mn = dfDt.getMinutes();
  let ampm = "am";
  // console.log(leadingZeros(hr), leadingZeros(mn))
  if (hr >= 12 && hr <= 23) {ampm = "pm";}
  if (hr > 12) {
    hr = hr-12;
  }
  // console.log(leadingZeros(hr), leadingZeros(mn), ampm)
  return [leadingZeros(hr), leadingZeros(mn), ampm]

}

// time24to12(detto)