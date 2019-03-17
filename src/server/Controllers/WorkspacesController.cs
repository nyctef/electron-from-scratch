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
        public ActionResult<Dictionary<string, Project>> GetProjects(string workspaceId)
        {
            return _workspaces[workspaceId].Projects;
        }
    }
}
