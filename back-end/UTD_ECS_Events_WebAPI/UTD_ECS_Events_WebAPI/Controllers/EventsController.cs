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
    public class EventsController : ControllerBase
    {
        private readonly IEventsService _eventsService;

        public EventsController(IEventsService eventsService)
        {
            _eventsService = eventsService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<string>), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        [ProducesResponseType(500)]
        public ActionResult<List<EventModel>> Get()
        {
            var events = _eventsService.GetEvents();
            return events.ToList();
        }

        [HttpPost]
        public string Post([FromBody] EventModel eventModel)
        {
            return _eventsService.CreateEvent(eventModel);
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _eventsService.DeleteEvent(id);
        }
    }
}
