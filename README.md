# OnlineAddressBook

This project is an Online Address Book implemented using HTML, CSS, Bootstrap CSS, EJS, Node.js, and Express. It allows users to manage their contacts and addresses in a web-based interface.

## Features

- **Add Contact**: Add new contacts with details such as name, email, phone number, and address.
- **Update Contact**: Update existing contact details.
- **View Contacts**: View a list of all contacts with their details.
- **Delete Contact**: Delete a contact from the address book.
- **Responsive Design**: The address book is responsive and works well on various screen sizes.
- **User Authentication**: Secure login system for administrators to manage the address book.
- **Session Management**: User sessions with a 10-minute timeout.

## Technologies Used

- HTML
- CSS (Bootstrap)
- EJS (Embedded JavaScript)
- Node.js
- Express

## Usage

To use this Online Address Book, follow these steps:

1. Clone the repository: `git clone https://github.com/jehanzaib084/OnlineAddressBook`
2. Navigate to the project directory: `cd your-project-directory`
3. Install dependencies using npm: `npm install`
4. Start the server: `node server.js`

This will install all the dependencies listed in the `package.json` file and generate the `node_modules` directory.

## User Authentication

The application includes a basic authentication system for administrators. Only authenticated users can add, update, and delete contacts. The login session expires after 10 minutes of inactivity.

### Default Admin Credentials

- **Username**: admin
- **Password**: admin123

## Contributors

- [Jehanzaib084](https://github.com/jehanzaib084)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Screenshots

<p align="center">
  <img src="/screenshots/StartPage.png" alt="Start Page" />
  <img src="/screenshots/HomePage.png" alt="Home Page"/>
  <img src="/screenshots/UserDetailsPage.png" alt="User Details Page"/>
  <img src="/screenshots/UpdateUserPage.png" alt="Update User Page"/>
  <img src="/screenshots/AddUserPage.png" alt="Add New User Page"/>
</p>
