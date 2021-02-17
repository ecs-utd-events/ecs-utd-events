﻿using System;
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

        public async Task<IEnumerable<TeamModel>> GetTeams()
        {
            Query query = _db.Collection("teams");
            QuerySnapshot snapshot = await query.GetSnapshotAsync();
            
            return snapshot.Documents
                .Select(document =>
                {
                    //return document.ConvertTo<TeamModel>();
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

        public async Task<string> CreateTeam(TeamModel value)
        {
            DocumentReference docRef = _db.Collection("teams").Document();
            Dictionary<string, object> team = new Dictionary<string, object>
            {
                {"city", value.City},
                {"team", value.Team}
            };
            await docRef.SetAsync(team);
            return docRef.Id;
        }

        public async void DeleteTeam(string id)
        {
            DocumentReference docRef = _db.Collection("teams").Document(id);
            await docRef.DeleteAsync();
        }
    }
}
