/**
 * Calculator Module
 * Pure calculation logic with no DOM dependencies
 */

export const Calculator = {
  /**
   * Add two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Sum rounded to 10 decimal places
   */
  add(a, b) {
    return Number((a + b).toFixed(10));
  },

  /**
   * Subtract two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Difference rounded to 10 decimal places
   */
  subtract(a, b) {
    return Number((a - b).toFixed(10));
  },

  /**
   * Multiply two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Product rounded to 10 decimal places
   */
  multiply(a, b) {
    return Number((a * b).toFixed(10));
  },

  /**
   * Divide two numbers
   * @param {number} a - Dividend
   * @param {number} b - Divisor
   * @returns {number} Quotient rounded to 10 decimal places
   * @throws {Error} If divisor is zero
   */
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return Number((a / b).toFixed(10));
  },

  /**
   * Validate if string can be converted to a valid number
   * @param {string} str - String to validate
   * @returns {boolean} True if valid number
   */
  validateNumber(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
  }
};
