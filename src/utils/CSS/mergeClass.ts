import type{ CreateCSSProperties } from '@mui/styles';

/**
 * T: The type of the base style object.
 */
export default function mergeClasses<T extends Record<string, any>>(
  baseStyles: T,
  customClasses?: Partial<{ [K in keyof T]: CreateCSSProperties<{}> }>
): T {
  // We use the spread to create a new object of type T
  const merged = { ...baseStyles };

  if (customClasses) {
    for (const key in customClasses) {
      // Logic to merge only if key exists in base
      if (Object.prototype.hasOwnProperty.call(baseStyles, key)) {
        merged[key] = {
          ...baseStyles[key],
          ...(customClasses as any)[key],
        };
      }
    }
  }
  console.log(merged);
  return merged; // Now returns T instead of any
}


function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}

function deepMerge<T extends Record<string, any>, U extends Record<string, any>>(
  a: T,
  b: U
): T & U {
  const result = { ...a } as Record<string, any>;

  for (const key of Object.keys(b)) {
    const aValue = result[key];
    const bValue = b[key];

    if (isPlainObject(aValue) && isPlainObject(bValue)) {
      result[key] = deepMerge(aValue, bValue);
    } else {
      result[key] = bValue;
    }
  }
  console.log(a,b,result);
  return result as T & U;
}

export{deepMerge}