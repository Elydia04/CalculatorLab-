import Calculator from './components/Calculator'
import Instructions from './components/Instructions'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
      {/* On mobile: stack vertically (calculator on top, instructions below)
          On lg+: side by side with instructions on the left */}
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-center gap-10 w-full max-w-4xl">
        
        {/* Instructions — left side on desktop, bottom on mobile */}
        <div className="w-full max-w-xs lg:max-w-sm lg:pt-4">
          <Instructions />
        </div>

        {/* Vertical divider on desktop, horizontal on mobile */}
        <div className="hidden lg:block w-px bg-gray-800 self-stretch" />
        <div className="lg:hidden w-72 sm:w-80 border-t border-gray-800" />

        {/* Calculator — right side on desktop, top on mobile */}
        <div className="flex justify-center">
          <Calculator />
        </div>

      </div>
    </div>
  )
}
