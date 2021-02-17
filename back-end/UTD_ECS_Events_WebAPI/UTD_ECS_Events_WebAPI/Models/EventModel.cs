using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UTD_ECS_Events_WebAPI.Models
{
    public class EventModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        public string Link { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
