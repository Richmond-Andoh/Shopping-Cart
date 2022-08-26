"use strict";

let label = document.getElementById("label")
let shopping = document.getElementById("shopping")

let container =JSON.parse(localStorage.getItem("item")) || []

let totalItem = () => {
    let cartCount = document.getElementById('cartCount');
    cartCount.innerHTML = container.map((item) => item.item).reduce((a, b) => a + b, 0);
   }  
totalItem()

let generateShop = () => {
    if(container.length !== 0){
        return shopping.innerHTML = container.map((data) => {
            let {id, item} = data;
            let search = itemStore.find((x) => x.id === id) || []
            return `
                <div class="col-sm-12 col-md-4 col-xl-3 col-xs-8 m-2 col-lg-3"
                data-aos="fade-right"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                >
                    <div class="card text-dark" style="width: 20rem;">
                        <img src=${search.img} class="card-img-top" alt="...">
                        <div class="card-body text-dark justify-content-evenly">
                            <div class="justify-content-evenly d-flex">
                                <h4 class="card-title">${search.title}</h4>
                                <button typ="button" class="btn btn-success text-white rounded-circle fw-bolder">$ ${search.price}</button>
                                <div class="text-white fs-2 bg-danger rounded-circle">
                                <i onclick="removeItem(${id})" class="bi bi-x-lg p-2"></i>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                            <i class="bi bi-dash-lg p-2 fs-2" onclick="decreement(${id})"></i>
                            <p id=${id} class="p-2 fs-2 num">${item}</p>
                            <i class="bi bi-plus-lg p-2 fs-2" onclick="increement(${id})"></i>
                        </div>
                        <h3>$ ${item * search.price}</h3>
                        </div>
                        
                    </div>
                </div>
            `
        }).join("")
         
    }  
    else{
        shopping.innerHTML = `
        <h2 class="text-dark text-center">No Items Added</h2>
        <a href="index.html" class="text-center">
          <button type="button" class="btn btn-danger">Back to Store</button>
        </a>
        `; 
    }
}
generateShop()

let increement = (id) => {
    let itemSelected = id
    let search = container.find((item)=> item.id === itemSelected.id)
    if(search === undefined) {
     container.push({id: itemSelected.id, item: 1})   
    } else{
     search.item += 1
    }
    generateShop()
    update(itemSelected.id)
   localStorage.setItem("item", JSON.stringify(container))
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
    generateShop()
    localStorage.setItem("item", JSON.stringify(container))
 }
 
 let update = (id) => {
   let search = container.find((item) => item.id === id)
   document.getElementById(id).innerHTML = search.item
   generateShop()
   totalCost()
 }

 let removeItem = (id) => {
    let itemSelected = id;
    container = container.filter((item) => item.id !== itemSelected.id);
    generateShop();
    localStorage.setItem("item", JSON.stringify(container))
    //console.log(itemSelected.id)
    totalCost()
 }
   let clearItems = () => {
    container = []
    generateShop();
    localStorage.setItem("item", JSON.stringify(container))
   }

 let totalCost = () => {
    if(container.length !== 0){
        let total = container.map((cal) => {
            let {item, id} = cal
            let search = itemStore.find((x) => x.id === id)|| []
            return item * search.price
        
        }).reduce((a, b) => a + b, 0);
        label.innerHTML = `
              <h3>Total Cost: $ ${total}</h3>
              <button onclick="clearItems()" type="button" class="btn btn-danger p-2 m-2 fs-3">Clear Items</button>
            `
        console.log(total)
    }
      //clearItems()
 }
 totalCost()