using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// firebase
using FirebaseAdmin.Auth;

namespace UTD_ECS_Events_WebAPI.Auth
{
    public class Registration
    {
        internal static async Task CreateUserAsync()
        {
            // [START create_user]
            UserRecordArgs args = new UserRecordArgs()
            {
                Email = "user@example.com",
                Password = "secretPassword",
                DisplayName = "John Doe",
                Disabled = false,
            };
            UserRecord userRecord = await FirebaseAuth.DefaultInstance.CreateUserAsync(args);
            // See the UserRecord reference doc for the contents of userRecord.
            Console.WriteLine($"Successfully created new user: {userRecord.Uid}");
            // [END create_user]
        }
    }
}
