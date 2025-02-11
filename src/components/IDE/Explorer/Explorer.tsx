import { ExplorerContextProvider } from './ExplorerContextProvider';
import { RootFolder } from './RootFolder';

export function Explorer() {
  return (
    <ExplorerContextProvider>
      <RootFolder />
    </ExplorerContextProvider>
  );
}
