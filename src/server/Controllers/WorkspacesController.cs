using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.StubBackend;

namespace server.Controllers
{
    public class WorkspaceCreateRequest
    {
        public WorkspaceCreateRequest(string folderPath, string name)
        {
            FolderPath = folderPath;
            Name = name;
        }

        public string FolderPath { get; }
        public string Name { get; }
    }

    [Route("api/v1/workspaces")]
    [ApiController]
    public class WorkspacesController : ControllerBase
    {
        private Dictionary<string, Workspace> _workspaces = new Dictionary<string, Workspace>();

        [HttpGet("{id}")]
        public ActionResult<Workspace> Get(string id) => _workspaces[id];

        [HttpPost]
        public ActionResult<string> Post([FromBody] WorkspaceCreateRequest request)
        {
            var id = Guid.NewGuid().ToString();
            _workspaces[id] = new Workspace(
                request.Name,
                request.FolderPath,
                new Dictionary<string, Project> { { Guid.NewGuid().ToString(), new Project() } });
            return id;
        }

        [HttpGet("{workspaceId}/projects")]
        public ActionResult<IEnumerable<string>> GetProjectIds(string workspaceId)
        {
            return _workspaces[workspaceId].Projects.Values.Cast<string>().ToList();
        }

        [HttpGet("{workspaceId}/projects/{projectId}/migrations")]
        public ActionResult<IEnumerable<Migration>> GetMigrations(string workspaceId, string projectId)
        {
            return _workspaces[workspaceId].Projects[projectId].Migrations.ToList();
        }
    }
}
