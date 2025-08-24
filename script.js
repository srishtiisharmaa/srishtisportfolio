// -------------------- IMAGE CAROUSELS --------------------
function initImageCarousel(section) {
  const track = section.querySelector('.carousel-track');
  const images = Array.from(track.querySelectorAll('img'));
  const prevBtn = section.querySelector('.prev');
  const nextBtn = section.querySelector('.next');
  let current = 0;

  function updateCarousel() {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === current);
    });

    const offset = (track.clientWidth / 2) - (images[current].clientWidth / 2);
    const translateX = -images[current].offsetLeft + offset;
    track.style.transform = `translateX(${translateX}px)`;
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % images.length;
    updateCarousel();
  });

  updateCarousel();
}

// Init all image-only carousels
document.querySelectorAll(".carousel-section").forEach(section => {
  if (section.querySelector("img") && !section.querySelector("video")) {
    initImageCarousel(section);
  }
});


// -------------------- VIDEO CAROUSELS --------------------
function initVideoCarousel(section) {
  const track = section.querySelector('.carousel-track');
  const videos = Array.from(track.querySelectorAll('video'));
  const prevBtn = section.querySelector('.prev');
  const nextBtn = section.querySelector('.next');
  const muteBtns = track.querySelectorAll('.mute-btn');
  let index = Math.floor(videos.length / 2); // start at middle video

  function updateCarousel() {
    // Center the active video
    const activeVideo = videos[index];
    const offset = (track.clientWidth / 2) - (activeVideo.parentElement.offsetWidth / 2);
    const translateX = -activeVideo.parentElement.offsetLeft + offset;
    track.style.transform = `translateX(${translateX}px)`;

    videos.forEach((video, i) => {
      if (i === index) {
        video.play();
        video.classList.add("active-video");
        video.classList.remove("inactive-video");
      } else {
        video.pause();
        video.currentTime = 0;
        video.classList.remove("active-video");
        video.classList.add("inactive-video");
      }
    });
  }

  // Prev/Next
  prevBtn.addEventListener('click', () => {
    index = (index - 1 + videos.length) % videos.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % videos.length;
    updateCarousel();
  });

  // Mute buttons
  muteBtns.forEach((btn, i) => {
    const video = videos[i];
    btn.addEventListener("click", () => {
      video.muted = !video.muted;
      btn.innerHTML = video.muted
        ? `<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 5V4L8 9H4z"></path><line x1="19" y1="9" x2="15" y2="15" stroke="#111" stroke-width="2"/><line x1="15" y1="9" x2="19" y2="15" stroke="#111" stroke-width="2"/></svg>`
        : `<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 5V4L8 9H4z"></path><path d="M16 7c1.5 1.5 1.5 8.5 0 10" stroke="#111" stroke-width="2" fill="none"/></svg>`;
    });
  });

  updateCarousel();
}

// Init all video carousels
document.querySelectorAll(".carousel-section").forEach(section => {
  if (section.querySelector("video")) {
    initVideoCarousel(section);
  }
});


// -------------------- LIGHTBOX (for images) --------------------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.carousel-track img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = 'none';
  }
});
