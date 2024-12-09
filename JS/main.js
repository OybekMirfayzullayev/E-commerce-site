let product_list = document.querySelector("#product_list")
let product_categories = document.querySelector("#product_categories")
let sup =  document.querySelector("#sup") 
let show_product = document.querySelector("#product_cart")

async function getProducts() {
    let res = await fetch("https://fakestoreapi.com/products", {
        method: "GET", 
      }
    );
  
    res = await res.json();
  
    render(res);
}
  getProducts()


  async function filterCategory(category){
    try {
      if(category == 'All'){
        product_list.innerHTML = null
        getProducts()
      } else{
        let res = await fetch(`https://fakestoreapi.com/products/category/${category}`)
        res = await res.json();
        product_list.innerHTML = null
        render(res);
      }
      
    } catch (error) {
      
    }
  }


 async function getCategories(){
  try {
    let res = await fetch("https://fakestoreapi.com/products/categories", {
      method: "GET",
    })
    res = await res.json();
    rendCategory(res);
    
  } catch(error){
    alert(error.message)
  }
 }
 

  function render(params){  
    params.forEach(product => {
        let card = document.createElement("div");
        card.classList.add('col-span-1' , 'border', 'p-3', 'rounded-lg');

        let product_img = document.createElement("img");
        product_img.src = product.image
        product_img.alt = product.title
        product_img.classList.add('rounded-lg', 'w-full', 'h-[150px]', 'object-cover')

        let title = document.createElement("h1");
        title.textContent = product.title.slice(0, 35)
        title.classList.add('font-bold', 'text-[15px]', 'py-3')

        let description = document.createElement('p')
        description.textContent = product.description
        // description.classList.add('py-3')
        if (product.description.length) {
          let visibleDescription = product.description.slice(0, 25) + '...';
          description.textContent = visibleDescription;
          description.classList.add('text-gray-400', 'text-[14px]')

          let readMoreButton = document.createElement('button');
          readMoreButton.textContent = "Read more";
          readMoreButton.classList.add('text-white', 'ml-2');
          description.appendChild(readMoreButton);
      } else {
          description.textContent = fullDescription;
      }

        let price_btn_box = document.createElement('div')
        price_btn_box.classList.add('flex', 'justify-between','items-center', 'py-3', 'mt-3')

        let price = document.createElement("p");
        price.textContent = `$ ${product.price}`
        price.classList.add('py-3')

        let product_btn = document.createElement('button')
        product_btn.textContent = "Add to Cart";
        product_btn.classList.add('bg-[#703BF7]', 'text-white', 'py-1', 'px-4', 'rounded-lg' , 'active:opacity-70');
        product_btn.setAttribute("onclick", `addCart(${product.id})`)

        card.appendChild(product_img);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(price_btn_box);
        price_btn_box.appendChild(price);
        price_btn_box.appendChild(product_btn);
        product_list.appendChild(card);

    });
  }


  
  function rendCategory(category){
    let fragment = document.createDocumentFragment();
    category = ["All" , ...category]
    let category_title = document.createElement("h1")
    category_title.textContent = "Categories"
    category_title.classList.add('font-bold', 'text-xl', 'py-4', 'text-center')
  

  
    fragment.appendChild(category_title)
  
    category?.forEach((element)=>{  
    let category_btn = document.createElement("button") 
    category_btn.classList.add('bg-[#703BF7]', 'text-white', 'py-1', 'px-4', 'rounded-lg' , 'active:bg-purple-500', 'w-[200px]')
    category_btn.textContent = element
    category_btn.setAttribute("onclick", `filterCategory("${element}")`)
    
    fragment.appendChild(category_btn)
    });
    product_categories.appendChild(fragment);
   }  
    getCategories()

    let cart_list = []

    async function addCart(params){
      let res = await fetch(`https://fakestoreapi.com/products/${params}`)
      res = await res.json();
      cart_list.push({...res, count:1})
      sup.textContent = cart_list.length
      show_store(cart_list)
      
    }

    let product_store_open =()=>{
      show_product.classList.toggle("translate-x-[650px]")
    }

    
    
    
    let total_price= document.createElement('div') 
    total_price.classList.add('text-white')

   

    function show_store(cart_list){ 
      show_product.innerHTML = ""
      
      show_product.appendChild(total_price)

      let fragment = document.createDocumentFragment()




        cart_list.forEach(product => {

            let card = document.createElement("div");
            card.classList.add('col-span-1' , 'p-3', 'rounded-lg', 'flex', 'items-center', 'gap-[15px]', 'pt-[20px]');
    
            let product_img = document.createElement("img");
            product_img.src = product.image
            product_img.alt = product.title
            product_img.classList.add('rounded-lg', 'w-[100px]', 'h-[100px]', 'object-cover')
    
            let title = document.createElement("h1");
            title.textContent = product.title.slice(0, 30)
            title.classList.add('font-normal', 'text-[12px]','text-start', 'w-[190px]')

            let count_btn = document.createElement("div");
            count_btn.classList.add('w-[110px]', 'h-[34px]', 'border-[1px]', 'flex','items-center', 'justify-center')

            let minus_btn = document.createElement("button");
            minus_btn.textContent = "-";
            minus_btn.classList.add('text-white', 'w-1/3' , 'h-full' , 'bg-[#703BF7]', 'text-center', 'active:opacity-70');
            minus_btn.setAttribute('onclick', `minus_count(${product.id})`)

            let plus_btn = document.createElement("button");
            plus_btn.textContent = "+";
            plus_btn.classList.add('text-white', 'w-1/3' , 'h-full' , 'bg-[#703BF7]', 'text-center', 'active:opacity-70');
            plus_btn.setAttribute('onclick', `plus_count(${product.id})`)

            let count_product = document.createElement("p");
            count_product.textContent = product.count;
            count_product.classList.add('w-1/3','text-center')
    
            let price = document.createElement("p");
            price.textContent = `$ ${product.price}`
            price.classList.add('w-[60px]')

            let delete_btn = document.createElement("button");
            delete_btn.textContent = 'Delete';
            delete_btn.classList.add('w-[80px]', 'h-[30px]', 'bg-red-500', 'rounded-lg');
            delete_btn.setAttribute('onclick', `delete_product(${product.id})`);

    
            card.appendChild(product_img);
            card.appendChild(title);
            card.appendChild(count_btn);
            card.appendChild(count_btn)
            card.appendChild(price);
            card.appendChild(delete_btn);
            count_btn.appendChild(minus_btn);
            count_btn.appendChild(count_product);
            count_btn.appendChild(plus_btn);
            fragment.appendChild(card);
        });
        show_product.appendChild(fragment)
      }

      function plus_count(id){
        let find_product = cart_list.find((price) => {
          return price.id == id

        })
        find_product.count ++
        show_store(cart_list)
        narx()
      }


      function minus_count(id){
        let find_product = cart_list.find((price) => {
          return price.id == id
        })
        if(find_product.count > 1){
          find_product.count --
        }
        show_store(cart_list)
        narx()
    }

    function delete_product(id) {
      cart_list = cart_list.filter(product => product.id !== id);
      show_store(cart_list);
      narx()
    }


    function show_categories(){
      let showCategory = document.querySelector('#product_categories')
      showCategory.classList.toggle('xs:h-[340px]')
    }
     
    let bosh = 0
    function narx(){
      bosh = cart_list.reduce((total , item) => {
        return total + item.count * item.price
      },0)

    total_price.textContent = 'Total price:' +Math.round(bosh) + '$'
    }

  //   function serach(){
  //     let 
  //     product.forEach((item)=>{
  //         if(item.product.includes(a)){
  //             console.log(item);
  //         }
  //     })
  // }


  

    


    


  





 

  