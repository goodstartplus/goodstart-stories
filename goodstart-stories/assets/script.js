const stories = document.querySelectorAll('.story');
const progressBar = document.getElementById('progressBar');

let currentStoryIndex = 0;
let currentMediaIndex = 0;
let isVideoPlaying = false;

function showMedia(storyIndex, mediaIndex) {
    const story = stories[storyIndex];
    const mediaItems = story.children;

    // Esconde todas as mídias
    for (let media of mediaItems) {
        media.style.display = 'none';
        if (media.tagName === 'VIDEO') {
            media.pause();
            media.currentTime = 0;
        }
    }

    const currentMedia = mediaItems[mediaIndex];
    currentMedia.style.display = 'block';

    // Se for vídeo, reproduz
    if (currentMedia.tagName === 'VIDEO') {
        isVideoPlaying = true;
        currentMedia.play();
        currentMedia.onended = () => nextMedia();
        updateProgressBar(currentMedia.duration * 1000);
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
    progressBar.style.transition = `width ${duration}ms linear`;
    progressBar.style.width = '100%';

    setTimeout(() => {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
    }, duration);
}

// Navegação por clique
document.body.addEventListener('click', (e) => {
    if (e.clientX > window.innerWidth / 2) {
        nextMedia();
    } else {
        prevStory();
    }
});

// Iniciar o primeiro story
showMedia(currentStoryIndex, currentMediaIndex);
