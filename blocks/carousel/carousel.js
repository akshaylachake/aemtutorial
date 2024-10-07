export default async function decorate(block) {
  block.classList.add("slider-container");
  let itemsCout = block.children.length;
  let docxData = Array.from(block.children);

  const carousel = document.createElement("div");
  carousel.classList.add("carousel");
  block.appendChild(carousel);

  if (itemsCout > 1) {
    const prevButton = document.createElement("button");
    prevButton.classList.add("btn", "prev");
    block.appendChild(prevButton);

    const nextButton = document.createElement("button");
    nextButton.classList.add("btn", "next");
    block.appendChild(nextButton);

    const dots = document.createElement("div");
    dots.classList.add("dots");
    block.appendChild(dots);
  }

  docxData.forEach((row, i) => {
    carousel.appendChild(row);

    row.classList.add("item");
    if (i === 0) row.classList.add("active");
    row.children[0].classList.add("img-container");
    row.children[1].classList.add("data-container");
  });
  carouselInit(block);
}

function carouselInit(carousel) {
  let items = carousel.querySelectorAll(".item");
  let dotsContainer = carousel.querySelector(".dots");

  // Insert dots into the DOM and Add event listeners for buttons
  if (dotsContainer) {
    items.forEach((_, index) => {
      let dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.dataset.index = index;
      dotsContainer.appendChild(dot);
    });

    carousel.querySelector(".prev").addEventListener("click", () => {
      let index = [...items].findIndex((item) =>
        item.classList.contains("active")
      );
      showItem((index - 1 + items.length) % items.length);
    });

    carousel.querySelector(".next").addEventListener("click", () => {
      let index = [...items].findIndex((item) =>
        item.classList.contains("active")
      );
      showItem((index + 1) % items.length);
    });
  }

  let dots = carousel.querySelectorAll(".dot");

  // Function to show a specific item
  function showItem(index) {
    items.forEach((item, idx) => {
      item.classList.remove("active");
      dots[idx].classList.remove("active");
      if (idx === index) {
        item.classList.add("active");
        dots[idx].classList.add("active");
      }
    });
  }

  // Event listeners for dots
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      let index = parseInt(dot.dataset.index);
      showItem(index);
    });
  });
}
