export default function decorate(block) {

  block.classList.add("banner-body");

  console.log(...block.children);
  [...block.children].forEach((row,i) => {
    row.classList.add("children-"+i++);

    const collection = row.children;
    collection[0].classList.add("img-container");
    collection[1].classList.add("txt-container");
  })
}