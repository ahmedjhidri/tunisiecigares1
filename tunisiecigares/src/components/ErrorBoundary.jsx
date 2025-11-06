// src/components/ErrorBoundary.jsx
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // In production, you could send this to an error reporting service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });

    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ebony flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="card p-8 text-center">
              <AlertTriangle className="w-16 h-16 text-error mx-auto mb-4" />
              
              <h1 className="title-gold text-3xl mb-4">Something Went Wrong</h1>
              
              <p className="text-white/80 mb-6">
                We're sorry, but something unexpected happened. Our team has been notified.
              </p>

              {import.meta.env.DEV && this.state.error && (
                <div className="mb-6 p-4 bg-cocoa/30 rounded-lg text-left">
                  <p className="text-error text-sm font-mono mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="text-white/60 text-xs">
                      <summary className="cursor-pointer mb-2">Stack Trace</summary>
                      <pre className="overflow-auto max-h-40">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="btn-primary flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
                
                <Link
                  to="/"
                  className="btn-secondary flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
              </div>

              <p className="text-white/50 text-sm mt-6">
                If this problem persists, please contact us via{' '}
                <a
                  href="https://m.me/100093202210414"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold hover:underline"
                >
                  Messenger
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

