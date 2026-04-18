export default function ResultCard({ result }) {
  if (!result) return null;

  if (result.error) {
    return (
      <div className="result error">
        <h3>⚠️ Error</h3>
        <p>{result.error}</p>
      </div>
    );
  }

  const isHighRisk = result.prediction === 'High Risk';

  return (
    <div className={`result ${isHighRisk ? 'high' : 'low'}`}>
      <div className="result-icon">{isHighRisk ? '⚠️' : '✅'}</div>
      <h2>{result.prediction}</h2>
      <p>Probability: <strong>{(result.probability * 100).toFixed(1)}%</strong></p>
      <p>{result.message}</p>
      <p className="disclaimer">
        ⚕️ This is not a medical diagnosis. Consult a healthcare professional.
      </p>
    </div>
  );
}