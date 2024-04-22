import React, { useContext, useCallback } from 'react';

import { useStatsigExperiment } from './useStatsigExperiment';

interface FeatureFlagProviderProps {
  experiment: string;
}

/**
 * Leveraging the React context API store and provide the context for any feature flag that may
 * get added to the application so this could be a single source of truth for all feature flags
 * on the front end during runtime on a specific page.
 */

interface FeaturesContext {
  flags: Set<string>;
  enabledFlags: Set<string>;
  registerFeatureFlag: (experiment: string) => void;
}

const defaultFeatures = new Set<string>();


const FeaturesContext = React.createContext<
  ((experiment: string) => void) | undefined
>(undefined);

const FeatureProvider = ({
  children,
}: React.PropsWithChildren<FeatureFlagProviderProps>) => {
  const [featureState, setFeatureState] =
    React.useState<Set<string>>(defaultState);

  return (
    <FeaturesContext.Provider value={{}}>
      {children}
    </FeaturesContext.Provider>
  );
};

const Feature = ({
  children,
  experiment,
}: React.PropsWithChildren<FeatureFlagProviderProps>) => {
  const { registerFeatureFlag } = useContext(FeaturesContext);

  useCallback(() => {
    registerFeatureFlag(experiment);
  }, [experiment]);

  return <>{children}</>;
};

interface FeatureOnProps {
  variant: string;
  experiment?: string;
}

Feature.On = ({
  children,
  variant,
}: React.PropsWithChildren<FeatureOnProps>) => {
  if (variant !== 'my-variant') {
    return null;
  }
  return <>{children}</>;
};

Feature.Off = ({
  children,
  variant,
}: React.PropsWithChildren<FeatureOnProps>) => {
  if (variant === 'my-variant') {
    return null;
  }
  return <>{children}</>;
};

const Example = () => {
  return (
    <Feature experiment="example">
      <Feature.On variant="my-variant">
        <div>Example</div>
      </Feature.On>
      <Feature.Off variant="my-variant">
        <ExistingComponent />
      </Feature.Off>
    </Feature>
  );
};

const ExistingComponent = () => {
  return (
    <div>
      <Feature.On experiment="some-other-experiment" variant="other-variant">
        <div>Example</div>
      </Feature.On>
    </div>
  );
};
