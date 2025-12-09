export const formatNumber = (value, options = {}) => {
  const {
    style = "decimal",
    currency = "USD",
    minimumFractionDigits,
    maximumFractionDigits,
  } = options;

  const locale = "en-US";

  // Parse the value to a number
  const numValue = parseFloat(value);

  // Handle invalid values
  if (isNaN(numValue) || value === null || value === undefined) {
    return "";
  }

  // Build format options
  const formatOptions = {
    style,
  };

  if (style === "currency") {
    formatOptions.currency = currency;
  }

  // Set fraction digits if provided
  if (minimumFractionDigits !== undefined) {
    formatOptions.minimumFractionDigits = minimumFractionDigits;
  }

  if (maximumFractionDigits !== undefined) {
    formatOptions.maximumFractionDigits = maximumFractionDigits;
  }

  // Default fraction digits for currency if not specified
  if (
    style === "currency" &&
    minimumFractionDigits === undefined &&
    maximumFractionDigits === undefined
  ) {
    formatOptions.minimumFractionDigits = 2;
    formatOptions.maximumFractionDigits = 2;
  }

  // Format using Intl.NumberFormat
  return new Intl.NumberFormat(locale, formatOptions).format(numValue);
};

export const formatCurrency = (value, currency = "USD") => {
  return formatNumber(value, {
    style: "currency",
    currency,
  });
};
