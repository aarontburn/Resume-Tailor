export function redirect(destinationURL: string): void {
    if (!(typeof window === undefined)) {
        window.history.pushState(null, '', destinationURL);
        window.location.reload();
    }
}