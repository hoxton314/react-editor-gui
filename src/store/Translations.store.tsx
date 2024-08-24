import { action, makeAutoObservable } from 'mobx'
import * as translations from '../translations/index'

export type Language = 'en'

interface TranslationsInterface {}

export class TranslationsStore {
  rootStore
  translations: TranslationsInterface = translations.en
  language = 'en'

  constructor(rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  @action.bound setTranslations(language: Language): void {
    this.language = language
    this.translations =
      {
        ...translations.en,
        ...translations[language],
      } ?? translations.en

    console.log(this.translations)
  }
}
