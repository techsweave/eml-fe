export class Fetcher {
  url: URL
  constractor () {
    this.url = new URL('e')
  }

  async getJsonResult (): Promise<any> {
    const request = await fetch(this.url.href)
    const data = request.json()
    return data
  }
}
