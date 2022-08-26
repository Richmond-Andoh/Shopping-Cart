let store = document.getElementById("shirt")
//console.log(store)

let container =JSON.parse(localStorage.getItem("item")) || []

let createStore = () => {
  return (store.innerHTML = itemStore.map((item) => {
    let { id, name, title, desc, price, img} = item
    let search = container.find((item) => item.id === id)
        return `
      <div class="col-sm-12 col-md-6 col-lg-3 m-4 text-center"
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
      >
        <div class="card text-dark" style="width: 20rem;">
          <img src=${img} class="card-img-top" alt="...">
          <div class="card-body text-dark">
            <h4 class="card-title">${title}</h4>
            <p class="card-text">${desc}</p>
            <div class="d-flex justify-content-between text-dark">
              <h2>$ ${price}</h2>
              <div class="d-flex">
                <i class="bi bi-dash-lg p-2 fs-2" onclick="decreement(${id})"></i>
                <p id=${id} class="p-2 fs-2 num">${search === undefined ? 0 : search.item }</p>
                <i class="bi bi-plus-lg p-2 fs-2" onclick="increement(${id})"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }))
}
createStore();



let increement = (id) => {
   let itemSelected = id
   let search = container.find((item)=> item.id === itemSelected.id)
   if(search === undefined) {
    container.push({id: itemSelected.id, item: 1})   
   } else{
    search.item += 1
   }

  localStorage.setItem("item", JSON.stringify(container))

   update(itemSelected.id)
}


let decreement = (id) => {
  let itemSelected = id
   let search = container.find((item)=> item.id === itemSelected.id)
   if(search === undefined) return;
    else if(search.item !== 0) {
      search.item -= 1
   } else{
    return;
   }

   update(itemSelected.id)

   container = container.filter((item) => item.item !== 0)
   localStorage.setItem("item", JSON.stringify(container))
}

let update = (id) => {
  let search = container.find((item) => item.id === id)
  document.getElementById(id).innerHTML = search.item
  totalItem()
}


let totalItem = () => {
 let cartCount = document.getElementById('cartCount');
 cartCount.innerHTML = container.map((item) => item.item).reduce((a, b) => a + b, 0);
}

totalItem()
