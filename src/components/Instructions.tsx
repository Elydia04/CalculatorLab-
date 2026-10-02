const operations = [
  { symbol: '+', name: 'Addition', example: '5 + 3 = 8' },
  { symbol: '−', name: 'Subtraction', example: '9 − 4 = 5' },
  { symbol: '×', name: 'Multiplication', example: '6 × 7 = 42' },
  { symbol: '÷', name: 'Division', example: '10 ÷ 2 = 5' },
  { symbol: '%', name: 'Percentage', example: '50% = 0.5' },
  { symbol: '+/-', name: 'Negate', example: '5 → −5' },
]

const steps = [
  'Press number buttons (0–9) to enter a value.',
  'Press an operator (+, −, ×, ÷) to choose an operation.',
  'Enter the second number.',
  'Press = to see the result.',
  'Press AC to clear and start over.',
]

const keyboard = [
  { key: '0–9', action: 'Enter numbers' },
  { key: '. ', action: 'Decimal point' },
  { key: '+ − * /', action: 'Operators' },
  { key: 'Enter or =', action: 'Calculate' },
  { key: 'Esc or C', action: 'Clear' },
  { key: 'Backspace', action: 'Delete last digit' },
  { key: '%', action: 'Percentage' },
]

export default function Instructions() {
  return (
    <div className="w-72 sm:w-80 text-gray-300 flex flex-col gap-6">
      {/* How to use */}
      <div>
        <h2 className="text-orange-500 font-semibold text-base mb-3 uppercase tracking-widest">
          How to Use
        </h2>
        <ol className="flex flex-col gap-2">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="text-orange-500 font-bold min-w-[20px]">{i + 1}.</span>
              <span className="text-gray-400">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Supported operations */}
      <div>
        <h2 className="text-orange-500 font-semibold text-base mb-3 uppercase tracking-widest">
          Supported Operations
        </h2>
        <div className="flex flex-col gap-2">
          {operations.map((op) => (
            <div key={op.symbol} className="flex items-center gap-3 text-sm">
              <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-base shrink-0">
                {op.symbol}
              </span>
              <span className="text-gray-300 font-medium w-28">{op.name}</span>
              <span className="text-gray-500">{op.example}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard shortcuts */}
      <div>
        <h2 className="text-orange-500 font-semibold text-base mb-3 uppercase tracking-widest">
          Keyboard Shortcuts
        </h2>
        <div className="flex flex-col gap-2">
          {keyboard.map((k) => (
            <div key={k.key} className="flex items-center gap-3 text-sm">
              <kbd className="bg-gray-700 text-gray-200 px-2 py-0.5 rounded text-xs font-mono min-w-[80px] text-center">
                {k.key}
              </kbd>
              <span className="text-gray-400">{k.action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <p className="text-xs text-gray-600 border-t border-gray-800 pt-4">
        Dividing by zero will show an <span className="text-orange-500">Error</span>. Press AC or
        Esc to reset.
      </p>
    </div>
  )
}
