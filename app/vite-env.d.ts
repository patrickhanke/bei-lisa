/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHCMS_ENDPOINT?: string
  readonly DEV?: boolean
  // add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
