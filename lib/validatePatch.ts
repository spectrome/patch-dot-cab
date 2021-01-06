import type { LibraryItem, Module, Patch } from '@patchcab/core/lib/types';

type Rack = {
  title: string;
  modules: Module[];
  patches: Patch[];
};

const validatePatch = (rack: Rack, library: LibraryItem[]): boolean => {
  let valid = true;

  const moduleNames = library.map(({ set, name }) => `${set}/${name}`);

  rack.modules.forEach(({ id }) => {
    const moduleName = id.substr(0, id.lastIndexOf('-'));
    if (moduleNames.indexOf(moduleName) < 0) {
      valid = false;
    }
  });

  return true;
};

export default validatePatch;
