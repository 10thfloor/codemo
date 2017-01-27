import { setDefaults } from 'react-komposer';
import { store } from '../imports/redux/store';

export function getReduxLoader(mapper) {
  return (props, onData, env) => {
    // Accessing the reduxStore via the env.
    return env.reduxStore.subscribe((state) => {
      onData(null, mapper(state, env));
    });
  };
}

export const composeWithReduxStore = setDefaults({
  env: {
    reduxStore: store,
  },
});
