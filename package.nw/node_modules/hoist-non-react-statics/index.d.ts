declare module 'hoist-non-react-statics' {
  import * as React from 'react';
  export default function hoistNonReactStatics<Own, Custom>(
    TargetComponent: React.ComponentType<Own>,
    SourceComponent: React.ComponentType<Own & Custom>,
    customStatic?: any): React.ComponentType<Own>;
}
