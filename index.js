const inventoryData = require("./data.json");
const extractCountryFromPassport = require("./utils/extractCountryFromPassport");
const ifDemandExceeds = require("./utils/ifDemandExceeds");
const getTotalSalesPrice = require("./utils/getTotalSalesPrice");

const input = process.argv[2];
const inputArray = input.split(":");

const purchase_country = inputArray[0];
const ipMaskCount = inputArray[inputArray.indexOf("Mask") + 1];
const ipGlowsCount = inputArray[inputArray.indexOf("Gloves") + 1];
const passportNumber = inputArray[2];

const passportCountry = extractCountryFromPassport(passportNumber);

function getOutput() {
  if (ifDemandExceeds(ipMaskCount, ipGlowsCount, inventoryData)) {
    console.log(
      `OUT_OF_STOCK:${inventoryData.UK.mask.count} ${inventoryData.Germany.mask.count}:${inventoryData.UK.glows.count} ${inventoryData.Germany.glows.count}`
    );
  }

  if (purchase_country === "Germany") {
    const totalSalesPrice = getTotalSalesPrice(
      inventoryData,
      purchase_country,
      "UK",
      ipMaskCount,
      ipGlowsCount,
      passportCountry
    );
    console.log(
      `${totalSalesPrice}:${inventoryData.UK.mask.count} ${inventoryData.Germany.mask.count}:${inventoryData.UK.glows.count} ${inventoryData.Germany.glows.count}`
    );
  }

  if (purchase_country === "UK") {
    const totalSalesPrice = getTotalSalesPrice(
      inventoryData,
      purchase_country,
      "Germany",
      ipMaskCount,
      ipGlowsCount,
      passportCountry
    );

    console.log(
      `${totalSalesPrice}:${inventoryData.UK.mask.count} ${inventoryData.Germany.mask.count}:${inventoryData.UK.glows.count} ${inventoryData.Germany.glows.count}`
    );
  }
}

getOutput();
