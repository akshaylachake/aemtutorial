export default async function decorate(block) {
  const url = block.querySelector('a[href$=".json"]');
  let offset = 0;
  let limit = 100;
  const parentDiv = document.createElement('div');
  parentDiv.classList.add('data-container')
  parentDiv.setAttribute('id','data-container')
  url.replaceWith(parentDiv)
  if(url){
    try{
      let resp = await fetch(url+`?offset=${offset}&limit=${limit}`);
      let json = await resp.json();
      
      // console.log(url,resp,json)
      
      showDataWithPagination(json);
    }
    catch(err){
      console.log(err)
    }
  }
}

function showDataWithPagination(json) {
  const dataContainer = document.querySelector("#data-container");
  const items = json.data;
  const itemsPerPage = 5;
  let currentPage = 1;
  let totalPages;

  // calculate total pages
  totalPages = Math.ceil(json.data.length / itemsPerPage);

  function showItems(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = items.slice(startIndex, endIndex);
    
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item-container');
    itemContainer.setAttribute('id','item-container');
    
    const ul = document.createElement('ul');
    pageItems.forEach((i) => {
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(`${i.FName} - ${i.LName} - ${i.Address} - ${i.Date}`))
      ul.appendChild(li);
    });

    itemContainer.append(ul);
    dataContainer.prepend(itemContainer);
  }
  
  function setupPagination() {
    const paginationDiv = document.createElement('div')
    paginationDiv.classList.add('pagination-container')
    paginationDiv.setAttribute('id','pagination-container')
    
    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement("a");
      link.href = "#";
      link.innerText = i;
      if (i === currentPage) {
        link.classList.add("active");
      }
      
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const child = document.getElementById("item-container");
        if (child.parentNode) {
          child.parentNode.removeChild(child);
        }
        
        currentPage = i;
        showItems(currentPage);
        const currentActive = paginationDiv.querySelector(".active");
        currentActive.classList.remove("active");
        link.classList.add("active");
      });
      
      paginationDiv.append(link);
      dataContainer.append(paginationDiv);
    }
  }
  
  showItems(currentPage);
  setupPagination();
}