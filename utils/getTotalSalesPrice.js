const getTotalSalesPrice = (
  inventoryData,
  purchase_coutry,
  importFromCountry,
  ipMaskCount,
  ipGlowsCount,
  passportCountry
) => {

  let totalMaskSalePrice = 0;
  let totalGlowsSalePrice = 0;
  const maskCount = inventoryData[purchase_coutry].mask.count;
  const glowsCount = inventoryData[purchase_coutry].glows.count;

  if (ipMaskCount > maskCount) {
    totalMaskSalePrice =
      inventoryData[purchase_coutry].mask.count *
      inventoryData[purchase_coutry].mask.price;
    ipMaskCount -= inventoryData[purchase_coutry].mask.count;
    totalMaskSalePrice +=
      inventoryData[importFromCountry].mask.price * ipMaskCount;
    if (purchase_coutry === passportCountry) {
      totalMaskSalePrice += Math.ceil(ipMaskCount / 10) * ((20 / 100) * 400);
    } else {
      totalMaskSalePrice += Math.ceil(ipMaskCount / 10) * 400;
    }

    inventoryData[purchase_coutry].mask.count = 0;
    inventoryData[importFromCountry].mask.count -= ipMaskCount;
  } else {
    let priceWithoutImport =
      inventoryData[purchase_coutry].mask.price * ipMaskCount;
    totalMaskSalePrice = priceWithoutImport;
    let priceWithImport = null;
    const maskToImport = ipMaskCount - (ipMaskCount % 10);

    if (ipMaskCount > 10) {
      if (purchase_coutry === passportCountry) {
        priceWithImport =
          (20 / 100) * ((maskToImport / 10) * 400) +
          400(inventoryData[importFromCountry].mask.price * maskToImport);
      } else {
        priceWithImport =
          (maskToImport / 10) * 400 +
          inventoryData[importFromCountry].mask.price * maskToImport;
      }

      priceWithImport +=
        inventoryData[purchase_coutry].mask.price *
        (ipMaskCount - maskToImport);

      if (totalMaskSalePrice > priceWithImport) {
        totalMaskSalePrice = priceWithImport;
        inventoryData[importFromCountry].mask.count -= maskToImport;
        inventoryData[purchase_coutry].mask.count -= ipMaskCount - maskToImport;
      }
    }
    if (priceWithImport && totalMaskSalePrice > priceWithImport) {
      totalMaskSalePrice = priceWithImport;
      inventoryData[importFromCountry].mask.count -= maskToImport;
      inventoryData[purchase_coutry].mask.count -= ipMaskCount - maskToImport;
    } else {
      inventoryData[purchase_coutry].mask.count -= ipMaskCount;
    }
  }

  if (ipGlowsCount > glowsCount) {
    totalGlowsSalePrice =
      inventoryData[purchase_coutry].glows.count *
      inventoryData[purchase_coutry].glows.price;
    ipGlowsCount -= inventoryData[purchase_coutry].glows.count;
    totalGlowsSalePrice +=
      inventoryData[importFromCountry].glows.price * ipGlowsCount;

    if (purchase_coutry === passportCountry) {
      totalGlowsSalePrice += Math.ceil(ipGlowsCount / 10) * ((20 / 100) * 400);
    } else {
      totalGlowsSalePrice += Math.ceil(ipGlowsCount / 10) * 400;
    }

    inventoryData[purchase_coutry].glows.count = 0;
    inventoryData[importFromCountry].glows.count -= ipGlowsCount;
  } else {
    let priceWithoutImport =
      inventoryData[purchase_coutry].glows.price * ipGlowsCount;
    totalGlowsSalePrice = priceWithoutImport;
    let priceWithImport = null;
    const glowsToImport = ipGlowsCount - (ipGlowsCount % 10);

    if (ipGlowsCount > 10) {
      if (purchase_coutry === passportCountry) {
        priceWithImport =
          (20 / 100) * ((glowsToImport / 10) * 400) +
          inventoryData[importFromCountry].glows.price * glowsToImport;
      } else {
        priceWithImport =
          (glowsToImport / 10) * 400 +
          inventoryData[importFromCountry].glows.price * glowsToImport;
      }

      priceWithImport +=
        inventoryData[purchase_coutry].glows.price *
        (ipGlowsCount - glowsToImport);
    }
    if (priceWithImport && totalGlowsSalePrice > priceWithImport) {
      totalGlowsSalePrice = priceWithImport;
      inventoryData[importFromCountry].glows.count -= glowsToImport;
      inventoryData[purchase_coutry].glows.count -=
        ipGlowsCount - glowsToImport;
    } else {
      inventoryData[purchase_coutry].glows.count -= ipGlowsCount;
    }
  }

  return totalMaskSalePrice + totalGlowsSalePrice;
};

module.exports = getTotalSalesPrice;
