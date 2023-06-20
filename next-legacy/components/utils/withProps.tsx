import React from 'react';

export default function withProps<F, R>(fixedProps: F) {
  return function(Component: React.ComponentType<F & R>) {
    const NewComponent = (remainingProps: R) => <Component {...fixedProps} {...remainingProps} />;
    NewComponent.displayName = `WithProps(${Component.displayName})`;
    return NewComponent;
  }
}
