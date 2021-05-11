
export interface lamdaSingleDataBody<T> {
    data: T
}

export interface lamdaMultipleDataBody<T> {
    data: T[],
    count: number,
    lastEvaluatedKey?: Partial<T>
}
