using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UTD_ECS_Events_WebAPI.Models;
using UTD_ECS_Events_WebAPI.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UTD_ECS_Events_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrgsController : ControllerBase
    {
        private readonly IOrgsService _orgsService;
        public OrgsController(IOrgsService orgsService)
        {
            _orgsService = orgsService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<string>), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        [ProducesResponseType(500)]
        public ActionResult<List<OrgModel>> Get()
        {
            var events = _orgsService.GetOrgs();
            return events.ToList();
        }

        [HttpPost]
        public string Post([FromBody] OrgModel orgModel)
        {
            return _orgsService.CreateOrg(orgModel);
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _orgsService.DeleteOrg(id);
        }
    }
}
