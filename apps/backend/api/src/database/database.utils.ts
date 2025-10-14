import { ValueTransformer } from 'typeorm';

export const EmptyStringToNull: ValueTransformer = {
  to: (value: unknown) => (value === '' ? null : value),
  from: (value: unknown) => value,
};
