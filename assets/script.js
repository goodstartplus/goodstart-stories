// Lista de stories na ordem de exibição
const stories = ["/story1/", "/story2/", "/story3/", "/story4/"];

// Identificar o story atual
const currentPath = window.location.pathname;
const currentIndex = stories.indexOf(currentPath.replace('/index.html', '/'));

function goToNextStory() {
    const nextIndex = (currentIndex + 1) % stories.length; // Volta ao primeiro story se estiver no último
    window.location.href = stories[nextIndex];
}

// Detectar quando o vídeo termina
const video = document.querySelector("video");
if (video) {
    video.addEventListener("ended", goToNextStory);
}

// Detectar swipe left (para dispositivos móveis)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, false);

document.addEventListener("touchend", function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleGesture();
}, false);

function handleGesture() {
    if (touchStartX - touchEndX > 50) {
        goToNextStory();  // Swipe Left ➡️ Próximo Story
    }
}
