using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UTD_ECS_Events_WebAPI.Models;

namespace UTD_ECS_Events_WebAPI.Repositories
{
    public interface IOrgsRepository
    {
        Task<IEnumerable<OrgModel>> GetOrgs();
        Task<string> CreateOrg(OrgModel orgModel);
        void DeleteOrg(string id);
    }
}

