using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;

namespace UTD_ECS_Events_WebAPI.Models
{
    [FirestoreData]
    public class EventModel
    {
        [FirestoreDocumentId]
        public string Id { get; set; }
        [FirestoreProperty]
        public string Title { get; set; }
        [FirestoreProperty]
        public string Location { get; set; }
        [FirestoreProperty]
        public string Link { get; set; }
        [FirestoreProperty]
        public DateTime StartTime { get; set; }
        [FirestoreProperty]
        public DateTime EndTime { get; set; }
        [FirestoreProperty]
        public string Description { get; set; }
        [FirestoreProperty]
        public List<string> Orgs { get; set; }
        [FirestoreProperty]
        public DateTime LastUpdated { get; set; }
    }
}
