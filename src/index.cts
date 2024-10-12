// This module is the CJS entry point for the library.

// The Rust addon.
import * as addon from "./load.cjs";

// Use this declaration to assign types to the addon's exports,
// which otherwise by default are `any`.
declare module "./load.cjs" {
    function hash(data: Uint8Array): string;
}

export function hash<T>(data: T): string {
    if (data instanceof Uint8Array) {
        // If the data is already Uint8Array, pass it directly
        return addon.hash(data);
    } else if (ArrayBuffer.isView(data)) {
        // For other typed arrays (e.g., Int8Array, Float32Array), use their buffer
        return addon.hash(
            new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
        );
    } else if (typeof data === "string" || data instanceof String) {
        // Handle string data
        return addon.hash(Buffer.from(data as string));
    } else if (typeof data === "object") {
        // For non-binary objects, attempt JSON serialization
        return addon.hash(Buffer.from(JSON.stringify(data)));
    } else {
        // Fallback to converting data to a string and hashing
        return addon.hash(Buffer.from(String(data)));
    }
}
