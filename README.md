# Web TikTok

A TikTok-like web application that allows users to create reels or take shots. This project leverages `ffmpeg-wasm` for video processing and `three.js` for video and green screen removing.

<br/>
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

<br/>
## Installation

Clone the repository:
    ```bash
    git clone https://github.com/TyyyHo/web_tiktok.git
    ```

<br/>
## Usage

Here are the instructions to use the application:

1. Start the development server:
    ```bash
    npm start
    ```

2. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

3. Allow camera access when prompted.
   
4. Follow the on-screen instructions to take a shot or create a reel.

<br/>
## Features

- Record video or take snapshots using the camera.
- Add background music to your video.
- Mix and process the final video using ffmpeg-wasm.
- Download the created reels.

<br/>
## Licenese

Distributed under the MIT License. See LICENSE.txt for more information.

<br/>
## Acknowledgments

- Thanks to the developers of ffmpeg-wasm for providing a powerful tool for video processing.
- Green screen removing is inspire by <a href="https://github.com/drinkspiller/threejs_chromakey_video_material" target="_blank">drinkspiller</a>.



