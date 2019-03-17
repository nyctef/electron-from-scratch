// we could potentially swap this file out for a stub if we wanted to have a quick working website for testing

import { ipcRenderer } from 'electron';

const webserverDetails: Promise<{
  baseUri: string;
  authToken: string;
}> = new Promise(resolve => {
  // the parent electron process will start the SCA webserver and then tell us where it is
  console.log('Waiting for webserver-started event from electron process...');
  ipcRenderer.on('webserver-started', (event: any, webserverDetails: any) => {
    console.log('webserver started from electron process', webserverDetails);
    resolve(webserverDetails);
  });

  // send a ready event to prevent race conditions where the electron process sends details too quickly
  ipcRenderer.send('ready-for-webserver-started');
});

async function api<TIn, TOut>(
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: TIn
): Promise<TOut> {
  // todo: timeout / error-handling / etc for if the webserver doesn't start properly
  const wsd = await webserverDetails;

  const encodedBody = body && JSON.stringify(body);

  const response = await fetch(`${wsd.baseUri}api/v1/${endpoint}`, {
    method,
    body: encodedBody,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${wsd.authToken}`
    },
    mode: 'cors'
  });

  if (!response.ok) {
    throw new Error(`Request to ${endpoint} failed: ${response.statusText}`);
  }

  const responseContent = await response.json();

  console.info(`${endpoint} result: `, responseContent);

  return responseContent as TOut;
}

// TODO: look into generating this code from the swagger model

interface Workspace {
  name: string;
  folder: string;
  projects: Project[];
}

interface Project {
  migrations: Migration[];
}

interface Migration {
  filename: string;
}

interface WorkspaceCreateRequest {
  name: string;
  folderPath: string;
}

interface WorkspaceCreateResult {
  workspaceId: string;
}

const createWorkspace = (
  req: WorkspaceCreateRequest
): Promise<WorkspaceCreateResult> =>
  api<WorkspaceCreateRequest, WorkspaceCreateResult>('workspaces', 'POST', req);

const getProjectsFromWorkspace = (workspaceId: string): Promise<string[]> =>
  api<string, string[]>(`workspaces/${workspaceId}/projects`);

const getMigrationsFromProject = (
  workspaceId: string,
  projectId: string
): Promise<Migration[]> =>
  api<{}, Migration[]>(
    `workspaces/${workspaceId}/projects/${projectId}/migrations`
  );

export {
  createWorkspace,
  getProjectsFromWorkspace,
  getMigrationsFromProject,
  Migration
};
