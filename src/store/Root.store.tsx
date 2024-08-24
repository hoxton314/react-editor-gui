import { AppStateStore } from './AppState.store'
import { CommunicationStateStore } from './Communication.store'
import { TranslationsStore } from './Translations.store'
import { UserInterfaceStore } from './UserInterface.store'
import { CodeViewStore } from './CodeView.store'
import { ThemeStore } from './Theme.store'
import { ModalStore } from './Modal.store'

export class RootStore {
  AppState: AppStateStore
  ThemeState: ThemeStore
  TranslationsState: TranslationsStore
  CommunicationState: CommunicationStateStore
  UserInterfaceState: UserInterfaceStore
  CodeViewState: CodeViewStore
  ModalState: ModalStore

  constructor() {
    this.AppState = new AppStateStore(this)
    this.ThemeState = new ThemeStore(this)
    this.TranslationsState = new TranslationsStore(this)
    this.CommunicationState = new CommunicationStateStore(this)
    this.UserInterfaceState = new UserInterfaceStore(this)
    this.CodeViewState = new CodeViewStore(this)
    this.ModalState = new ModalStore(this)
  }
}

export const rootStore = new RootStore()
