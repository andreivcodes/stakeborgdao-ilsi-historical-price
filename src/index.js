const Web3 = require("web3");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const ilsi_contract_abi = require("./abi/ilsi.json");
const general_erc20_abi = require("./abi/generalerc20.json");

const ilsi_contract_address = "0x0acC0FEE1D86D2cD5AF372615bf59b298D50cd69";

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.REACT_APP_AWS_NODE)
);

const ilsiContract = new web3.eth.Contract(
  ilsi_contract_abi,
  ilsi_contract_address
);

async function main() {
  const getPriceAtDate = async (date) => {
    let ilsiComponents = await ilsiContract.methods.getComponents().call();

    let componentsList = [];

    let ilsiPrice = 0;

    for (const componentAddress of ilsiComponents) {
      let amount = await ilsiContract.methods
        .getTotalComponentRealUnits(componentAddress)
        .call();

      let decimals = await new web3.eth.Contract(
        general_erc20_abi,
        componentAddress
      ).methods.decimals
        .call()
        .call();

      let id = await (
        await fetch(
          "https://api.coingecko.com/api/v3/coins/ethereum/contract/" +
            componentAddress
        )
      ).json();

      id = id.id;

      let price = await (
        await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}`
        )
      ).json();

      price = price.market_data.current_price.usd;

      componentsList.push({
        address: componentAddress,
        amount: Number(amount),
        price: Number(price),
        decimals: Number(decimals)
      });

      ilsiPrice += (Number(amount) * Number(price)) / Math.pow(10, decimals);
      await sleep(3000);
    }
    console.log(`${date}, ${ilsiPrice}`);
  };

  await getPriceAtDate("01-12-2021");
  await getPriceAtDate("02-12-2021");
  await getPriceAtDate("04-12-2021");
  await getPriceAtDate("05-12-2021");
  await getPriceAtDate("06-12-2021");
  await getPriceAtDate("07-12-2021");
  await getPriceAtDate("08-12-2021");
  await getPriceAtDate("09-12-2021");
  await getPriceAtDate("10-12-2021");
  await getPriceAtDate("11-12-2021");
  await getPriceAtDate("12-12-2021");
  await getPriceAtDate("14-12-2021");
  await getPriceAtDate("15-12-2021");
  await getPriceAtDate("16-12-2021");
  await getPriceAtDate("17-12-2021");
  await getPriceAtDate("18-12-2021");
  await getPriceAtDate("19-12-2021");
  await getPriceAtDate("20-12-2021");
  await getPriceAtDate("21-12-2021");
  await getPriceAtDate("22-12-2021");
  await getPriceAtDate("24-12-2021");
  await getPriceAtDate("25-12-2021");
  await getPriceAtDate("26-12-2021");
  await getPriceAtDate("27-12-2021");
  await getPriceAtDate("28-12-2021");
  await getPriceAtDate("29-12-2021");
  await getPriceAtDate("30-12-2021");
  await getPriceAtDate("31-12-2021");

  await getPriceAtDate("01-1-2022");
  await getPriceAtDate("02-1-2022");
  await getPriceAtDate("04-1-2022");
  await getPriceAtDate("05-1-2022");
  await getPriceAtDate("06-1-2022");
  await getPriceAtDate("07-1-2022");
  await getPriceAtDate("08-1-2022");
  await getPriceAtDate("09-1-2022");
  await getPriceAtDate("10-1-2022");
  await getPriceAtDate("11-1-2022");
  await getPriceAtDate("12-1-2022");
  await getPriceAtDate("14-1-2022");
  await getPriceAtDate("15-1-2022");
  await getPriceAtDate("16-1-2022");
  await getPriceAtDate("17-1-2022");
  await getPriceAtDate("18-1-2022");
  await getPriceAtDate("19-1-2022");
  await getPriceAtDate("20-1-2022");
  await getPriceAtDate("21-1-2022");
  await getPriceAtDate("22-1-2022");
  await getPriceAtDate("24-1-2022");
  await getPriceAtDate("25-1-2022");
  await getPriceAtDate("26-1-2022");
  /* await getPriceAtDate("27-1-2022");
  await getPriceAtDate("28-1-2022");
  await getPriceAtDate("29-1-2022");
  await getPriceAtDate("30-1-2022");
  await getPriceAtDate("31-1-2022"); */
}

main();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
