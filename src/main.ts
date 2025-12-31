import { transcodeToRaw } from "./videoToRaw";
import { splitRawIntoFrames, type Frame } from "./frameUtils";
import { renderFrame } from "./frameRenderer";

console.log("MAIN TS LOADED");

const WIDTH = 60;
const HEIGHT = 45;
const FPS = 30;

const fileInput: HTMLInputElement = document.getElementById("file") as HTMLInputElement;
const playBtn: HTMLButtonElement = document.getElementById("playBtn") as HTMLButtonElement;
const pauseBtn: HTMLButtonElement = document.getElementById("pauseBtn") as HTMLButtonElement;
const outputEl: HTMLPreElement = document.getElementById("output") as HTMLPreElement;
const progresEl: HTMLDivElement = document.getElementById("progress") as HTMLDivElement;

let frames: Frame[] = [];
let playing: boolean = false;
let index: number = 0;

fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];

    console.log("file selected");

    if (!file) {
        console.error("No file selected");
        return;
    }

    outputEl.textContent = "Processing video...";

    console.log("starting transcoding...")
    const raw: Uint8Array = await transcodeToRaw(file,{
        width: WIDTH,
        height: HEIGHT,
        onProgress: (ratio: number) => {
           progresEl.style.width = `${ratio * 100}%`
        }
    });
    frames = splitRawIntoFrames(raw,{ width: WIDTH, height: HEIGHT });

    playBtn.disabled = false;
    pauseBtn.disabled = false;

    outputEl.textContent = "Ready to play!";
})

playBtn.addEventListener("click", () => {
    if (!frames.length) return;
    playing = true;
    playLoop();
})

pauseBtn.addEventListener("click", () => {
    playing = false;
})

function playLoop(): void {
    if (!playing) return;

    const frame =  frames[index++];

    if (index >= frames.length) index = 0;

    outputEl.textContent = renderFrame(frame,  {width: WIDTH });

    setTimeout(playLoop, 1000 / FPS);
}