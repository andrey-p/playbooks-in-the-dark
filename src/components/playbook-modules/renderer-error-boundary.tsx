import { Component, ReactNode } from 'react';
import { isZodErrorLike, fromError } from 'zod-validation-error';

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

class RendererErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    const { error } = this.state;

    if (!error) {
      return this.props.children;
    }

    if (isZodErrorLike(error)) {
      // rethrow as a validation error, with formatted message
      // this will either be displayed by the editor page
      // or the system tests
      const validationError = fromError(this.state.error);
      throw validationError;
    } else {
      // anything else is either already a Validation error
      // or an uncaught application error
      // - either way it's good to just rethrow as it is
      throw error;
    }
  }
}

export default RendererErrorBoundary;
