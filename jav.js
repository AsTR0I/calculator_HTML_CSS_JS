let runningTotal = 0 // нарастающая сумма
let buffer = '0' // буфер
let previousOperator // предыдущий оператор

const screen = document.querySelector('.screen')

function buttonClick(value) {
  // isNaN() определяет является ли литерал или переменная нечисловым значением(NaN) или нет.
  if (isNaN(value)) {
    handleSymbol(value)
  } else {
    handleNumber(value)
  }
  screen.innerText = buffer
}

function handleSymbol(symbol) {
  //Инструкция switch сравнивает выражение со случаями, перечисленными внутри неё, а затем выполняет соответствующие
  switch (symbol) {
    case 'C':
      buffer = '0'
      runningTotal = 0
      break
    case '=':
      if (previousOperator === null) {
        return
      }
      // промывка операции
      //  Функция parseInt преобразует первый переданный ей аргумент в строковый тип, интерпретирует его и возвращает целое число или значение NaN .
      flushOperation(parseInt(buffer))
      previousOperator = null
      buffer = runningTotal
      runningTotal = 0
      break
    case '←':
      if (buffer.length === 1) {
        buffer = '0'
      } else {
        buffer = buffer.substring(0, buffer.length - 1)
      }
      break
    case '+':
    case '−':
    case '×':
    case '÷':
      handleMath(symbol)
      break
  }
}

function handleMath(symbol) {
  if (buffer === '0') {
    return
  }

  const intBuffer = parseInt(buffer)

  if (runningTotal === 0) {
    runningTotal = intBuffer
  } else {
    flushOperation(intBuffer)
  }
  previousOperator = symbol
  buffer = '0'
}

function flushOperation(intBuffer) {
  if (previousOperator === '+') {
    runningTotal += intBuffer
  } else if (previousOperator === '−') {
    runningTotal -= intBuffer
  } else if (previousOperator === '×') {
    runningTotal *= intBuffer
  } else if (previousOperator === '÷') {
    runningTotal /= intBuffer
  }
}

function handleNumber(numberString) {
  if (buffer === '0') {
    buffer = numberString
  } else {
    buffer += numberString
  }
}

function init() {
  document
    .querySelector('.calc-buttons')
    .addEventListener('click', function (event) {
      // Свойство target интерфейса Event является ссылкой на объект, который был инициатором события. Он отличается от Event.
      buttonClick(event.target.innerText)
    })
}

init()
