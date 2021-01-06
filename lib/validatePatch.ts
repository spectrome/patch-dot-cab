import type { Module, Patch } from '@patchcab/core/lib/types';
import { readFileSync } from 'fs';
import { join } from 'path';

type Rack = {
  title: string;
  modules: Module[];
  patches: Patch[];
};

const validatePatch = (rack: Rack): boolean => {
  let valid = true;

  const library = JSON.parse(readFileSync(join(__dirname, '../modules.json'), 'utf8'));
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
