import { action, makeAutoObservable } from 'mobx'

const DEV_MODE = process.env.DEV_MODE === 'true'

export class AppStateStore {
  DEV_MODE = DEV_MODE || false
  rootStore
  experimentalFeatures = false

  constructor(rootStore) {
    makeAutoObservable(this)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.rootStore = rootStore
    this.restoreExperimentalFeatures()
  }

  @action.bound restoreExperimentalFeatures() {
    this.experimentalFeatures = localStorage.getItem('experimentalFeatures') === 'true'
  }

  @action.bound toggleExperimentalFeatures() {
    localStorage.setItem('experimentalFeatures', (!this.experimentalFeatures).toString())
    this.experimentalFeatures = !this.experimentalFeatures
  }
}
