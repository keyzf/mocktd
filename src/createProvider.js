import { createProviderAndConnect, createStore } from 'react-state-pro';
import modules from './modules/index';
const store = createStore(modules);
const context = createProviderAndConnect(store);
const connect = context.connect;
const Provider = context.Provider;
export { connect, Provider };