// we could potentially swap this file out for a stub if we wanted to have a quick working website for testing

const baseUri = 'https://localhost:5001/';

async function api<TIn, TOut>(
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: TIn
): Promise<TOut> {
  const encodedBody = body && JSON.stringify(body);

  const response = await fetch(`${baseUri}api/v1/${endpoint}`, {
    method,
    body: encodedBody,
    headers: {
      'Content-Type': 'application/json'
      //   Authorization: `Bearer ${wsd.authToken}`
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
  id: string;
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
