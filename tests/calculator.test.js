/**
 * Unit tests for Calculator module
 */

import { Calculator } from '../js/calculator.js';

describe('Calculator', () => {
  describe('add', () => {
    test('should add two positive numbers', () => {
      expect(Calculator.add(2, 3)).toBe(5);
    });

    test('should add negative numbers', () => {
      expect(Calculator.add(-5, 3)).toBe(-2);
    });

    test('should handle floating point precision', () => {
      expect(Calculator.add(0.1, 0.2)).toBe(0.3);
    });
  });

  describe('subtract', () => {
    test('should subtract two positive numbers', () => {
      expect(Calculator.subtract(10, 4)).toBe(6);
    });

    test('should subtract negative numbers', () => {
      expect(Calculator.subtract(-5, -3)).toBe(-2);
    });

    test('should handle floating point precision', () => {
      expect(Calculator.subtract(0.3, 0.1)).toBe(0.2);
    });
  });

  describe('multiply', () => {
    test('should multiply two positive numbers', () => {
      expect(Calculator.multiply(7, 8)).toBe(56);
    });

    test('should multiply by zero', () => {
      expect(Calculator.multiply(5, 0)).toBe(0);
    });

    test('should multiply negative numbers', () => {
      expect(Calculator.multiply(-3, 4)).toBe(-12);
    });

    test('should handle decimal multiplication', () => {
      expect(Calculator.multiply(3.14, 2)).toBe(6.28);
    });
  });

  describe('divide', () => {
    test('should divide two positive numbers', () => {
      expect(Calculator.divide(20, 5)).toBe(4);
    });

    test('should throw error on division by zero', () => {
      expect(() => Calculator.divide(5, 0)).toThrow('Division by zero');
    });

    test('should handle decimal division', () => {
      expect(Calculator.divide(10, 3)).toBeCloseTo(3.3333333333, 9);
    });

    test('should divide negative numbers', () => {
      expect(Calculator.divide(-20, 4)).toBe(-5);
    });
  });

  describe('validateNumber', () => {
    test('should validate valid numbers', () => {
      expect(Calculator.validateNumber('123')).toBe(true);
      expect(Calculator.validateNumber('3.14')).toBe(true);
      expect(Calculator.validateNumber('-5')).toBe(true);
    });

    test('should reject invalid numbers', () => {
      expect(Calculator.validateNumber('abc')).toBe(false);
      expect(Calculator.validateNumber('')).toBe(false);
    });
  });
});
