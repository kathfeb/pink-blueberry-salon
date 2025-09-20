declare module "redux-persist/lib/storage" {
  const storage: any;
  export default storage;
}

declare module "redux-persist" {
  export function persistStore(store: any, config?: any, callback?: any): any;
  export function persistReducer(config: any, reducer: any): any;

  export const FLUSH: string;
  export const REHYDRATE: string;
  export const PAUSE: string;
  export const PERSIST: string;
  export const PURGE: string;
  export const REGISTER: string;
}

declare module "redux-persist/integration/react" {
  import { ComponentType, ReactNode } from "react";

  export interface PersistGateProps {
    loading?: ReactNode;
    persistor: any;
    children: ReactNode;
  }

  export const PersistGate: ComponentType<PersistGateProps>;
}
