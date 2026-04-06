let current = '0';
let _rawExpr = '';
let _dispExpr = '';
let justCalc = false;

const symbols = { '*': '×', '/': '÷', '+': '+', '-': '−', '%': '%' };

function updateDisplay() {
  const displayEl = document.getElementById('display');
  const exprEl = document.getElementById('expr');
  displayEl.textContent =
    current.length > 12 ? parseFloat(current).toExponential(4) : current;
  exprEl.textContent = _dispExpr;
}

function inputNum(n) {
  if (justCalc) {
    current = n;
    _rawExpr = '';
    _dispExpr = '';
    justCalc = false;
  } else if (current === '0') {
    current = n;
  } else if (current.length < 12) {
    current += n;
  }
  updateDisplay();
}

function inputDot() {
  if (justCalc) {
    current = '0.';
    _rawExpr = '';
    _dispExpr = '';
    justCalc = false;
  } else if (!current.includes('.')) {
    current += '.';
  }
  updateDisplay();
}

function inputOp(op) {
  justCalc = false;
  const sym = symbols[op] || op;

  if (_rawExpr === '') {
    _rawExpr = current;
    _dispExpr = current;
  } else {
    _rawExpr += current;
    _dispExpr += current;
  }

  _rawExpr += op;
  _dispExpr += ' ' + sym + ' ';
  current = '0';
  updateDisplay();
}

function calculate() {
  if (_rawExpr === '' && current === '0') return;

  const fullRaw = _rawExpr + current;
  const fullDisp = _dispExpr + current;

  try {
    let result = Function('"use strict"; return (' + fullRaw + ')')();
    if (!isFinite(result)) {
      current = 'Error';
    } else {
      result = parseFloat(result.toFixed(10));
      current = String(result);
    }
    _dispExpr = fullDisp + ' =';
  } catch (e) {
    current = 'Error';
    _dispExpr = 'Oops!';
  }

  _rawExpr = '';
  justCalc = true;
  updateDisplay();
}

function clearAll() {
  current = '0';
  _rawExpr = '';
  _dispExpr = '';
  justCalc = false;
  updateDisplay();
}

function backspace() {
  if (justCalc || current === 'Error') {
    clearAll();
    return;
  }
  current = current.length > 1 ? current.slice(0, -1) : '0';
  updateDisplay();
}
