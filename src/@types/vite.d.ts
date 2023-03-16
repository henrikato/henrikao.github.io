/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROFILE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
