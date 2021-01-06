import type { Module, Patch } from '@patchcab/core/lib/types';
import library from '../public/modules.json';

const moduleNames = library.map(({ set, name }) => `${set}/${name}`);

type Rack = {
  title: string;
  modules: Module[];
  patches: Patch[];
};

const validatePatch = (rack: Rack): boolean => {
  let valid = true;

  rack.modules.forEach(({ id }) => {
    const moduleName = id.substr(0, id.lastIndexOf('-'));
    if (moduleNames.indexOf(moduleName) < 0) {
      valid = false;
    }
  });

  return true;
};

export default validatePatch;
