using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.StubBackend;

namespace server.Controllers
{
    [Route("api/workspaces")]
    [ApiController]
    public class WorkspacesController : ControllerBase
    {
        private Dictionary<string, Workspace> _workspaces = new Dictionary<string, Workspace>();

        [HttpGet]
        public ActionResult<Dictionary<string, Workspace>> Get() => _workspaces;

        [HttpGet("{id}")]
        public ActionResult<Workspace> Get(string id) => _workspaces[id];

        [HttpPost]
        public ActionResult<string> Post([FromBody] Workspace value)
        {
            var id = Guid.NewGuid().ToString();
            _workspaces[id] = value;
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
