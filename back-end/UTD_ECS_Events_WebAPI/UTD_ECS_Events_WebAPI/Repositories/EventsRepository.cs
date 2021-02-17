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
            /*
             * var credential = GoogleCredential
                .FromFile(Path.Combine(AppContext.BaseDirectory + "/google.json"));
            var channelCredentials = credential.ToChannelCredentials();
            var channel = new Channel(FirestoreClient.DefaultEndpoint.ToString(), channelCredentials);
            var firestoreClient = FirestoreClient.Create(channel);
            */
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
                    ;
                    var dictionary = document.ToDictionary();
                    return new EventModel
                    {
                        Id = document.Id,
                        Title = dictionary["Title"].ToString(),
                        Location = dictionary["Location"].ToString(),
                        Link = dictionary["Link"].ToString(),
                        StartTime = ((Timestamp)dictionary["StartTime"]).ToDateTime(),
                        EndTime = ((Timestamp)dictionary["EndTime"]).ToDateTime()
                    };
                })
                .ToList();
        }

        public async Task<string> CreateEvent(EventModel value)
        {
            DocumentReference docRef = _db.Collection("events").Document();
            Dictionary<string, object> team = new Dictionary<string, object>
            {
                {"Title", value.Title},
                {"Location", value.Location},
                {"Link", value.Link },
                {"StartTime", value.StartTime },
                {"EndTime", value.EndTime }
            };
            await docRef.SetAsync(team);
            return docRef.Id;
        }

        public async void DeleteEvent(string id)
        {
            DocumentReference docRef = _db.Collection("events").Document(id);
            await docRef.DeleteAsync();
        }
    }
}

