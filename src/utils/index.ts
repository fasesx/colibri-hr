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

function average<T>(
  arr: T[], groupBy: keyof T,
  averageField: keyof T,
  callbackFn?: (fv: T[keyof T], gb: T[keyof T]) => {averageFieldValue?: number; groupByValue?: T[keyof T]})
{
  const sums = new Map<T[keyof T],number>()
  const counts = new Map<T[keyof T],number>()
  let groupByValue: T[keyof T] | undefined
  let averageFieldValue: number | undefined
  let gb: T[keyof T]
  let fv: number
  for (let i = 0; i < arr.length; i++) {
    if(!arr[i][groupBy] || typeof arr[i][averageField] === 'undefined') continue
    if (typeof arr[i][averageField] !== 'number' && typeof callbackFn === 'undefined') continue
    
    if (typeof callbackFn !== 'undefined') {
      ({groupByValue, averageFieldValue} = callbackFn!(arr[i][averageField], arr[i][groupBy]))
    }
    gb = typeof groupByValue !== 'undefined' ? groupByValue : arr[i][groupBy]
    fv = typeof averageFieldValue !== 'undefined' ? averageFieldValue : Number(arr[i][averageField])

    if (!(sums.has(gb))) {
      sums.set(gb, 0)
      counts.set(gb, 0)
    }

    sums.set(gb, sums.get(gb)! + fv)
    counts.set(gb, counts.get(gb)! + 1)
  }

  const labels: T[keyof T][] = []
  const data: number[] = []
  for(const gb of sums.keys()) {
    const position = insertSorted(data, sums.get(gb)! / counts.get(gb)!)
    labels.splice(position, 0, gb)
  }

  return {labels, datasets: [{data}]}
}

export {
  average
}