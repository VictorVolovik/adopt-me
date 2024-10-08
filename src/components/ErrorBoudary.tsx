// @see https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component<{
  children: ReactNode;
  errorComponent: ReactNode;
}> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      const { errorComponent } = this.props;

      return errorComponent ? (
        errorComponent
      ) : (
        <h2 className="error">
          There was an error. <Link to="/">Click here</Link> to back to the home
          page.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
