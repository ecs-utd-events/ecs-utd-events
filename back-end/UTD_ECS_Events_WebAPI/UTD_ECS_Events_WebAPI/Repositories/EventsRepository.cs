using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
using Grpc.Auth;
using Grpc.Core;
using Serilog;
using UTD_ECS_Events_WebAPI.Models;
using System.Threading.Tasks;

namespace UTD_ECS_Events_WebAPI.Repositories
{
    public class EventsRepository : IEventsRepository
    {
        private const string PROJECT_ID = "utdecsevents-9bed0";
        private readonly FirestoreDb _db;

        public EventsRepository()
        {
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", Path.Combine(AppContext.BaseDirectory + "/google.json"));
            _db = FirestoreDb.Create(PROJECT_ID);
            Log.Logger.Information("Created Firestore connection");
        }

        public async Task<IEnumerable<EventModel>> GetEvents()
        {
            Query query = _db.Collection("events");
            QuerySnapshot snapshot = await query.GetSnapshotAsync();

            return snapshot.Documents
                .Select(document =>
                {
                    return document.ConvertTo<EventModel>();
                })
                .ToList();
        }

        public async Task<EventModel> GetSingleEvent(string id)
        {
            DocumentReference docRef = _db.Collection("events").Document(id);
            DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
            if (snapshot.Exists)
            {
                return snapshot.ConvertTo<EventModel>();
            }
            else
            {
                throw new ArgumentException("Document with this id does not exist: " + id);
            }
        }

        public async Task<string> CreateEvent(EventModel myEvent)
        {
            DocumentReference docRef = _db.Collection("events").Document();
            myEvent.StartTime = myEvent.StartTime.ToUniversalTime();
            myEvent.EndTime = myEvent.EndTime.ToUniversalTime();
            myEvent.LastUpdated = myEvent.LastUpdated.ToUniversalTime();
            await docRef.SetAsync(myEvent);
            return docRef.Id;
        }

        public async void DeleteEvent(string id)
        {
            DocumentReference docRef = _db.Collection("events").Document(id);
            await docRef.DeleteAsync();
        }
    }
}

