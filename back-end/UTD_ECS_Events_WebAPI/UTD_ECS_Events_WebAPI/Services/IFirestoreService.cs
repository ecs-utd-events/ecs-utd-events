using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UTD_ECS_Events_WebAPI.Models;

namespace UTD_ECS_Events_WebAPI.Services
{
    public interface IFirestoreService
    {
        IEnumerable<TeamModel> GetTeams();
        string CreateTeam(TeamModel teamModel);
        void DeleteTeam(string id);
    }
}
