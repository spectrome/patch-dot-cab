import type { Module, Patch } from '@patchcab/core/lib/types';

export type Rack = {
  _id?: string;
  title: string;
  url?: string;
  modules: Module[];
  patches: Patch[];
};
