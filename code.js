const BaseUrl = "https://api.currencyapi.com/v3/latest?apikey=fca_live_dmQqekJv6dwPgbDRBBZflqaZkjA8jYcn1vHDFHC3";
const dropdowns = document.querySelectorAll(".drop-down select");
let btn = document.querySelector("button");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");

for (let select of dropdowns) {
  for (curr in countryList) {
    let newoption1 = document.createElement("option");
    newoption1.innerText = curr;
    newoption1.value = curr; // ✅ Important fix
    select.append(newoption1);

    if (select.name == "from" && curr == "USD") {
      newoption1.selected = "selected";
    } else if (select.name == "to" && curr == "INR") {
      newoption1.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }

  try {
    const response = await fetch(`${BaseUrl}&base_currency=${fromcurr.value}`);
    const data = await response.json();

    const rate = data.data[tocurr.value].value;
    const finalAmount = (amtval * rate).toFixed(2);

    document.querySelector(".result").innerText = 
      `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
  } catch (error) {
    console.error("Error fetching data:", error);
    document.querySelector(".result").innerText = "Error fetching conversion rate.";
  }
});

