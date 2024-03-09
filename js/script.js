function sliderMore(
  containerSlider,
  trackSlider,
  prevSlide,
  nextSlide,
  sliders
) {
  let position = 0;
  let slidesToShow = 3;
  if (window.innerWidth <= 1100) {
    slidesToShow = 2;
  }
  if (window.innerWidth <= 600) {
    slidesToShow = 1;
  }

  const slidesToScroll = 1;
  const container = document.querySelector(containerSlider);
  const track = document.querySelector(trackSlider);

  const btnPrev = document.querySelector(prevSlide);
  const btnNext = document.querySelector(nextSlide);
  const items = document.querySelectorAll(sliders);

  const itemsCount = items.length;
  const itemWidth = container.clientWidth / slidesToShow;
  const movePosition = slidesToScroll * itemWidth;

  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  });

  track.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = Math.abs(touchStartX - touchEndX);

    if (swipeThreshold < 50) {
      // Consider it as a tap or negligible swipe
      return;
    }

    if (touchStartX > touchEndX) {
      // Swipe left, move to next slide
      moveSlide("next");
    } else {
      // Swipe right, move to previous slide
      moveSlide("prev");
    }
  }

  function moveSlide(direction) {
    if (direction === "next") {
      position -= movePosition;
      position = Math.max(position, -(itemsCount - slidesToShow) * itemWidth);
    } else {
      position += movePosition;
      position = Math.min(position, 0);
    }

    setPosition();
    checkBtns();
  }

  // ............................

  items.forEach((item) => {
    item.style.minWidth = `${itemWidth - 15}px`;
  });

  btnNext.addEventListener("click", () => {
    const itemsLeft =
      itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

    position -=
      itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
    checkBtns();
  });

  btnPrev.addEventListener("click", () => {
    const itemsLeft = Math.abs(position) / itemWidth;

    position +=
      itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
    checkBtns();
  });

  const setPosition = () => {
    track.style.transform = `translateX(${position}px)`;
  };

  const checkBtns = () => {
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
  };

  checkBtns();
}

sliderMore(
  ".slider-container-lifestyle",
  ".lifestyle-slider-track",
  ".prev-lifestyle",
  ".next-lifestyle",
  ".box-item"
);
