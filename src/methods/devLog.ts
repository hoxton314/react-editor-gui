const devStages = ['.dev.', '.dev-02.', '.dev-03.', '.dev-04.', '.dev-05.', 'localhost']

export function isDev() {
  let isDev = false
  devStages.forEach((stage) => window.location.origin.includes(stage) && (isDev = true))

  return isDev
}

export function isLocalDev() {
  return window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
}

export function devLog(...toLog) {
  let shouldLog = false
  devStages.forEach((stage) => window.location.origin.includes(stage) && (shouldLog = true))

  if (shouldLog) {
    console.log(...toLog)
  }
}
