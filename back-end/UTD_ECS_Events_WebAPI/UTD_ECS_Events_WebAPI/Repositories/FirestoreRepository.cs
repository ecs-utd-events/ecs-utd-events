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

namespace UTD_ECS_Events_WebAPI.Repositories
{
    public class FirestoreRepository : IFirestoreRepository
    {
        private const string PROJECT_ID = "utdecsevents-9bed0";
        private readonly FirestoreDb _db;

        public FirestoreRepository()
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

        public IEnumerable<TeamModel> GetTeams()
        {
            var usersRef = _db.Collection("teams");
            var snapshot = usersRef.GetSnapshotAsync().Result;

            return snapshot.Documents
                .Select(document =>
                {
                    ;
                    var dictionary = document.ToDictionary();
                    return new TeamModel
                    {
                        Id = document.Id,
                        Team = dictionary["team"].ToString(),
                        City = dictionary["city"].ToString()
                    };
                })
                .ToList();
        }

        public string CreateTeam(TeamModel value)
        {
            var docRef = _db.Collection("teams").Document();
            var team = new Dictionary<string, object>
            {
                {"city", value.City},
                {"team", value.Team}
            };
            var result = docRef.SetAsync(team).Result;
            return docRef.Id;
        }

        public void DeleteTeam(string id)
        {
            var docRef = _db.Collection("teams").Document(id);
            var result = docRef.DeleteAsync().Result;
        }
    }
}
