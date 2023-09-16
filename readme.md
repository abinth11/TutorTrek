# E-Learning Platform: TypeScript | Javascript | React.js | Node.js | Express.js | Docker | Clean Architecture | MongoDb | Redis

The project is a comprehensive online learning platform that connects teachers and students. Teachers can upload courses, and students can access and watch them. The technology stack includes Node.js, Express, React, MongoDB, Mongoose, TypeScript, Redux, Tailwind CSS, and Redis Cache. The project follows the principles of clean architecture to ensure maintainability and scalability.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/abinth11/TutorTrek.git
   ```

2. Navigate to the project directory:

   ```shell
   cd TutorTrek
   ```
3. Navigate to client directory and server directory

   ```shell
   cd client
   cd server
   ```
  
4. Install the dependencies separately(install in both client and server)

   ```shell
   yarn install 
   ```

5. Set up the required environment variables. Rename the `.env.example` file to `.env` and provide the necessary values for your environment.

## Usage

1. Start the development server:

   -server side
   ```shell
   yarn run dev
   ```
   -client side
   ```shell
   yarn start 
   ```


2. Access the online learning platform through the provided URL in your web browser.

3. Sign up as a teacher or student to access the platform's features.

4. Teachers can upload courses, while students can browse and watch the available courses.

## Features

- Teacher and student registration and login
- Teacher dashboard to manage courses and track progress
- Student dashboard to browse and watch available courses
- Course upload and management for teachers
- Course browsing and playback for students
- Admin panel for managing users, courses, and system settings

## Architecture and Technologies

The project follows a client-server architecture, utilizing the following technologies:

- Backend:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - TypeScript
  - Redis for caching

- Frontend:
  - React
  - Redux for state management
  - Tailwind CSS for styling

## Folder Structure

Here's an overview of the main folders and their purposes in the project:

```
.
├── /client           # Frontend codebase
├── /server           # Backend codebase
└── /conf.d           # Nginx configuration for full stack application
```

For more detailed information, refer to the project's folder structure documentation [here](/docs/folder-structure.md).

## API Documentation

For detailed documentation on the available API endpoints and their usage, refer to the [API Documentation](/docs/api-documentation.md).

## Configuration

To configure the project, you need to set up the following environment variables:

- `PORT`: The port on which the server will run.
- `MONGODB_URI`: The URI for connecting to the MongoDB database.
- `REDIS_URL`: The URL for connecting

 to the Redis cache.
- ...

For a full list of required environment variables, refer to the project's configuration documentation [here](/docs/configuration.md).

## State Management (Redux)

The project utilizes Redux for state management. To understand how Redux is implemented and the available actions, reducers, and selectors, refer to the [Redux State Management Documentation](/docs/redux-state-management.md).

## Styling (Tailwind CSS)

Tailwind CSS is used for styling the frontend. To learn more about the styling conventions, utility classes, and customizations made in the project, refer to the [Tailwind CSS Styling Documentation](/docs/tailwind-styling.md).

## Caching (Redis)

Redis is used for caching in the project to improve performance. To understand how Redis caching is implemented and the areas of the application that are cached, refer to the [Redis Caching Documentation](/docs/redis-caching.md).

## Authentication (JWT) 

JSON Web Token (JWT) is an open standard for securely transmitting information between parties as a compact and self-contained token. It is commonly used for authentication and authorization purposes in web applications.

## Other third party libraries 

### Multer
Multer is a middleware for handling multipart/form-data, which is commonly used for file uploads in web applications. It integrates seamlessly with Express.js and provides a convenient way to handle file uploads, including processing file data and handling file storage on the server.

### Cloudinary
Cloudinary is a cloud-based media management platform that offers a range of services for handling images and videos in web applications. It provides features such as image and video upload, storage, transformation, optimization, and delivery. With Cloudinary, you can easily manage and manipulate media assets, as well as deliver them efficiently to your users.

### Helmet
Helmet is a middleware for securing Express.js applications by setting various HTTP headers related to security. It helps protect against common web vulnerabilities, such as cross-site scripting (XSS) attacks, cross-site request forgery (CSRF) attacks, and other security threats. Helmet makes it easy to configure and enable essential security headers for your Express.js application.

### Nodemailer
Nodemailer is a popular library for sending emails from Node.js applications. It provides a simple and straightforward way to send email messages using various email providers and protocols. Nodemailer supports features such as HTML content, attachments, SMTP authentication, and more, making it a reliable choice for sending emails programmatically.

### express-mongo-sanitize
express-mongo-sanitize is a middleware for Express.js that helps prevent MongoDB query injection attacks. It sanitizes user-supplied data by removing any keys that contain prohibited characters, such as the dollar sign ($), which is commonly used in MongoDB query operators. This middleware helps protect your application from malicious attempts to manipulate MongoDB queries.

### express-async-handler

express-async-handler is a utility library for handling asynchronous operations in Express.js middleware and route handlers. It simplifies error handling and enables you to write cleaner, more concise code by allowing you to use async/await syntax directly in your Express.js route handlers. This library helps streamline error handling and makes it easier to write asynchronous code in Express.js applications.


### react-oauth
react-oauth is a library that provides components and utilities for implementing OAuth (Open Authorization) authentication in React applications. OAuth is an open standard for authorization, allowing users to grant third-party applications access to their resources without sharing their credentials. react-oauth simplifies the integration of OAuth authentication flows, such as login with social media platforms like Google, Facebook, or Twitter, in React applications.

### yup
yup is a JavaScript schema validation library that allows you to define and validate data schemas in a simple and declarative way. It provides a fluent API for defining validation rules and supports a wide range of data types. yup is often used with form libraries to validate user input, ensuring that data meets the specified criteria before it is submitted or processed further.

### axios
axios is a popular JavaScript library for making HTTP requests from web browsers and Node.js. It provides a simple and intuitive API for performing various HTTP operations, such as sending GET, POST, PUT, and DELETE requests. axios supports features like request and response interception, request cancellation, and automatic handling of JSON data. It is widely used for handling network requests and interacting with APIs in client-side and server-side JavaScript applications.

### Formik
Formik is a form management library for React that simplifies the process of building complex forms and managing form state. It provides a set of React components and hooks to handle form rendering, validation, submission, and error handling. Formik integrates seamlessly with React's component model and offers features like form field validation, form-wide state management, input masking, and more. It aims to streamline the development of forms in React applications and reduce boilerplate code.

<!--## Deployment

To deploy the online learning platform to a production environment, follow the deployment guidelines outlined in the [Deployment Documentation](/docs/deployment.md).

## Contributing

Contributions to the project are welcome. To contribute, please follow the guidelines outlined in the [Contributing Documentation](/docs/contributing.md).
-->

## Contact

For any questions, feedback, or inquiries, please reach out to:

- Abin T H
  - Email: abinth250@example.com
  - LinkedIn: [linkedin-profile](https://www.linkedin.com/in/abin-th-170676245/)

## Design Files and API Documentation

* [Figma Design Files](https://www.figma.com/file/xSUUeK3lB9XHqBe3pg7pnM/TutorTrek?type=design&node-id=84%3A7156&t=uJ3S7XQV7OjJphmL-1)
* [Modules Specifications](https://drive.google.com/file/d/10aB7mVSsG_oG9V9wcK65orqcLoon2Dl4/view?usp=sharing)
* [API Documentation](https://documenter.getpostman.com/view/23308654/2s93mAVL88)
* [Database Design](https://drive.google.com/file/d/1N3YZ22s2cJnA1sSa5P5a-1ECzC70ztQu/view?usp=sharing)
* [Live Link](https://tutortrek.online/)


