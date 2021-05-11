export class Fetcher {
    url: URL
    constructor(functionName) {
        this.url = new URL('https://' + process.env.API_ID + '.execute-api.' + process.env.API_REGION + '.amazonaws.com/' + process.env.API_STAGE + '/' + functionName)
    }

    async getJsonResult(): Promise<any> {
        const request = await fetch(this.url.href)
        const data = request.json()
        return data
    }
}
