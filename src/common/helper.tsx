import { v4 as uuidv4 } from 'uuid';

export function redirect(destinationURL: string): void {
    if (!(typeof window === undefined)) {
        window.history.pushState(null, '', destinationURL);
        window.location.reload();
    }
}

export function generateUUID(): string {
    return uuidv4();
}