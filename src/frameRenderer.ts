import type { Frame } from "./frameUtils";

export interface renderOptions {
    width: number;
}

// ALWAYS START WITH THE DARKEST AND GO UP T THE BRIGHTEST
const pixelOptions = ["🖤","🩶","🤍"];

export function renderFrame(frame: Frame, options: renderOptions): string {
    const { width } = options;

    let output: string = "";

    for (let i = 0; i < frame.length; i++) {
        const pixel = frame[i]; // fetch the data from each pixel
        const idx: number = Math.floor((pixel / 255) * (pixelOptions.length - 1)); // Normalize range of colors
        output += pixelOptions[idx];

        if ((i + 1) % width === 0) output += "\n"; // break line every time a row is completed
    }

    return output;
}