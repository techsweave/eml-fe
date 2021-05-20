export interface LambdaMultipleDataBody<T> {
  data: T[],
  count: number,
  lastEvaluatedKey?: Partial<T>
}
