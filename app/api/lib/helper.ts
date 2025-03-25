import { ObjectData } from '@/types';

export const isObject = (obj: ObjectData = {}): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

export const isEmpty = (
  value: ObjectData | ObjectData[] | boolean | string | number | null | undefined
) => {
  if (!value) return true;
  if (value === undefined || value === null || value === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (isObject(value as ObjectData) && Object.keys(value as ObjectData).length === 0) return true;
  return false;
};

export const exclude = <T extends ObjectData, Key extends keyof T>(
  obj: T,
  keys: Key[]
): Omit<T, Key> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as Key))
  ) as Omit<T, Key>;
};
