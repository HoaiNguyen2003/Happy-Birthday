// audio-helper.js - Unified audio manager for birthday surprise pages

(function() {
    // 1. Create and inject CSS for audio controls
    const css = `
        .audio-controls {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: rgba(255, 255, 255, 0.85);
            padding: 10px 15px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            z-index: 99999;
            box-shadow: 0 4px 15px rgba(0, 114, 255, 0.2);
            border: 2px solid white;
            transition: all 0.3s ease;
        }

        .audio-controls button {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #00d2ff;
            margin-right: 10px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            outline: none;
        }

        .audio-controls button:hover {
            transform: scale(1.2);
            color: #0072ff;
        }

        .audio-controls input[type="range"] {
            width: 80px;
            height: 6px;
            -webkit-appearance: none;
            background: #ffcee6;
            border-radius: 5px;
            outline: none;
            cursor: pointer;
        }

        .audio-controls input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #ff6ec4;
            transition: all 0.1s ease;
        }

        .audio-controls input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            background: #00d2ff;
        }
    `;

    const styleEl = document.createElement('style');
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);

    // 2. Create and inject HTML elements
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'audio-controls';
    controlsContainer.innerHTML = `
        <button id="play-pause"><i class="play-icon">▶️</i></button>
        <input type="range" id="volume" min="0" max="1" step="0.1" value="0.5">
    `;
    document.body.appendChild(controlsContainer);

    const audioEl = document.createElement('audio');
    audioEl.id = 'birthday-song';
    audioEl.loop = true;
    audioEl.innerHTML = `<source src="image/HPBD.mp3" type="audio/mp3">`;
    document.body.appendChild(audioEl);

    // 3. Audio logic and state management
    const playPauseBtn = document.getElementById('play-pause');
    const volumeControl = document.getElementById('volume');

    // Retrieve state from localStorage
    let savedVolume = localStorage.getItem('audioVolume');
    let savedPlaying = localStorage.getItem('audioPlaying');
    let savedTime = localStorage.getItem('audioCurrentTime');

    // Defaults
    let volumeVal = savedVolume !== null ? parseFloat(savedVolume) : 0.5;
    let isPlaying = savedPlaying === 'true';
    let timeVal = savedTime !== null ? parseFloat(savedTime) : 0;

    audioEl.volume = volumeVal;
    volumeControl.value = volumeVal;

    // Apply saved time
    audioEl.currentTime = timeVal;

    function syncPlayButton() {
        if (isPlaying) {
            playPauseBtn.innerHTML = '<i class="play-icon">⏸️</i>';
        } else {
            playPauseBtn.innerHTML = '<i class="play-icon">▶️</i>';
        }
    }

    // Function to safely play audio
    function playAudio() {
        audioEl.play()
            .then(() => {
                isPlaying = true;
                localStorage.setItem('audioPlaying', 'true');
                syncPlayButton();
            })
            .catch(err => {
                console.log("Autoplay blocked, waiting for user interaction.", err);
            });
    }

    // Function to pause audio
    function pauseAudio() {
        audioEl.pause();
        isPlaying = false;
        localStorage.setItem('audioPlaying', 'false');
        syncPlayButton();
    }

    // Click handler for play/pause
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    // Volume handler
    volumeControl.addEventListener('input', () => {
        audioEl.volume = volumeControl.value;
        localStorage.setItem('audioVolume', volumeControl.value);
    });

    // Periodically save current playback time
    audioEl.addEventListener('timeupdate', () => {
        if (isPlaying) {
            localStorage.setItem('audioCurrentTime', audioEl.currentTime);
        }
    });

    // Save states before navigating away
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('audioCurrentTime', audioEl.currentTime);
        localStorage.setItem('audioPlaying', isPlaying ? 'true' : 'false');
    });

    // Determine page check
    const path = window.location.pathname;
    const isIndexPage = path.endsWith('index.html') || path.endsWith('/') || path === '';
    
    // For index.html, we only want to play AFTER passcode is unlocked.
    // For other pages, we play if state was playing.
    if (!isIndexPage && isPlaying) {
        // Attempt immediate play
        playAudio();

        // Fallback: play on first user interaction with the page
        const startOnInteraction = () => {
            if (isPlaying && audioEl.paused) {
                playAudio();
            }
            document.removeEventListener('click', startOnInteraction);
            document.removeEventListener('keydown', startOnInteraction);
            document.removeEventListener('touchstart', startOnInteraction);
        };
        document.addEventListener('click', startOnInteraction);
        document.addEventListener('keydown', startOnInteraction);
        document.addEventListener('touchstart', startOnInteraction);
    }

    // Sync button state initially
    syncPlayButton();

    // Export variables globally
    window.birthdayAudio = audioEl;
    window.playBirthdayAudio = playAudio;
    window.pauseBirthdayAudio = pauseAudio;
})();
