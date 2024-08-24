export interface Services {
  [key: string]: string[]
}

export interface ServicesResolved {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface ConfigurationListItem {
  name: 'Configuration'
  isValidationSuccess?: boolean
}

export interface ConfigurationTableItem extends ConfigurationListItem {
  error: boolean
}

export interface ConfigurationVersion {
  configurationId: string
  configCategory: string
  version: number
  [key: string]: unknown
}

export interface PathResolution {
  unresolvedPath: string
  resolvedValue: {
    [key: string]: string | string[] | number | boolean
  }
}

export interface Configuration {
  current: ConfigurationVersion
  versions: ConfigurationVersion[]
  references: string[]
  referenceMapping: PathResolution[]
}
