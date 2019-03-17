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

const app = document.getElementById('app');

const App = () => {
  const [migrations, setMigrations] = useState<api.Migration[] | null>(null);
  const [workspaceName, setWorkspaceName] = useState<string>('');

  const createWorkspaceAndLoadMigrations = async () => {
    const workspaceResult = await api.createWorkspace({
      folderPath: '/c/workspaces/whatever',
      name: workspaceName
    });

    const workspaceId = workspaceResult.id;

    const projects = await api.getProjectsFromWorkspace(workspaceId);
    const migrations = await api.getMigrationsFromProject(
      workspaceResult.id,
      projects[0]
    );

    setMigrations(migrations);
  };

  return (
    <Centered>
      <GrayBox width={400}>
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
            onClick={() => createWorkspaceAndLoadMigrations()}
          >
            Load workspace
          </Button>
        </FormField>
      </GrayBox>
    </Centered>
  );
};

ReactDOM.render(<App />, app);
