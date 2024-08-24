export interface SelectItem {
  value: string
  label: string
}

export type SelectList = SelectItem[]

export type LifecycleState = 'init' | 'fetching' | 'fetched' | 'error'

export type Timeout = ReturnType<typeof setTimeout>
