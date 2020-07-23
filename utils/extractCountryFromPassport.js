const extractCountryFromPassport = (passportNumber) => {
  if (!passportNumber) {
    return null;
  }

  if (/^[B]\d{3}[a-zA-Z]{2}([a-zA-Z0-9]+){7}/.test(passportNumber)) {
    return "UK";
  }

  if (/^[A][a-zA-Z]{2}([a-zA-Z0-9]+){9}/.test(passportNumber)) {
    return "GERMANY";
  }
};

module.exports = extractCountryFromPassport;
