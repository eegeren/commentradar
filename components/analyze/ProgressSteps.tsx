import { Check, Loader2 } from 'lucide-react'

type StepStatus = 'pending' | 'active' | 'complete' | 'error'

interface Step {
  label: string
  description: string
  status: StepStatus
}

interface ProgressStepsProps {
  steps: Step[]
}

export default function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 border transition-all duration-500 ${
              step.status === 'complete'
                ? 'bg-indigo-500 border-indigo-500'
                : step.status === 'active'
                ? 'bg-indigo-500/20 border-indigo-500'
                : step.status === 'error'
                ? 'bg-red-500/20 border-red-500'
                : 'bg-white/5 border-white/10'
            }`}
          >
            {step.status === 'complete' && <Check className="w-4 h-4 text-white" />}
            {step.status === 'active' && (
              <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
            )}
            {(step.status === 'pending' || step.status === 'error') && (
              <span
                className={`text-xs font-mono font-medium ${
                  step.status === 'error' ? 'text-red-400' : 'text-white/30'
                }`}
              >
                {index + 1}
              </span>
            )}
          </div>

          {/* Text */}
          <div className="pb-4 flex-1">
            <p
              className={`font-medium text-sm transition-colors duration-300 ${
                step.status === 'active'
                  ? 'text-white'
                  : step.status === 'complete'
                  ? 'text-white/60'
                  : step.status === 'error'
                  ? 'text-red-400'
                  : 'text-white/20'
              }`}
            >
              {step.label}
            </p>
            <p
              className={`text-xs mt-0.5 transition-colors duration-300 ${
                step.status === 'active'
                  ? 'text-white/50'
                  : step.status === 'complete'
                  ? 'text-white/30'
                  : 'text-white/15'
              }`}
            >
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export type { Step, StepStatus }
