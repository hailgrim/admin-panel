export type WithoutNulls<T> = {
    [K in keyof T]: NonNullable<T[K]>;
};
//# sourceMappingURL=utils.d.ts.map