using System.Collections.Generic;

namespace server.StubBackend
{
    public class Workspace
    {
        public Workspace(Dictionary<string, Project> projects)
        {
            Projects = projects;
        }

        public Dictionary<string, Project> Projects { get; }
    }

    public class Project
    {

    }
}