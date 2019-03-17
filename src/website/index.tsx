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
    try {
      const workspaceResult = await api.createWorkspace({
        folderPath: '/c/workspaces/whatever',
        name: workspaceName
      });

      const workspaceId = workspaceResult.workspaceId;
      console.log({ workspaceId });

      const projects = await api.getProjectsFromWorkspace(workspaceId);
      console.log({ projects });
      const migrations = await api.getMigrationsFromProject(
        workspaceResult.workspaceId,
        projects[0]
      );
      console.log({ migrations });

      setMigrations(migrations);
    } catch (e) {
      console.error('Error creating workspace', e);
    }
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
