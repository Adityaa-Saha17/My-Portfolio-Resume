import { Component, type ReactNode } from 'react';

/** Keeps a failing WebGL effect (no GPU, lost context) from taking the page down with it. */
export default class Safe extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn('Visual effect disabled:', error);
  }
  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
