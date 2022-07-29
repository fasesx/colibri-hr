/* eslint-disable @typescript-eslint/no-non-null-assertion */
function findIndex (arr: Array<number>, val: number) {
  let low = 0
  let high = arr.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] > val) {
      low = mid + 1;
    }else {
      high = mid
    }
  }
  return low;
}

function insertSorted(arr: Array<number> = [], num: number) {
  const position = findIndex(arr, num);
  arr.splice(position, 0, num)
  return position
}

function average<T>(arr: T[], groupBy: keyof T, averageField: keyof T, callbackFn?: (fv: T[keyof T]) => number) {
  const sums = new Map<T[keyof T],number>()
  const counts = new Map<T[keyof T],number>()
  let groupByValue: T[keyof T]
  let averageFieldValue: number
  for (let i = 0; i < arr.length; i++) {
    if(!arr[i][groupBy] || typeof arr[i][averageField] === 'undefined') continue
    if (typeof arr[i][averageField] !== 'number' && typeof callbackFn === 'undefined') continue
    
    groupByValue = arr[i][groupBy]
    averageFieldValue = typeof arr[i][averageField] !== 'number' ? callbackFn!(arr[i][averageField]) : Number(arr[i][averageField])
    if (!(sums.has(groupByValue))) {
      sums.set(groupByValue, 0)
      counts.set(groupByValue, 0)
    }

    sums.set(groupByValue, sums.get(groupByValue) || 0 + (averageFieldValue || 0))
    counts.set(groupByValue, counts.get(groupByValue) || 0 + 1)
  }

  const labels: T[keyof T][] = []
  const data: number[] = []
  for(const groupByValue of sums.keys()) {
    const position = insertSorted(data, sums.get(groupByValue)! / counts.get(groupByValue)!)
    labels.splice(position, 0, groupByValue)
  }

  return {labels, datasets: [{data}]}
}

export {
  average
}