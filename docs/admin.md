# Administrative

This documentation is meant to be used by the maintainers of the ecs-utdevents, i.e. the people who have access to the `utdecsevents@gmail.com` account.

## Adding an organization
1. Navigate to Firebase console.
2. Go to the ecs-utdevents project.
3. Using the left-hand sidebar, navigate to **Authentication**.
4. Select **Add user**. You’ll be prompted to enter a Email and Password for the user. Use the Organization Email for the Email and a randomly generated string for the password.

    !!! note 
        We will not give nor store this string anywhere and the org will be directed to reset the password before being able to login.
        We used lastpass password generator and 99-length strings for security reasons.
        If an org gave the wrong email, simply delete the organization and create a new one.

5. After creating the user, copy the respective User UID from the Users table.
6. Navigate to Firestore Database using the left-hand sidebar.
7. Here we are going to add a document to the organizations collection
    * Choose **organizations** in the leftmost column
    * Select **Add document**
    * For Document ID paste the User UID you copied from the Authentication section.
    * For fields add the following. **Note that capitalization and spelling are very important and all fields MUST be added!** 
        * `Name`* [string]
        * `ShortName`* [string]
        * `Website`* [string]
        * `Description`* [string]
        * `UId`** [string]
        * `Slug`*** [string]
        * `ImageUrl` [string]
        * `SocialMedia` [map]
        * `discord` [string]
        * `facebook` [string]
        * `groupme` [string]
        * `instagram` [string]
        * `linkedIn` [string]
        * `snapchat` [string]
            * *These fields are required and should be filled in with info from the Org Sign up form.
            * **`UId` this is the User UID copied from Authentication, we store it both in the document and as the document ID.
            * ***`Slug` is a required field that we don’t get from the Org Sign up form. The default slug should just be the name of the organization in all lower case with dashes instead of space (i.e. `“Women Who Compute”` => ``“women-who-compute”``)

!!! note
    The `ImageUrl` and all the `SocialMedia` subfields are left empty since organizations are not required to submit them at time of application. However, it is still important to create these fields for organizations to be able to add them on their profile page!

You’re all done creating a new Org User for the website!
Now you can email the organization point of contact and the organization itself with instructions on how to get started! There’s a template inside the ecsutdevents gmail account that we use for Organization Approvals.
