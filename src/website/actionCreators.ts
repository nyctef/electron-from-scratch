import * as api from './api';
import { AppAction } from './appReducer';

const createWorkspaceAndLoadMigrations = async (
  dispatch: React.Dispatch<AppAction>,
  workspaceName: string
) => {
  try {
    dispatch({ type: 'WORKSPACE_CREATION_REQUESTED' });

    const workspaceResult = await api.createWorkspace({
      folderPath: '/c/workspaces/whatever',
      name: workspaceName
    });

    const workspaceId = workspaceResult.workspaceId;

    dispatch({
      type: 'WORKSPACE_CREATION_PROGRESS',
      progressMessage: 'fetching project list...'
    });

    const projects = await api.getProjectsFromWorkspace(workspaceId);

    dispatch({
      type: 'WORKSPACE_CREATION_PROGRESS',
      progressMessage: 'fetching migrations list...'
    });

    const migrations = await api.getMigrationsFromProject(
      workspaceResult.workspaceId,
      projects[0]
    );

    dispatch({ type: 'WORKSPACE_CREATION_COMPLETED', migrations });
  } catch (e) {
    console.error('Error creating workspace', e);
  }
};

export { createWorkspaceAndLoadMigrations };
