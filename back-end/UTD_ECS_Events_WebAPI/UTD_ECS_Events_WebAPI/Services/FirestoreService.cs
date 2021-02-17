using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UTD_ECS_Events_WebAPI.Models;
using UTD_ECS_Events_WebAPI.Repositories;

namespace UTD_ECS_Events_WebAPI.Services
{
    public class FirestoreService : IFirestoreService
    {
        private readonly IFirestoreRepository _firestoreRepository;

        public FirestoreService(IFirestoreRepository firestoreRepository)
        {
            _firestoreRepository = firestoreRepository;
        }

        public IEnumerable<TeamModel> GetTeams()
        {
            return _firestoreRepository.GetTeams().Result;
        }

        public string CreateTeam(TeamModel teamModel)
        {
            return _firestoreRepository.CreateTeam(teamModel).Result;
        }

        public void DeleteTeam(string id)
        {
            _firestoreRepository.DeleteTeam(id);
        }
    }
}
