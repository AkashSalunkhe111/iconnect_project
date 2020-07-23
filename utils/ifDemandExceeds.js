const ifDemandExceeds = (ipMaskCount, ipGlowsCount, inventoryData) => {
  const totalMaskCount =
    inventoryData.UK.mask.count + inventoryData.Germany.mask.count;
  const totalGlowsCount =
    inventoryData.UK.glows.count + inventoryData.Germany.glows.count;

  if (ipMaskCount > totalMaskCount || ipGlowsCount > totalGlowsCount) {
    return true;
  }
  return false;
};

module.exports = ifDemandExceeds;
