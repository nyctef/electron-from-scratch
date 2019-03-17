import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style/index.scss';
import {
  Emphasis,
  Centered,
  Button,
  GrayBox,
  FormField,
  TextInput
} from './components';
import * as api from './api';
import { useState } from 'react';
import { appReducer, initialState, AppState, AppAction } from './appReducer';
import { createWorkspaceAndLoadMigrations } from './actionCreators';

const app = document.getElementById('app');

const WorkspaceInputPage: React.FunctionComponent<{
  onSubmit: (workspaceName: string) => void;
}> = props => {
  const [workspaceName, setWorkspaceName] = useState<string>('');

  return (
    <>
      <FormField>
        <TextInput
          label="Workspace name"
          value={workspaceName}
          onValueChange={newValue => setWorkspaceName(newValue)}
        />
      </FormField>
      <FormField>
        <Button
          primary
          disabled={!workspaceName}
          onClick={() => props.onSubmit(workspaceName)}
        >
          Load workspace
        </Button>
      </FormField>
    </>
  );
};

const MigrationsDisplayPage: React.FunctionComponent<{
  migrations: api.Migration[];
}> = props => (
  <>
    <h3>Migrations:</h3>
    {props.migrations.map((m, i) => (
      <p key={i}>File: {m.filename}</p>
    ))}
  </>
);

const WorkspaceProgressPage: React.FunctionComponent<{
  message: string;
}> = props => (
  <>
    <h3>Creating workspace:</h3>
    {props.message}
  </>
);

const AppContents: React.FunctionComponent = props => {
  const [appState, dispatch] = React.useReducer(appReducer, initialState);

  switch (appState.page) {
    case 'INPUT_WORKSPACE':
      return (
        <WorkspaceInputPage
          onSubmit={name => createWorkspaceAndLoadMigrations(dispatch, name)}
        />
      );
    case 'WAITING_FOR_WORKSPACE':
      return <WorkspaceProgressPage message={appState.progressMessage} />;
    case 'DISPLAY_MIGRATIONS':
      return <MigrationsDisplayPage migrations={appState.migrations} />;
  }
};

const App = () => {
  return (
    <Centered>
      <GrayBox width={400}>
        <AppContents />
      </GrayBox>
    </Centered>
  );
};

ReactDOM.render(<App />, app);
