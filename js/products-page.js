import { products } from "./products-data.js";


// گرفتن عناصر HTML
const productsGrid = document.querySelector("#productsGrid");
const searchInput = document.querySelector("#productSearch");
const categoryFilter = document.querySelector("#categoryFilter");
const noResult = document.querySelector("#noResult");


// تبدیل object به array
const productsArray = Object.values(products);


// یکسان سازی متن فارسی
function normalizeText(text) {

    return text
        .toLowerCase()
        .trim()
        .replace(/ي/g, "ی")
        .replace(/ى/g, "ی")
        .replace(/ك/g, "ک")
        .replace(/آ/g, "ا")
        .replace(/\u200c/g, " ")
        .replace(/\s+/g, " ");

}


// ساخت کارت محصول
function createProductCard(product) {

    return `
        <div class="product-card">

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >

            <div class="product-content">

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ${product.price}
                    </span>

                    <a href="${product.link}" class="product-button">
                        مشاهده محصول
                    </a>

                </div>

            </div>

        </div>
    `;

}


// نمایش محصولات
function renderProducts(productList) {

    productsGrid.innerHTML = "";


    if (productList.length === 0) {

        noResult.style.display = "block";

        return;
    }


    noResult.style.display = "none";


    productList.forEach(function(product) {

        productsGrid.innerHTML +=
            createProductCard(product);

    });

}


// اعمال فیلترها
function applyFilters() {

    const searchValue =
        normalizeText(searchInput.value);

    const selectedCategory =
        categoryFilter.value;


    const searchWords =
        searchValue === ""
            ? []
            : searchValue.split(" ");


    const filteredProducts =
        productsArray.filter(function(product) {

            // بررسی دسته بندی
            const categoryMatch =
                selectedCategory === "all" ||
                product.category.includes(selectedCategory)


            // بررسی سرچ
            const productText =
                normalizeText(
                    product.name + " " +
                    product.description
                );


            const searchMatch =
                searchWords.length === 0 ||
                searchWords.every(function(word) {

                    return productText.includes(word);

                });


            return categoryMatch && searchMatch;

        });


    renderProducts(filteredProducts);

}


// وقتی کاربر سرچ می کند
searchInput.addEventListener(
    "input",
    applyFilters
);


// وقتی دسته بندی تغییر می کند
categoryFilter.addEventListener(
    "change",
    applyFilters
);


// نمایش اولیه همه محصولات
renderProducts(productsArray);
