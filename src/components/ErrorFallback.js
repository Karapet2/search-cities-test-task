import { Alert, Button } from 'react-bootstrap'

function ErrorFallback(props) {
  const { error, resetErrorBoundary } = props

  return (
    <Alert variant="danger" dismissible>
      <Alert.Heading>Something went wrong:</Alert.Heading>
      <p>{error.message}</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </Alert>
  )
}

export default ErrorFallback
