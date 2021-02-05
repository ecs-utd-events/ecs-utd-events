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
    public class TeamsController : ControllerBase
    {
        private readonly IFirestoreService _firestoreService;

        public TeamsController(IFirestoreService firestoreService)
        {
            _firestoreService = firestoreService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<string>), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        [ProducesResponseType(500)]
        public ActionResult<List<TeamModel>> Get()
        {
            Console.WriteLine("Made get request");
            var teams = _firestoreService.GetTeams();
            return teams.ToList();
        }

        [HttpPost]
        public string Post([FromBody] TeamModel teamModel)
        {
            return _firestoreService.CreateTeam(teamModel);
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _firestoreService.DeleteTeam(id);
        }
    }
}
