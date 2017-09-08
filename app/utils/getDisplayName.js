const getDisplayName = ComposedComponent =>
  ComposedComponent.displayName || ComposedComponent.name || 'Component';

export default getDisplayName;
