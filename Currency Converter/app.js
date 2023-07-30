const api_key = "d1cd8905b7dd2ca745070379"; // YOUR API KEY
const url = "https://v6.exchangerate-api.com/v6/" + api_key ;

// ELEMENTS

const currency_one = document.getElementById("currency_one");
const currency_two = document.getElementById("currency_two");
const list_one = document.getElementById("list_one");
const list_two = document.getElementById("list_two");
const amount = document.getElementById("amount");
const calculate = document.getElementById("calculate");
const result = document.getElementById("result");

    fetch(url + "/codes")
        .then(res => res.json())
        .then(data => {
            const items = data.supported_codes;

            let options;
            for(let item of items) {
                options += `<option value=${item[0]}>${item[1]}</option>`;
            }
            list_one.innerHTML = options;
            list_two.innerHTML = options;
        });

    calculate.addEventListener("click", function(){
        const cur1 = currency_one.value;
        const cur2 = currency_two.value;

        const quant = amount.value;

        fetch(url + "/latest/" + cur1)
            .then(res => res.json())
            .then(data => {
                const sonuc = (data.conversion_rates[cur2] * quant).toFixed(3);
                result.innerHTML = `
                            <div class="card border-primary">
                            <div class="card-body text-center" style="font-size: 30px;">
                            ${quant} ${cur1} = ${sonuc} ${cur2}</div>
                            </div>
                `
            })

    })