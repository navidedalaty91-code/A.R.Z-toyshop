import { products } from "./products-data.js";

const popularProducts = [
    "Remote_controlled_airplane",
    "Rechargeable_Bluetooth_Boxing_Machine",
    "Dual_function_ball_water_gun",
    "Carpentry_set_with_battery_powered_drill",
    "Game_console_with_500_games",
    "Hair_braiding_set",
    "Nail_and_Makeup_Set",
    "Instant_print_camera"
];

const relatedContainer = document.querySelector(".related-products");

if (relatedContainer) {

    // پیدا کردن پوشه محصول فعلی
    const pathParts = window.location.pathname
        .split("/")
        .filter(Boolean);

    const currentFolder =
        pathParts.at(-1) === "index.html"
            ? pathParts.at(-2)
            : pathParts.at(-1);


    // محصولات محبوب را تبدیل به اطلاعات کامل می‌کنیم
    // محصول فعلی را حذف می‌کنیم
    // و فقط ۴ محصول نشان می‌دهیم
    const relatedProducts = popularProducts
        .map(id => products[id])
        .filter(product => {

            if (!product) return false;

            // لینک محصول فعلی را بررسی می‌کنیم
            const productFolder = product.link
                .replace(/\/$/, "")
                .split("/")
                .filter(Boolean)
                .at(-1);

            return productFolder !== currentFolder;
        })
        .slice(0, 4);


    // ساخت کارت‌ها
    relatedProducts.forEach(product => {

        relatedContainer.insertAdjacentHTML("beforeend", `
            <div class="related-card">

                <a href="${product.link}">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >
                </a>

                <h3>${product.name}</h3>

                <p>${product.price}</p>

                <a href="${product.link}" class="button">
                    مشاهده محصول
                </a>

            </div>
        `);

    });
}
