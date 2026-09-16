const searchInput = document.querySelector("#searchInput");
const productsContainer = document.querySelector(".search-products");
const noResult = document.querySelector("#no-result");


// یکسان‌سازی متن فارسی
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
        <div class="search-product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.price}</p>

            <a href="${product.link}">
                مشاهده محصول
            </a>

        </div>
    `;
}


// انجام جستجو
function performSearch(searchValue) {

    searchValue = normalizeText(searchValue);

    productsContainer.innerHTML = "";

    if (searchValue === "") {
        noResult.style.display = "none";
        return;
    }


    const searchWords = searchValue.split(" ");


    const foundProducts = searchProducts.filter(function(product) {

        const productText = normalizeText(product.name);

        return searchWords.every(function(word) {

            return productText.includes(word);

        });

    });


    if (foundProducts.length > 0) {

        noResult.style.display = "none";

        foundProducts.forEach(function(product) {

            productsContainer.innerHTML +=
                createProductCard(product);

        });

    } else {

        noResult.style.display = "block";

    }

}


// گرفتن عبارت سرچ از URL
const urlParams = new URLSearchParams(window.location.search);

const searchValueFromURL = urlParams.get("search");


if (searchValueFromURL) {

    searchInput.value = searchValueFromURL;

    performSearch(searchValueFromURL);

}


// اگر کاربر داخل search.html دوباره سرچ کرد
searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        const searchValue = searchInput.value.trim();

        if (searchValue !== "") {

            window.history.replaceState(
                {},
                "",
                "?search=" + encodeURIComponent(searchValue)
            );

            performSearch(searchValue);

        }

    }

});