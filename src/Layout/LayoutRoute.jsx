import React from 'react';
import { useTranslation } from 'react-i18next';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Separate component for the error UI to use hooks
const ErrorFallback = ({ error }) => {
  const { t } = useTranslation();

  return (
    <div className="error-boundary">
      <h2>{t('errors.somethingWentWrong', 'Something went wrong')}</h2>
      <p>{t('errors.tryAgainLater', 'Please try again later')}</p>
      <button
        onClick={() => window.location.reload()}
        className="error-boundary__button"
      >
        {t('errors.refresh', 'Refresh page')}
      </button>
      <details>
        <summary>{t('errors.details', 'Error details')}</summary>
        <pre>{error?.toString()}</pre>
      </details>
    </div>
  );
};

export default ErrorBoundary;
