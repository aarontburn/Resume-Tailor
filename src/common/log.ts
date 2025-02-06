export function log(...str: any[]) {
    const now: Date = new Date();

    let out: string = `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] `
    for (const s of str) {
        out += typeof s === "string" ? s : JSON.stringify(s)
    }

    console.log(out);

}