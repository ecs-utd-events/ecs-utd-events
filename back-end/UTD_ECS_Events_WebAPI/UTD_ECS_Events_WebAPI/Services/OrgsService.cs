using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UTD_ECS_Events_WebAPI.Models;
using UTD_ECS_Events_WebAPI.Repositories;

namespace UTD_ECS_Events_WebAPI.Services
{
    public class OrgsService : IOrgsService
    {
        private readonly IOrgsRepository _orgsRepository;

        public OrgsService(IOrgsRepository orgsRepository)
        {
            _orgsRepository = orgsRepository;
        }

        public IEnumerable<OrgModel> GetOrgs()
        {
            return _orgsRepository.GetOrgs().Result;
        }

        public string CreateOrg(OrgModel orgModel)
        {
            return _orgsRepository.CreateOrg(orgModel).Result;
        }

        public void DeleteOrg(string id)
        {
            _orgsRepository.DeleteOrg(id);
        }
    }
}

