<script>
  let convertingFrom = "USD";
  let convertingTo = "RUB";
  let amountFrom = 0;
  let amountTo = 0;

  // Код, отвечающий за получение данных с API

  async function convertCurrency(amount, fromCur, toCur) {
    const apiKey = "6635ebecb26ca6e2f65798c5";
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCur}/${toCur}/${amount}`
      );
      const data = await response.json();
      console.log(data.conversion_result);
      if (data.result === "success") {
        return data;
      } else {
        console.log("Произошла ошибка");
      }
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  }

  // Код, отвечающий за обработку результата промиса и изменение значений в инпутах

  function handleConvertFrom(event) {
    convertCurrency(event.target.value, convertingFrom, convertingTo).then(
      (data) => {
        amountTo = data.conversion_result.toFixed(2);
      }
    );
  }
  function handleConvertTo(event) {
    convertCurrency(event.target.value, convertingTo, convertingFrom).then(
      (data) => {
        amountFrom = data.conversion_result.toFixed(2);
      }
    );
  }

  // Код, отвечающий за конвертацию в зависимости от выбранного option

  function chooseСurrencyFrom(event) {
    convertingFrom = event.target.value;
    convertCurrency(amountFrom, convertingFrom, convertingTo).then((data) => {
      amountTo = data.conversion_result.toFixed(2);
    });
  }

  function chooseСurrencyTo(event) {
    convertingTo = event.target.value;
    convertCurrency(amountTo, convertingFrom, convertingTo).then((data) => {
      amountFrom = data.conversion_result.toFixed(2);
    });
  }
</script>

<main class="converter">
  <h1 class="converter__title">Конвертер валюты</h1>
  <div class="converter__container">
    <select
      class="converter__select-currency"
      on:change={chooseСurrencyFrom}
      bind:value={convertingFrom}
      name="from"
    >
      <option class="converter__select-currency_value" value="USD">USD</option>
      <option class="converter__select-currency_value" value="RUB">RUB</option>
      <option class="converter__select-currency_value" value="EUR">EUR</option>
    </select>
    <input
      class="converter__input converter__input_from"
      on:input={handleConvertFrom}
      bind:value={amountFrom}
      type="number"
    />
  </div>
  <div>
    <select
      class="converter__select-currency"
      on:change={chooseСurrencyTo}
      bind:value={convertingTo}
      name="to"
    >
      <option class="converter__select-currency_value" value="USD">USD</option>
      <option class="converter__select-currency_value" value="RUB">RUB</option>
      <option class="converter__select-currency_value" value="EUR">EUR</option>
    </select>
    <input
      class="converter__input converter__input_to"
      on:input={handleConvertTo}
      bind:value={amountTo}
      type="number"
    />
  </div>
</main>

<style>
  .converter {
    font-family: Arial, sans-serif;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .converter__title {
    text-align: center;
    margin-bottom: 20px;
  }

  .converter__container {
    margin-bottom: 20px;
  }

  .converter__select-currency,
  .converter__input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .converter__select-currency {
    appearance: none;
    -webkit-appearance: none;
    background-color: #f8f8f8;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M7 10l5 5 5-5H7z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    cursor: pointer;
  }

  .converter__input::-webkit-inner-spin-button,
  .converter__input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .converter__input {
    -moz-appearance: textfield;
  }
</style>
