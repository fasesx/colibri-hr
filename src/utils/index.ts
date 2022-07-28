function getAge(dateString: string) {
  const dateStringArr = dateString.split('/')
  const dateStringP = `${dateStringArr[2]}-${dateStringArr[1]}-${dateStringArr[0]}`
  const today = new Date()
  const birthDate = new Date(dateStringP)
  let age = today.getFullYear() - birthDate.getFullYear()
  const month = today.getMonth() - birthDate.getMonth()
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

function average<T>(arr: T[], groupBy: keyof T, averageField: keyof T) {
  console.log('called average')
  const sums = new Map<T[keyof T],number>()
  const counts = new Map<T[keyof T],number>()
  let groupByValue: T[keyof T]
  for (let i = 0; i < arr.length; i++) {
    if(!arr[i][groupBy] || !arr[i][averageField]) continue
    
    groupByValue = arr[i][groupBy]
    if (!(sums.has(groupByValue))) {
      sums.set(groupByValue, 0)
      counts.set(groupByValue, 0)
    }
    
    if (isNaN(Number(arr[i][averageField])) && typeof arr[i][averageField] === 'string') {
      console.log(getAge(`${arr[i][averageField]}`))
      sums.set(groupByValue, sums.get(groupByValue) || 0 + getAge(`${arr[i][averageField]}`))
    } else {
      sums.set(groupByValue, sums.get(groupByValue) || 0 + (Number(arr[i][averageField]) || 0))
    }
    counts.set(groupByValue, counts.get(groupByValue) || 0 + 1)
  }

  const labels: T[keyof T][] = []
  const data: number[] = []
  for(const groupByValue of sums.keys()) {
    labels.push(groupByValue)
    data.push((sums.get(groupByValue) || 0) / (counts.get(groupByValue) || 0))
  }

  return {labels, datasets: [{data}]}
}

export {
  average
}