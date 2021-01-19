import type { Module, Patch } from '@patchcab/core/lib/types';

export type Rack = {
  title: string;
  url?: string;
  modules: Module[];
  patches: Patch[];
};
