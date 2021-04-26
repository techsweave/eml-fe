import { Fetcher } from './fetcher'

export async function getLambdaResult (functionName: string) {
  const fetcher = new Fetcher(functionName)
  return {
    props: {
      response: await fetcher.getJsonResult()
    }
  }
}
