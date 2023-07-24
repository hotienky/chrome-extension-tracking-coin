const formatNumber = (value) => {
    if (value) {
        const decimalPosition = value.toString().indexOf(".");
        if (decimalPosition > 0) {
            const intVal = value.toString().substring(0, decimalPosition);
            const decimalVal = value.toString().substring(decimalPosition + 1);
            return `${intVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${decimalVal}`;
        }
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return "";
};

async function callApiShowPriceCrypto() {
    const response = await fetch("https://remitano.com/api/v1/tickers/price?currency_unit=VND&with_price_chart_data=true&with_volume_data=true");
    const cryptos = await response.json();
    console.log({ cryptos });

    for (const ele in cryptos) {

        document.getElementById("table-price-coin").innerHTML += `
                <div class="row">
                    <div class="cell" data-title="Name">
                     ${ele}
                    </div>
                    <div class="cell" data-title="Age">
                        ${formatNumber(Math.round(cryptos[ele]['bid']))}đ
                    </div>
                </div>
        `

    };

}

window.onload = function () {
    callApiShowPriceCrypto();
};
