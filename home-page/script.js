const bgMusic = new Audio('mcn_games_bg_music.mp3');
bgMusic.loop = true;

if (sessionStorage.getItem('musicPlaying') === 'true')
{
  bgMusic.currentTime = parseFloat(sessionStorage.getItem('musicTime') || 0);

  bgMusic.play().catch(() =>
    {
      console.log("Waiting for user interaction to resume music.");
    });
}

window.addEventListener('beforeunload', () => 
  {
    sessionStorage.setItem('musicPlaying', !bgMusic.paused);
    sessionStorage.setItem('musicTime', bgMusic.currentTime);
  });

window.addEventListener('click', () =>
  {
    if (bgMusic.paused && sessionStorage.getItem('silencePage') !== 'true')
    {
      bgMusic.play();
      sessionStorage.setItem('musicPlaying', 'true');
    }
  }, {once: true});
