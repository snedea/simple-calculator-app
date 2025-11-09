# Architecture Documentation

## System Overview

The Simple Calculator App is a single-page web application following a clean MVC-like architecture pattern with separation between calculation logic and UI.

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│    (index.html + style.css)         │
└─────────────────────────────────────┘
                 ↕
┌─────────────────────────────────────┐
│         Controller Layer            │
│          (app.js)                   │
│  - Event handlers                   │
│  - State management                 │
│  - DOM updates                      │
└─────────────────────────────────────┘
                 ↕
┌─────────────────────────────────────┐
│          Model Layer                │
│       (calculator.js)               │
│  - Pure calculation logic           │
│  - No DOM dependencies              │
└─────────────────────────────────────┘
```

## Component Architecture

### 1. Calculator Logic (`js/calculator.js`)

**Responsibility:** Pure mathematical operations

**Design Pattern:** Module pattern with exported functions

**Key Features:**
- No side effects
- No DOM manipulation
- Fully testable in isolation
- Floating-point precision handling

**API:**
```javascript
Calculator.add(a, b) → number
Calculator.subtract(a, b) → number
Calculator.multiply(a, b) → number
Calculator.divide(a, b) → number (throws on division by zero)
Calculator.validateNumber(str) → boolean
```

### 2. UI Controller (`js/app.js`)

**Responsibility:** User interaction and state management

**Design Pattern:** Event-driven architecture

**State Object:**
```javascript
{
  currentInput: string,      // What's shown on display
  previousValue: number|null, // Stored value for operation
  operator: string|null,      // Current operator (+, -, *, /)
  shouldResetDisplay: boolean // Flag for next input behavior
}
```

**Key Functions:**
- `handleNumber(num)` - Process number input
- `handleOperator(op)` - Process operator, calculate intermediate results
- `handleEquals()` - Perform final calculation
- `handleClear()` - Reset state
- `handleDecimal()` - Add decimal point with validation
- `handleKeyboard(event)` - Process keyboard input
- `updateDisplay()` - Sync state to DOM

### 3. View Layer (`index.html` + `css/style.css`)

**Responsibility:** Presentation and layout

**Key Features:**
- Semantic HTML structure
- CSS Grid for button layout
- Responsive design with media queries
- Touch-friendly button sizes
- Accessibility support (focus states, keyboard navigation)

## Data Flow

### User Interaction Flow

```
User Action
    ↓
Event Listener (app.js)
    ↓
Update State
    ↓
Call Calculator Logic (if needed)
    ↓
Update State with Result
    ↓
Update Display (DOM)
```

### Example: Calculating 5 + 3

```
1. User clicks "5"
   → handleNumber('5')
   → state.currentInput = '5'
   → updateDisplay() → shows "5"

2. User clicks "+"
   → handleOperator('+')
   → state.previousValue = 5
   → state.operator = '+'
   → state.shouldResetDisplay = true

3. User clicks "3"
   → handleNumber('3')
   → state.currentInput = '3' (reset because shouldResetDisplay)
   → updateDisplay() → shows "3"

4. User clicks "="
   → handleEquals()
   → Calculator.add(5, 3)
   → result = 8
   → state.currentInput = '8'
   → state.operator = null
   → updateDisplay() → shows "8"
```

## Design Decisions

### 1. Immediate Execution Model

**Decision:** Calculate intermediate results when chaining operations

**Rationale:**
- More intuitive for simple calculators
- Matches traditional calculator behavior
- Simpler state management

**Example:**
```
Input: 5 + 3 + 2 =
Behavior: (5 + 3) + 2 = 8 + 2 = 10
```

### 2. Floating-Point Precision

**Decision:** Round all results to 10 decimal places

**Rationale:**
- Prevents JavaScript floating-point errors (0.1 + 0.2 = 0.30000000000000004)
- Keeps display clean
- Sufficient precision for typical calculations

**Implementation:**
```javascript
Number((a + b).toFixed(10))
```

### 3. Separation of Concerns

**Decision:** Pure calculation logic separate from UI

**Rationale:**
- Testability: Can unit test calculator logic without DOM
- Maintainability: Changes to UI don't affect logic
- Reusability: Calculator logic could be used elsewhere
- Debugging: Easier to isolate issues

### 4. Event-Driven Architecture

**Decision:** Event listeners for all user interactions

**Rationale:**
- Responds to both mouse and keyboard input
- Flexible and extensible
- Standard web development pattern

### 5. Single State Object

**Decision:** One centralized state object

**Rationale:**
- Single source of truth
- Easier to debug (inspect state object)
- Predictable state updates
- Simpler to reset

## Error Handling

### Division by Zero

```javascript
if (b === 0) {
  throw new Error('Division by zero');
}
```

Caught in UI layer and displayed as "Error"

### Invalid Input

Prevented at UI level:
- Multiple decimal points blocked
- Invalid operation sequences prevented

### Graceful Degradation

- If calculation fails, show "Error" and reset
- No crashes or undefined behavior

## Testing Architecture

### Unit Tests (`tests/calculator.test.js`)

**Coverage:** 100% of calculator.js

**Tests:**
- All operations with various inputs
- Edge cases (negative numbers, decimals, zero)
- Error conditions (division by zero)
- Input validation

### E2E Tests (`tests/e2e.spec.js`)

**Coverage:** Full user workflows

**Tests:**
- Page load and initial state
- All basic operations
- Operation chaining
- Keyboard input
- Error scenarios
- Button interactions
- Display updates

## Performance Considerations

### Optimizations

1. **Event Delegation:** Could be added for buttons (not needed at this scale)
2. **Debouncing:** Not needed - operations are instant
3. **Memoization:** Not applicable - no repeated calculations

### Scalability

Current architecture scales well for:
- Adding more operations (square root, percentage, etc.)
- Adding history/memory features
- Adding themes
- Adding advanced modes (scientific calculator)

## Future Enhancements

### Potential Features

1. **Operation History**
   - Store past calculations
   - Display in sidebar
   - Export as CSV

2. **Memory Functions**
   - M+, M-, MR, MC buttons
   - Store values for later

3. **Scientific Mode**
   - Trigonometric functions
   - Logarithms
   - Exponents

4. **Themes**
   - Dark/light mode
   - Custom color schemes

5. **Keyboard Customization**
   - Configurable shortcuts
   - Different keyboard layouts

### Architecture Changes for Enhancements

**For History:**
```javascript
state = {
  // ...existing
  history: []  // Array of {operation, result}
}
```

**For Memory:**
```javascript
state = {
  // ...existing
  memory: null  // Stored value
}
```

**For Scientific Mode:**
- Add `calculator-scientific.js` module
- Toggle between basic/scientific UI
- More complex operation handling

## Deployment Architecture

**Static Hosting:** GitHub Pages

**Build Process:** None (vanilla JS, no transpilation)

**Files Served:**
- index.html
- css/style.css
- js/calculator.js
- js/app.js

**No server required** - runs entirely in browser

## Security Considerations

### Input Validation

- All inputs validated before processing
- No eval() or dynamic code execution
- No user-provided strings executed

### XSS Prevention

- All display updates use `textContent` (not `innerHTML`)
- No user input rendered as HTML

### Dependencies

- Minimal dependencies (only for development/testing)
- No runtime dependencies
- No security vulnerabilities in dev dependencies
