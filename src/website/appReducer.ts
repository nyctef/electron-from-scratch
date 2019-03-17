import * as api from './api';

type AppState =
  | {
      page: 'INPUT_WORKSPACE';
    }
  | {
      page: 'WAITING_FOR_WORKSPACE';
      progressMessage: string;
    }
  | {
      page: 'DISPLAY_MIGRATIONS';
      migrations: api.Migration[];
    };

type AppAction =
  | { type: 'WORKSPACE_CREATION_REQUESTED' }
  | { type: 'WORKSPACE_CREATION_PROGRESS'; progressMessage: string }
  | { type: 'WORKSPACE_CREATION_COMPLETED'; migrations: api.Migration[] };

const appReducer = (prevState: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'WORKSPACE_CREATION_REQUESTED':
      return {
        page: 'WAITING_FOR_WORKSPACE',
        progressMessage: 'Requesting workspace creation...'
      };
    case 'WORKSPACE_CREATION_PROGRESS':
      return {
        page: 'WAITING_FOR_WORKSPACE',
        progressMessage: action.progressMessage
      };
    case 'WORKSPACE_CREATION_COMPLETED':
      return {
        page: 'DISPLAY_MIGRATIONS',
        migrations: action.migrations
      };
  }

  return prevState;
};

const initialState: AppState = { page: 'INPUT_WORKSPACE' };

export { AppState, AppAction, appReducer, initialState };
