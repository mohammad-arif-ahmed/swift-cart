let cartCount = 0;
const loadCategories = async () => {

    const res = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await res.json();

    const container = document.getElementById('category-list');

    container.innerHTML =
        `<button onclick="loadProducts('all', this)"
         class="btn btn-outline btn-sm category-btn active">All</button>`;

    categories.forEach(cat => {

        const btn = document.createElement('button');

        btn.className =
            "btn btn-outline btn-sm category-btn capitalize";

        btn.innerText = cat;

        btn.onclick = () => loadProducts(cat, btn);

        container.appendChild(btn);
    });
};
const loadProducts = async (category, btn) => {

    if(btn){
        document.querySelectorAll('.category-btn')
            .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    const grid = document.getElementById('product-grid');

    grid.innerHTML =
        `<div class="col-span-full flex justify-center py-20">
            <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>`;

    const url = category === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${category}`;

    const res = await fetch(url);
    const products = await res.json();

    grid.innerHTML = "";

    products.forEach(product => {

        const div = document.createElement('div');
        div.className =
            "card bg-white border hover:shadow-xl transition";

        div.innerHTML = `
            <figure class="p-6 h-64 bg-gray-100">
                <img src="${product.image}"
                class="h-full object-contain mix-blend-multiply"/>
            </figure>

            <div class="card-body p-5">

                <div class="flex justify-between items-start gap-2">
                    <span class="badge bg-blue-50 text-primary border-none">
                        ${product.category}
                    </span>

                    <span class="text-orange-400 text-sm font-bold">
                        ⭐ ${product.rating.rate}
                    </span>
                </div>

                <!-- Title truncated but expands on hover -->
                <h2 class="card-title text-sm mt-2 line-clamp-2">
                    ${product.title}
                </h2>

                <p class="text-2xl font-bold mt-2">$${product.price}</p>

                <div class="grid grid-cols-2 gap-2 mt-4">
                    <button onclick="showDetails(${product.id})"
                        class="btn btn-outline btn-sm">
                        Details
                    </button>

                    <button onclick="addToCart()"
                        class="btn btn-primary btn-sm">
                        Add
                    </button>
                </div>
            </div>
        `;

        grid.appendChild(div);
    });
};

const showDetails = async (id) => {

    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();

    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div class="flex flex-col md:flex-row gap-8">

            <img src="${data.image}"
                class="w-full md:w-1/3 object-contain h-64"/>

            <div class="flex-1 text-left">
                <h3 class="text-2xl font-bold mb-2">${data.title}</h3>

                <p class="text-gray-500 mb-4">${data.description}</p>

                <p class="text-3xl font-bold text-primary mb-6">
                    $${data.price}
                </p>

                <div class="flex gap-4">
                    <button class="btn btn-primary flex-1">
                        Buy Now
                    </button>

                    <label for="details_modal"
                        class="btn btn-outline">Close</label>
                </div>
            </div>
        </div>
    `;

    document.getElementById('details_modal').checked = true;
};

const addToCart = () => {

    cartCount++;

    document.getElementById('cart-count').innerText = cartCount;
};

loadCategories();   
loadProducts('all'); 