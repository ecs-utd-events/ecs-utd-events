using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UTD_ECS_Events_WebAPI.Models;

namespace UTD_ECS_Events_WebAPI.Services
{
    public interface IEventsService
    {
        IEnumerable<EventModel> GetEvents();
        string CreateEvent(EventModel teamModel);
        void DeleteEvent(string id);
    }
}

