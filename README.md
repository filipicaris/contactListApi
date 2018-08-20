# contactListApi
A simple contact list API with user management

## Requirements

1. Set the config environments on the config folder.

2. Have an applications so you can work with the APIs listed in this document

## Storage

1. It's necessary to use at least one instance of MongoDB and one instance of Firebase. It is needed to set the serviceAccountKey with your personal information acquired from your dashboard on Firebase website.

## APIs

### User

- Create new User: (POST) */user/register*

It is necessary to create a user the following parameters: **name**, **email** and **password**. The password is encrypted using the crypto framework. The user is stored on a Non relationship database (MongoDB). 

The result from this entrypoint is the user created, with the ID (**_id**) from that user.

### Login

- Login: (POST) */login*

For this entrypoint is needed only two parameters: **email** and **password**. 

The result from this entrypoint is the token (Json Web Token) needed for authentication on some API from this document.
The **token** needs to be used on the Authentication header of the request, followed by the word **Bearer**.

### Contacts 

- Create new contact: (POST) */api/contact*

**Require Authentication:** This entrypoint can create on a Firebase real-time database a contact, and it's needed the following parameters: **name**, **email** and **phone**.

The result is the contact created with is following id (**_id**).
