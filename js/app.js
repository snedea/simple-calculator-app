/**
 * Calculator UI Controller
 * Handles user interactions and state management
 */

import { Calculator } from './calculator.js';

// Application state
const state = {
  currentInput: '0',
  previousValue: null,
  operator: null,
  shouldResetDisplay: false
};

// DOM elements
const display = document.getElementById('display');

/**
 * Update the display with current input
 */
function updateDisplay() {
  display.textContent = state.currentInput;
  display.classList.add('flash');
  setTimeout(() => display.classList.remove('flash'), 300);
}

/**
 * Handle number button clicks
 * @param {string} num - The number to append
 */
function handleNumber(num) {
  if (state.shouldResetDisplay) {
    state.currentInput = num;
    state.shouldResetDisplay = false;
  } else {
    if (state.currentInput === '0' && num !== '.') {
      state.currentInput = num;
    } else {
      state.currentInput += num;
    }
  }
  updateDisplay();
}

/**
 * Handle decimal point
 */
function handleDecimal() {
  if (state.shouldResetDisplay) {
    state.currentInput = '0.';
    state.shouldResetDisplay = false;
  } else if (!state.currentInput.includes('.')) {
    state.currentInput += '.';
  }
  updateDisplay();
}

/**
 * Handle operator button clicks
 * @param {string} op - The operator (+, -, *, /)
 */
function handleOperator(op) {
  const currentValue = parseFloat(state.currentInput);

  if (state.operator && state.previousValue !== null && !state.shouldResetDisplay) {
    // Chain operations: calculate intermediate result
    handleEquals();
  }

  state.previousValue = state.operator ? parseFloat(state.currentInput) : currentValue;
  state.operator = op;
  state.shouldResetDisplay = true;
}

/**
 * Handle equals button - perform calculation
 */
function handleEquals() {
  if (state.operator === null || state.previousValue === null) {
    return;
  }

  const currentValue = parseFloat(state.currentInput);
  let result;

  try {
    switch (state.operator) {
      case '+':
        result = Calculator.add(state.previousValue, currentValue);
        break;
      case '-':
        result = Calculator.subtract(state.previousValue, currentValue);
        break;
      case '*':
        result = Calculator.multiply(state.previousValue, currentValue);
        break;
      case '/':
        result = Calculator.divide(state.previousValue, currentValue);
        break;
      default:
        return;
    }

    state.currentInput = String(result);
    state.operator = null;
    state.previousValue = null;
    state.shouldResetDisplay = true;
    updateDisplay();
  } catch (error) {
    state.currentInput = 'Error';
    state.operator = null;
    state.previousValue = null;
    state.shouldResetDisplay = true;
    updateDisplay();
  }
}

/**
 * Handle clear button - reset everything
 */
function handleClear() {
  state.currentInput = '0';
  state.previousValue = null;
  state.operator = null;
  state.shouldResetDisplay = false;
  updateDisplay();
}

/**
 * Handle clear entry button - clear current input only
 */
function handleClearEntry() {
  state.currentInput = '0';
  state.shouldResetDisplay = false;
  updateDisplay();
}

/**
 * Handle keyboard input
 * @param {KeyboardEvent} event
 */
function handleKeyboard(event) {
  const key = event.key;

  // Numbers
  if (key >= '0' && key <= '9') {
    handleNumber(key);
  }
  // Operators
  else if (key === '+') {
    handleOperator('+');
  } else if (key === '-') {
    handleOperator('-');
  } else if (key === '*') {
    handleOperator('*');
  } else if (key === '/') {
    event.preventDefault(); // Prevent browser quick find
    handleOperator('/');
  }
  // Special keys
  else if (key === 'Enter' || key === '=') {
    handleEquals();
  } else if (key === '.') {
    handleDecimal();
  } else if (key === 'Escape' || key === 'c' || key === 'C') {
    handleClear();
  } else if (key === 'Backspace') {
    if (state.currentInput.length > 1) {
      state.currentInput = state.currentInput.slice(0, -1);
    } else {
      state.currentInput = '0';
    }
    updateDisplay();
  }
}

/**
 * Initialize the calculator
 */
function init() {
  // Number buttons
  for (let i = 0; i <= 9; i++) {
    const btn = document.getElementById(`btn-${i}`);
    if (btn) {
      btn.addEventListener('click', () => handleNumber(String(i)));
    }
  }

  // Operator buttons
  document.getElementById('btn-add')?.addEventListener('click', () => handleOperator('+'));
  document.getElementById('btn-subtract')?.addEventListener('click', () => handleOperator('-'));
  document.getElementById('btn-multiply')?.addEventListener('click', () => handleOperator('*'));
  document.getElementById('btn-divide')?.addEventListener('click', () => handleOperator('/'));

  // Function buttons
  document.getElementById('btn-equals')?.addEventListener('click', handleEquals);
  document.getElementById('btn-decimal')?.addEventListener('click', handleDecimal);
  document.getElementById('btn-clear')?.addEventListener('click', handleClear);
  document.getElementById('btn-clear-entry')?.addEventListener('click', handleClearEntry);

  // Keyboard support
  document.addEventListener('keydown', handleKeyboard);

  // Initial display
  updateDisplay();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
