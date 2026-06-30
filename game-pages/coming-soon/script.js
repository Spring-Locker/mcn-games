const video = document.getElementById('theaterVideo');
const playBtn = document.getElementById('playBtn');
const muteBtn = document.getElementById('muteBtn');

function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.style.opacity = '0';
        playBtn.style.pointerEvents = 'none';
    }
    else
    {
        video.pause();
        playBtn.style.opacity = '1';
        playBtn.style.pointerEvents = 'auto';
    }
}

document.querySelector('.theater-screen').addEventListener('click', function(e) {
    if(e.target !== playBtn) {togglePlay(); }
});

function toggleMute()
{
    video.muted = !video.muted;
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
}

function restartVideo()
{
    video.currentTime = 0;
    video.play();
    playBtn.style.opacity = '0';
}