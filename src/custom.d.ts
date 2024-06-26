declare module 'redux-persist/es/persistReducer' {
  import { PersistReducer } from 'redux-persist/es/types';
  export default PersistReducer;
}

declare module 'redux-persist/lib/storage' {
  const storage: any;
  export default storage;
}

declare module 'redux-persist/es/persistStore' {
  import { PersistStore } from 'redux-persist/es/types';
  export default PersistStore;
}

declare module 'redux-persist/integration/react' {
  import { ReactNode } from 'react';
  import { Persistor } from 'redux-persist/es/types';

  interface PersistGateProps {
      persistor: Persistor;
      children?: ReactNode;
      loading?: ReactNode | null;
      onBeforeLift?: () => void | Promise<void>;
  }

  export class PersistGate extends React.Component<PersistGateProps> {}
}