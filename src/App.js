import { useReducer } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import './App.css'
import ErrorFallback from './components/ErrorFallback'
import SearchComponent from './components/SearchComponent'
import { reducer, initialState } from './reduser'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => dispatch({ type: 'resetState' })}
      >
        <SearchComponent state={state} dispatch={dispatch} />
      </ErrorBoundary>
    </div>
  )
}

export default App
