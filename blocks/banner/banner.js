import { fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
const placeholders = await fetchPlaceholders();

const { colors,clickMe } = placeholders;

console.log(colors)
console.log(clickMe)

  block.classList.add("banner-body");

  console.log(...block.children);
  [...block.children].forEach((row,i) => {
    row.classList.add("children-"+i++);

    const collection = row.children;
    collection[0].classList.add("img-container");
    collection[1].classList.add("txt-container");
  })
}