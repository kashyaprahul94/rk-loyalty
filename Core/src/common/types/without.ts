export type IWithout<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] };
