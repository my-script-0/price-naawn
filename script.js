document.addEventListener('DOMContentLoaded', () => {
    // جلب عناصر HTML
    const caravanSelect = document.getElementById('caravan-select');
    const areaSelect = document.getElementById('area-select');
    const priceDisplay = document.getElementById('price-display');

    // **جدول بيانات الأسعار لكل كرفان ومنطقة (وحدة العملة: بيسة)**
    // ملاحظة: لتبسيط المثال، افترضت أن الكرفانات لديها نفس نطاق الأسعار للمنطقتين.
    // إذا كانت الأسعار تختلف، يمكنك تغيير الأرقام.
    const deliveryPrices = {
        // المنطقة القريبة (700 بيسة إلى 800 بيسة)
        "near_center": {
            "bn_turk": "700 بيسة",
            "waheeb": "750 بيسة",
            "shiny": "700 بيسة",
            "sir_almadfoon": "800 بيسة",
            "luna_cafe": "750 بيسة",
            "gozal_turk": "800 بيسة"
        },
        // منطقة الرايبة (900 بيسة إلى 1 ريال)
        "raybah": {
            "bn_turk": "900 بيسة",
            "waheeb": "950 بيسة",
            "shiny": "900 بيسة",
            "sir_almadfoon": "1.000 ريال", // 1000 بيسة
            "luna_cafe": "950 بيسة",
            "gozal_turk": "1.000 ريال" // 1000 بيسة
        }
    };

    function updatePrice() {
        const selectedCaravan = caravanSelect.value;
        const selectedArea = areaSelect.value;
        
        // 1. تفعيل/تعطيل قائمة المناطق
        if (selectedCaravan !== "") {
            areaSelect.disabled = false;
        } else {
            areaSelect.disabled = true;
            areaSelect.value = ""; // إعادة تعيين المنطقة إذا لم يتم اختيار كرفان
        }

        // 2. عرض السعر
        if (selectedCaravan && selectedArea) {
            const price = deliveryPrices[selectedArea][selectedCaravan];
            
            if (price) {
                priceDisplay.innerHTML = `
                    <h2>سعر التوصيل:</h2>
                    <p class="price">${price}</p>
                    <p>من كرفان **${caravanSelect.options[caravanSelect.selectedIndex].text}** إلى **${areaSelect.options[areaSelect.selectedIndex].text}**.</p>
                `;
            } else {
                priceDisplay.innerHTML = '<p>السعر غير متوفر لهذا الخيار.</p>';
            }
        } else {
            priceDisplay.innerHTML = '<p>الرجاء اختيار الكرفان والمنطقة لعرض سعر التوصيل.</p>';
        }
    }

    // إضافة مستمع حدث عند تغيير القيمة في أي من القائمتين
    caravanSelect.addEventListener('change', updatePrice);
    areaSelect.addEventListener('change', updatePrice);
    
    // عند تحميل الصفحة، تأكد من عرض الرسالة الافتراضية
    updatePrice(); 
});
