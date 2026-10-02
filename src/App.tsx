import Calculator from './components/Calculator'
import Instructions from './components/Instructions'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-12 gap-12">
      {/* Calculator */}
      <Calculator />

      {/* Divider */}
      <div className="w-72 sm:w-80 border-t border-gray-800" />

      {/* Instructions */}
      <Instructions />
    </div>
  )
}
