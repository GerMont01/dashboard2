# System Analyzer

Analyzes the server on which the app is running and displays some useful information like achitecture, cpu model, cpu usage, RAM, diskspace, etc.
This app handles 2 user levels: admin and users. Admin can register new users and define which data can be seen.

### Clone app and install all dependencies

git clone https://github.com/GerMont01/dashboard2.git

git install

### `npm start`

Builds and Runs the app.
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### Login

Authentication developed with express-session module and cookies

![login](https://user-images.githubusercontent.com/77022076/138199559-eef918f4-8c4d-4c26-a32e-33fff55de4b9.PNG)

#### To test it as admin login with the following credentials:

User Id: admin </br>
Password: "anypassword"

First password entered will be stored and used for future logins

![admin dashboard](https://user-images.githubusercontent.com/77022076/138199204-d0ed09dc-3671-4968-b1b3-918a20491a5f.PNG)

Admin is able to select which boxes will be seen by users and can register new users

#### To test a user:

Logged in as admin register a new user, providing the new User ID with a password, then logout, and login as the new user created.

You will be able to see only the boxes selected by the admin.

![user dashboard](https://user-images.githubusercontent.com/77022076/138199714-5cfb8a9c-3221-426b-93a8-eaf2760f6662.PNG)
