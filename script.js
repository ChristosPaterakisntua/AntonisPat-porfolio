"use strict";
function copyText(text, button) {
    navigator.clipboard.writeText(text);
    const tooltip = button.querySelector(".cp-btntext");
    if (tooltip) {
        tooltip.textContent = "Copied!";
    }
    setTimeout(() => {
        if (tooltip) {
            tooltip.textContent = "Copy!";
        }
    }, 1500);
}
function formatTime(time) {
    return `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, "0")}`;
}
class OstAudioPlayer extends HTMLElement {
    static observedAttributes = ["track-title", "tags", "src"];
    button;
    img;
    trackTitle;
    audio;
    progressBar;
    progressFill;
    progressDot;
    currentTimeText;
    totalTimeText;
    isDragging = false;
    initialized = false;
    render() {
        const title = this.getAttribute("track-title") ?? "";
        const tags = this.getAttribute("tags") ?? "";
        const src = this.getAttribute("src") ?? "";
        this.innerHTML = `
            <div class="ost-main">
                <button class="player-btn">
                    <img src="imgs/play-icon.webp" alt="Play">
                </button>
                <div class="audio-txt">
                    <p>${title}</p>
                    <p class="tags">${tags}</p>
                </div>
                <audio>
                    <source src="${src}" type="audio/mpeg">
                </audio>
            </div>
            <div class="progress-bar">
                <p class="time-current">0:00</p>
                <div class="progress-fill"></div>
                <div class="progress-dot"></div>
                <p class="time-total">0:00</p>
            </div>
        `;
        this.button = this.querySelector("button");
        this.img = this.querySelector("img");
        this.trackTitle = this.querySelector(".audio-txt p");
        this.audio = this.querySelector("audio");
        this.progressBar = this.querySelector(".progress-bar");
        this.progressFill = this.querySelector(".progress-fill");
        this.progressDot = this.querySelector(".progress-dot");
        this.currentTimeText = this.querySelector(".time-current");
        this.totalTimeText = this.querySelector(".time-total");
    }
    stop() {
        if (!this.audio.ended) {
            this.audio.pause();
        }
        if (curPlaying === this) {
            curPlaying = null;
        }
        lastPlayed = this;
        this.img.src = "imgs/play-icon.webp";
        this.img.alt = "Play";
        this.trackTitle.style.fontWeight = "normal";
    }
    hideProgressBar() {
        this.progressBar.style.display = "none";
    }
    async start() {
        try {
            await this.audio.play();
            if (curPlaying) {
                curPlaying.stop();
            }
            curPlaying = this;
            if (lastPlayed) {
                lastPlayed.hideProgressBar();
            }
            this.img.src = "imgs/pause-icon.webp";
            this.img.alt = "Pause";
            this.trackTitle.style.fontWeight = "bold";
            this.progressBar.style.display = "block";
        }
        catch (error) {
            console.error("Could not play audio:", error);
        }
    }
    updateProgress() {
        if (!this.audio.duration || this.isDragging) {
            return;
        }
        const percentage = this.audio.currentTime / this.audio.duration * 100;
        this.progressDot.style.left = `${percentage}%`;
        this.progressFill.style.width = `${percentage}%`;
        this.currentTimeText.textContent = formatTime(this.audio.currentTime);
    }
    setProgressFromPointer(event) {
        if (!this.audio.duration) {
            return;
        }
        const rect = this.progressBar.getBoundingClientRect();
        const position = event.clientX - rect.left;
        const percentage = Math.min(Math.max(position / rect.width, 0), 1);
        this.audio.currentTime = percentage * this.audio.duration;
        this.progressDot.style.left = `${percentage * 100}%`;
        this.progressFill.style.width = `${percentage * 100}%`;
    }
    attachEvents() {
        this.button.addEventListener("click", async () => {
            if (this.audio.paused) {
                this.start();
            }
            else {
                this.stop();
            }
        });
        this.audio.addEventListener("ended", () => this.stop());
        this.audio.addEventListener("timeupdate", () => this.updateProgress());
        this.progressBar.addEventListener("click", (event) => this.setProgressFromPointer(event));
        this.progressDot.addEventListener("pointerdown", (event) => {
            this.isDragging = true;
            this.progressDot.setPointerCapture(event.pointerId);
        });
        this.progressDot.addEventListener("pointermove", (event) => {
            if (this.isDragging) {
                this.setProgressFromPointer(event);
            }
        });
        this.progressDot.addEventListener("pointerup", () => {
            this.isDragging = false;
        });
        this.audio.addEventListener("loadedmetadata", () => {
            this.totalTimeText.textContent = formatTime(this.audio.duration);
        });
    }
    connectedCallback() {
        this.classList.add("ost-row");
        if (!this.initialized) {
            this.render();
            this.attachEvents();
            this.initialized = true;
        }
    }
    attributeChangedCallback() {
        if (this.initialized) {
            if (curPlaying === this) {
                curPlaying = null;
            }
            this.render();
            this.attachEvents();
        }
    }
}
let curPlaying = null;
let lastPlayed = null;
customElements.define("ost-audio-player", OstAudioPlayer);
