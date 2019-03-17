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

    public static class WorkspacesRepository
    {
        public static Dictionary<string, Workspace> Workspaces = new Dictionary<string, Workspace>();
    }

    [Route("api/v1/workspaces")]
    [ApiController]
    public class WorkspacesController : ControllerBase
    {


        [HttpGet("{id}")]
        public ActionResult<Workspace> Get(string id) => WorkspacesRepository.Workspaces[id];

        [HttpPost]
        public ActionResult<object> Post([FromBody] WorkspaceCreateRequest request)
        {
            var id = Guid.NewGuid().ToString();

            WorkspacesRepository.Workspaces[id] = new Workspace(
                request.Name,
                request.FolderPath,
                new Dictionary<string, Project> { { Guid.NewGuid().ToString(), new Project() } });

            Console.WriteLine($"Created workspace with id {id}");
            return new { workspaceId = id };
        }

        [HttpGet("{workspaceId}/projects")]
        public ActionResult<IEnumerable<string>> GetProjectIds(string workspaceId)
        {
            return WorkspacesRepository.Workspaces[workspaceId].Projects.Keys.Cast<string>().ToList();
        }

        [HttpGet("{workspaceId}/projects/{projectId}/migrations")]
        public ActionResult<IEnumerable<Migration>> GetMigrations(string workspaceId, string projectId)
        {
            return WorkspacesRepository.Workspaces[workspaceId].Projects[projectId].Migrations.ToList();
        }
    }
}
