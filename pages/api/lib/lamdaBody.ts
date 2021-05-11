export interface lamdaMultipleDataBody<T> {
    data: T[],
    count: number,
    lastEvaluatedKey?: Partial<T>
}
