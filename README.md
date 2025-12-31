# Bad Apple Renderer (FFmpeg WASM + Vite)

A lightweight browser project that uses **FFmpeg WASM** to process video directly in the browser.  
Built with **Vite**, **TypeScript**, and the **ESM build** of FFmpeg for full compatibility.

---

## Features

- Runs FFmpeg entirely in the browser
- Extracts raw frames from video files
- Shows progress updates in console

---

## Setup

```bash
npm install
npm run dev
```

Open the Vite dev server URL (usually `http://localhost:5173`).

---

## FFmpeg Setup

This project loads FFmpeg from:

```
https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/
```

Loader example:

```ts
await ffmpeg.load({
  coreURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.js`, "text/javascript"),
  wasmURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.wasm`, "application/wasm")
});
```

if you want to learn more about this. I recommend checking out [ffmpeg.wasm](https://ffmpegwasm.netlify.app/docs/overview)

---

## Vite Config

```ts
export default defineConfig({
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util", "@ffmpeg/core"]
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp"
    }
  }
});
```

These headers are required for SharedArrayBuffer support.

---

## Project Structure

```
src/
  main.ts
  ffmpegClient.ts
  frameUtils.ts
  videoToRaw.ts
  frameRenderer.ts
  
public/
  style.css
  vite.svg
  
index.html
vite.config.ts
package.json
```

---

## Usage

1. Select a video file
2. FFmpeg loads in the browser
3. Frames are extracted
4. Progress logs appear in the console

---

## License

MIT

---