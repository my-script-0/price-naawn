window.onload = () => { // تم التغيير من document.addEventListener('DOMContentLoaded', ...)
    // جلب عناصر HTML
    const caravanSelect = document.getElementById('caravan-select');
    const areaSelect = document.getElementById('area-select');
    const priceDisplay = document.getElementById('price-display');

    // **جدول بيانات الأسعار والأوقات**
    const deliveryData = {
        // المنطقة القريبة (مركز الولاية) - (700 بيسة إلى 800 بيسة)
        "near_center": {
            time: "15 - 20 دقيقة",
            prices: {
                "bn_turk": "700 بيسة",
                "waheeb": "750 بيسة",
                "shiny": "700 بيسة",
                "sir_almadfoon": "800 بيسة",
                "luna_cafe": "750 بيسة",
                "gozal_turk": "800 بيسة"
            }
        },
        // منطقة الرايبة - (تم توحيد السعر إلى 1.000 ريال للكل)
        "raybah": {
            time: "20 - 30 دقيقة",
            prices: {
                "bn_turk": "1.000 ريال",
                "waheeb": "1.000 ريال",
                "shiny": "1.000 ريال",
                "sir_almadfoon": "1.000 ريال", 
                "luna_cafe": "1.000 ريال",
                "gozal_turk": "1.000 ريال" 
            }
        }
    };

    function updatePrice() {
        const selectedCaravan = caravanSelect.value;
        const selectedArea = areaSelect.value;
        
        // 1. تفعيل/تعطيل قائمة المناطق
        if (selectedCaravan !== "") {
            areaSelect.disabled = false;
            areaSelect.classList.remove('disabled-select'); // إزالة فئة التعطيل للتنسيق
        } else {
            areaSelect.disabled = true;
            areaSelect.value = ""; // إعادة تعيين المنطقة إذا لم يتم اختيار كرفان
            areaSelect.classList.add('disabled-select'); // إضافة فئة التعطيل للتنسيق
        }

        // 2. عرض السعر والوقت
        if (selectedCaravan && selectedArea) {
            const areaData = deliveryData[selectedArea];
            const price = areaData.prices[selectedCaravan];
            const time = areaData.time;
            
            if (price && time) {
                priceDisplay.innerHTML = `
                    <p class="display-label">سعر التوصيل:</p>
                    <p class="price">${price}</p>
                    <p class="display-label">وقت التوصيل التقريبي:</p>
                    <p class="time">${time}</p>
                    <p class="details">من كرفان **${caravanSelect.options[caravanSelect.selectedIndex].text}** إلى **${areaSelect.options[areaSelect.selectedIndex].text}**.</p>
                `;
            } else {
                priceDisplay.innerHTML = '<p class="info-message">السعر أو الوقت غير متوفر لهذا الخيار.</p>';
            }
        } else {
            priceDisplay.innerHTML = '<p class="info-message">الرجاء اختيار الكرفان والمنطقة لعرض سعر التوصيل.</p>';
        }
    }

    // إضافة مستمع حدث عند تغيير القيمة في أي من القائمتين
    caravanSelect.addEventListener('change', updatePrice);
    areaSelect.addEventListener('change', updatePrice);
    
    // عند تحميل الصفحة، تأكد من عرض الرسالة الافتراضية
    updatePrice(); 
};
