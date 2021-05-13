export interface lambdaMultipleDataBody<T> {
    data: T[],
    count: number,
    lastEvaluatedKey?: Partial<T>
}
