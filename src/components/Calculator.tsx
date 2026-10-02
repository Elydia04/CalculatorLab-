import { useCallback, useEffect, useState } from 'react'

type ButtonType = 'number' | 'operator' | 'equals' | 'clear' | 'special'

interface CalcButton {
  label: string
  value: string
  type: ButtonType
  wide?: boolean
}

const BUTTONS: CalcButton[] = [
  { label: 'AC', value: 'AC', type: 'clear' },
  { label: '+/-', value: 'negate', type: 'special' },
  { label: '%', value: '%', type: 'special' },
  { label: '÷', value: '/', type: 'operator' },
  { label: '7', value: '7', type: 'number' },
  { label: '8', value: '8', type: 'number' },
  { label: '9', value: '9', type: 'number' },
  { label: '×', value: '*', type: 'operator' },
  { label: '4', value: '4', type: 'number' },
  { label: '5', value: '5', type: 'number' },
  { label: '6', value: '6', type: 'number' },
  { label: '−', value: '-', type: 'operator' },
  { label: '1', value: '1', type: 'number' },
  { label: '2', value: '2', type: 'number' },
  { label: '3', value: '3', type: 'number' },
  { label: '+', value: '+', type: 'operator' },
  { label: '0', value: '0', type: 'number', wide: true },
  { label: '.', value: '.', type: 'number' },
  { label: '=', value: '=', type: 'equals' },
]

const buttonClass = (type: ButtonType, wide?: boolean): string => {
  const base =
    'flex items-center justify-center rounded-full text-xl font-medium cursor-pointer select-none transition-all duration-100 active:scale-95 h-16'
  const wide_ = wide ? 'col-span-2 justify-start pl-6' : ''

  switch (type) {
    case 'clear':
      return `${base} ${wide_} bg-gray-400 text-black hover:bg-gray-300`
    case 'special':
      return `${base} ${wide_} bg-gray-400 text-black hover:bg-gray-300`
    case 'operator':
      return `${base} ${wide_} bg-orange-500 text-white hover:bg-orange-400`
    case 'equals':
      return `${base} ${wide_} bg-orange-500 text-white hover:bg-orange-400`
    case 'number':
    default:
      return `${base} ${wide_} bg-gray-700 text-white hover:bg-gray-600`
  }
}

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecond, setWaitingForSecond] = useState(false)
  const [expression, setExpression] = useState('')

  const calculate = useCallback(
    (a: number, op: string, b: number): number | string => {
      switch (op) {
        case '+':
          return a + b
        case '-':
          return a - b
        case '*':
          return a * b
        case '/':
          if (b === 0) return 'Error'
          return a / b
        default:
          return b
      }
    },
    []
  )

  const handleNumber = useCallback(
    (value: string) => {
      if (waitingForSecond) {
        setDisplay(value === '.' ? '0.' : value)
        setWaitingForSecond(false)
        return
      }
      if (value === '.') {
        if (display.includes('.')) return
        setDisplay(display + '.')
        return
      }
      setDisplay(display === '0' ? value : display + value)
    },
    [display, waitingForSecond]
  )

  const handleOperator = useCallback(
    (value: string) => {
      const current = parseFloat(display)

      if (firstOperand !== null && !waitingForSecond) {
        const result = calculate(firstOperand, operator!, current)
        if (result === 'Error') {
          setDisplay('Error')
          setFirstOperand(null)
          setOperator(null)
          setExpression('')
          setWaitingForSecond(false)
          return
        }
        const formatted = parseFloat((result as number).toPrecision(10)).toString()
        setDisplay(formatted)
        setFirstOperand(result as number)
        setExpression(`${formatted} ${value === '/' ? '÷' : value === '*' ? '×' : value === '-' ? '−' : value}`)
      } else {
        setFirstOperand(current)
        setExpression(
          `${current} ${value === '/' ? '÷' : value === '*' ? '×' : value === '-' ? '−' : value}`
        )
      }

      setOperator(value)
      setWaitingForSecond(true)
    },
    [display, firstOperand, operator, waitingForSecond, calculate]
  )

  const handleEquals = useCallback(() => {
    if (firstOperand === null || operator === null) return
    const current = parseFloat(display)
    const result = calculate(firstOperand, operator, current)

    if (result === 'Error') {
      setDisplay('Error')
    } else {
      const formatted = parseFloat((result as number).toPrecision(10)).toString()
      setDisplay(formatted)
    }

    setExpression('')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecond(false)
  }, [display, firstOperand, operator, calculate])

  const handleClear = useCallback(() => {
    setDisplay('0')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecond(false)
    setExpression('')
  }, [])

  const handleNegate = useCallback(() => {
    if (display === '0' || display === 'Error') return
    setDisplay((parseFloat(display) * -1).toString())
  }, [display])

  const handlePercent = useCallback(() => {
    if (display === 'Error') return
    setDisplay((parseFloat(display) / 100).toString())
  }, [display])

  const handleInput = useCallback(
    (value: string) => {
      if (display === 'Error' && value !== 'AC') {
        handleClear()
        return
      }
      if ('0123456789.'.includes(value)) {
        handleNumber(value)
      } else if (['+', '-', '*', '/'].includes(value)) {
        handleOperator(value)
      } else if (value === '=') {
        handleEquals()
      } else if (value === 'AC') {
        handleClear()
      } else if (value === 'negate') {
        handleNegate()
      } else if (value === '%') {
        handlePercent()
      }
    },
    [display, handleNumber, handleOperator, handleEquals, handleClear, handleNegate, handlePercent]
  )

  // Keyboard support
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ('0123456789.'.includes(e.key)) {
        handleInput(e.key)
      } else if (e.key === '+') {
        handleInput('+')
      } else if (e.key === '-') {
        handleInput('-')
      } else if (e.key === '*') {
        handleInput('*')
      } else if (e.key === '/') {
        e.preventDefault()
        handleInput('/')
      } else if (e.key === 'Enter' || e.key === '=') {
        handleInput('=')
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handleInput('AC')
      } else if (e.key === 'Backspace') {
        // backspace: remove last character
        setDisplay((prev) => {
          if (prev === 'Error' || prev.length === 1) return '0'
          return prev.slice(0, -1)
        })
      } else if (e.key === '%') {
        handleInput('%')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleInput])

  const displayText =
    display.length > 12 ? parseFloat(parseFloat(display).toExponential(4)).toString() : display

  return (
    <div className="w-72 sm:w-80 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 bg-black">
      {/* Display */}
      <div className="px-5 pt-8 pb-4 flex flex-col items-end gap-1">
        <span className="text-gray-500 text-sm h-5 truncate w-full text-right">{expression}</span>
        <span
          className={`text-white font-light tracking-tight w-full text-right truncate ${
            displayText.length > 9 ? 'text-3xl' : 'text-5xl'
          }`}
        >
          {displayText}
        </span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3 p-4">
        {BUTTONS.map((btn) => (
          <button
            key={btn.value}
            onClick={() => handleInput(btn.value)}
            className={buttonClass(btn.type, btn.wide)}
            style={btn.wide ? { gridColumn: 'span 2' } : {}}
            aria-label={btn.label}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}
