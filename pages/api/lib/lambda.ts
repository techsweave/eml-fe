import { Fetcher } from './fetcher'

export async function getLambdaResult () {
  const fetcher = new Fetcher()
  return {
    props: {
      response: await fetcher.getJsonResult()
    }
  }
}
