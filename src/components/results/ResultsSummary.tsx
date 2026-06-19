interface ResultsSummaryProps {
  flightCount: number;
  airlineCount: number;
}
export function ResultsSummary({ flightCount, airlineCount }: ResultsSummaryProps) {
  return (
    <p className="text-sm text-gray-600" role="status" aria-live="polite">
      <span className="font-bold text-gray-900">{flightCount} Available Flight{flightCount !== 1 ? 's' : ''}</span>
      {' '}from{' '}
      <span className="font-bold text-gray-900">{airlineCount} Airline{airlineCount !== 1 ? 's' : ''}</span>
    </p>
  );
}