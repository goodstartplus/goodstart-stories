const stories = document.querySelectorAll('.story');
const progressContainer = document.getElementById('progressContainer');

let currentStoryIndex = 0;
let currentMediaIndex = 0;
let isVideoPlaying = false;

initializeProgressBar();

function initializeProgressBar() {
    stories.forEach(() => {
        const bar = document.createElement('div');
        bar.classList.add('progress-bar');
        progressContainer.appendChild(bar);
    });
}

function showMedia(storyIndex, mediaIndex) {
    const story = stories[storyIndex];
    const mediaItems = story.children;

    for (let media of mediaItems) {
        media.style.display = 'none';
        if (media.tagName === 'VIDEO') {
            media.pause();
            media.currentTime = 0;
        }
    }

    const currentMedia = mediaItems[mediaIndex];
    currentMedia.style.display = 'block';

    if (currentMedia.tagName === 'VIDEO') {
        isVideoPlaying = true;
        currentMedia.muted = false;  // Ativar som
        currentMedia.play();
        currentMedia.onended = () => nextMedia();
        updateProgressBar(currentMedia.duration * 1000);

        // Pausar e retomar vídeo ao clicar
        currentMedia.onclick = () => {
            if (currentMedia.paused) {
                currentMedia.play();
            } else {
                currentMedia.pause();
            }
        };

    } else {
        isVideoPlaying = false;
        updateProgressBar(5000);
        setTimeout(nextMedia, 5000);
    }
}

function nextMedia() {
    const story = stories[currentStoryIndex];
    const mediaItems = story.children;

    if (currentMediaIndex < mediaItems.length - 1) {
        currentMediaIndex++;
    } else {
        nextStory();
        return;
    }

    showMedia(currentStoryIndex, currentMediaIndex);
}

function nextStory() {
    if (currentStoryIndex < stories.length - 1) {
        currentStoryIndex++;
    } else {
        currentStoryIndex = 0;
    }
    currentMediaIndex = 0;
    showMedia(currentStoryIndex, currentMediaIndex);
}

function prevStory() {
    if (currentStoryIndex > 0) {
        currentStoryIndex--;
    } else {
        currentStoryIndex = stories.length - 1;
    }
    currentMediaIndex = 0;
    showMedia(currentStoryIndex, currentMediaIndex);
}

function updateProgressBar(duration) {
    const bars = document.querySelectorAll('.progress-bar');
    bars[currentStoryIndex].style.transition = `width ${duration}ms linear`;
    bars[currentStoryIndex].style.width = '100%';

    setTimeout(() => {
        bars[currentStoryIndex].style.transition = 'none';
        bars[currentStoryIndex].style.width = '0%';
    }, duration);
}

// Swipe para mobile
let touchStartX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
        nextStory();
    } else if (touchEndX - touchStartX > 50) {
        prevStory();
    }
});

// Clique para avançar ou voltar
document.body.addEventListener('click', (e) => {
    if (e.clientX > window.innerWidth / 2) {
        nextMedia();
    } else {
        prevStory();
    }
});

showMedia(currentStoryIndex, currentMediaIndex);
