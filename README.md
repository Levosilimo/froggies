# Froggies
Welcome to Froggies, a fullstack web app game where users can enter their own CSS code to change the appearance of the website, moving frogs to their lily pads across different levels. This game is a recreation of [Flexbox Froggy](https://github.com/thomaspark/flexboxfroggy/) by [Thomas Park](https://github.com/thomaspark) using React, Express and MongoDB.


Froggies is a game that allows users to interact with the web design by manipulating CSS, directing frogs to their respective lily pads. The backend repo is [here](https://github.com/Levosilimo/rsclone-backend), while the frontend is live on [Netlify](https://froggies.netlify.app/). Additionally, the backend deployment is live [here](https://rsclone-backend.adaptable.app/).

## Frontend

### Frontend Features

- **Multilingual Support**: The game offers the ability to switch between four languages.
- **Modal Avatar Upload**: Implemented a modal dialog for drag-and-drop avatar uploads.
- **Routing Without Page Reloads**: Utilized routing without reloading the application pages.
- **User Customization Options**: Users can customize the application with three color themes, volume settings, and four languages.
- **Responsive Design**: The app is responsive and works seamlessly across various devices (phones, tablets, PCs).
- **User Settings**: Includes forms for changing username, authentication, and registration.
- **Syntax Highlighting**: Implemented syntax highlighting within the game.
- **Styles Encapsulation**: Utilized Shadow DOM for encapsulating user-entered styles.
- **Loader**: Included a loader for smooth transitions.
- **Redux for User Settings**: Utilized Redux for storing and managing user settings.
- **Statistics Display**: Includes view of user progress, and top player rankings within user profile.
- **Tooltips Implementation**: Tooltips have been implemented on the game page and user profiles.


### Technical Stack Highlights

- **Audio API Usage**: Utilized Audio API for sounds.
- **Webpack Integration**: Webpack has been used for bundling.
- **Local Storage Operations**: Incorporated local storage for saving and loading data.
- **TypeScript Implementation**: The application/game is fully written in TypeScript (Frontend/Backend).

## Backend

The backend is accessible [here](https://github.com/Levosilimo/rsclone-backend), and the deployment is [live](https://rsclone-backend.adaptable.app/).

- **JavaScript Stack Usage**: The backend utilizes a JavaScript stack: TS/Express/Node.js/MongoDB.

### Backend Features

- **REST API Usage**
- **Database Connectivity**: Utilizes database connections effectively.
- **ORM Implementation**: Uses ORM (mongoose).
- **Authentication & Authorization**
- **Username & Avatar Changes**
- **Data Visualization**: Displays statistics derived from backend data.
- **Node.js & Express Implementation**
- **Image Handling**: Handles avatar uploads.
- **Error Handling & Logging**: Provides clear error messages and readable logs.
- **Game Level Retrieval from Backend**
- **Username & Email Availability Checks**

For feature-specific information, refer to the [backend repository](https://github.com/Levosilimo/rsclone-backend).
