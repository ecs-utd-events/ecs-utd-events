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
        EventModel GetSingleEvent(string id);
        string CreateEvent(EventModel eventModel);
        void DeleteEvent(string id);
    }
}

