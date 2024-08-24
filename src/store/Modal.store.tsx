import { action, computed, makeAutoObservable } from 'mobx'

export type ModalName = 'add-user' | 'add-group' | 'add-permission' | 'add-configuration' | 'confirmation'

export type ConfirmationModal = {
  operation: 'delete' | 'update' | 'create' | undefined | ''
  highlightedText?: string
  onConfirm: () => void
}

export class ModalStore {
  rootStore

  openedModals = []

  confirmationModal: ConfirmationModal = {
    operation: '',
    highlightedText: '',
    onConfirm: () => {},
  }

  get isAnyModalOpen() {
    return this.openedModals.length > 0
  }

  constructor(rootStore) {
    makeAutoObservable(this, {
      isAnyModalOpen: computed,
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.rootStore = rootStore
  }

  @action.bound closeModal(modalName: ModalName) {
    this.openedModals = this.openedModals.filter((modal) => modal !== modalName)
  }

  @action.bound closeAllModals() {
    this.openedModals = []
  }

  @action.bound setOpenedModalsList(modals: ModalName[]) {
    this.openedModals = modals
  }

  @action.bound openModal(modalName: ModalName) {
    this.openedModals.push(modalName)
  }

  @action.bound setConfirmationModalData(data: ConfirmationModal) {
    this.confirmationModal = data
  }
}
