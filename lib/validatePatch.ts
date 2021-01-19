import type { Rack } from './types';

const validatePatch = (rack: Rack): boolean => {
  let valid = true;

  if (!rack.title) {
    console.log(rack);
    return false;
  }

  rack.modules.forEach((module) => {
    if (
      !module.id ||
      typeof module.position.x !== 'number' ||
      typeof module.position.y !== 'number'
    ) {
      console.log('2.');
      valid = false;
    }
  });

  rack.patches.forEach((patch) => {
    if (
      !rack.modules.find(
        (module) =>
          patch.input.indexOf(`${module.id}://`) === 0 ||
          patch.output.indexOf(`${module.id}://`) === 0
      )
    ) {
      console.log('3.');
      valid = false;
    }
  });

  return valid;
};

export default validatePatch;
