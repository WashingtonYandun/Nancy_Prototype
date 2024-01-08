# Nancy - Learning Management System

<p align="center">
  <img alt="Nancy Logo" src="/docs/images/Nancy_Logo.png"  width="300" height="300"/>
</p>

## Overview

Nancy is a robust Learning Management System (LMS) designed to enhance your learning experience through the integration of cutting-edge technologies. Leveraging Mediapipe, computer vision, and artificial intelligence powered by OpenAI, this system goes beyond traditional approaches to offer a more interactive and personalized learning journey.

## Features

-   **Computer Vision:** Utilize advanced computer vision techniques to create a visually immersive learning environment, making complex concepts more accessible.

-   **Personalized Learning:** Benefit from AI algorithms that analyze user interactions and adapt content delivery, ensuring a customized learning path for each user based on his or her emotional interaction with the content.

# Technologies:

## What is the MERN stack?

MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

-   MongoDB - document database
-   Express(.js) - Node.js web framework
-   React(.js) - a client-side JavaScript framework
-   Node(.js) - the premier JavaScript web server

Express and Node make up the middle (application) tier. Express.js is a server-side web framework, and Node.js is the popular and powerful JavaScript server platform.

-   [**React.js**](https://reactjs.org/): React is a JavaScript library (not a framework) for building interactive user interfaces. It employs a component-based approach to create web applications.

-   [**Mongo**](https://www.mongodb.com): MongoDB is a document-oriented NoSQL database that stores data in JSON BSON format and is known for its scalability and schema flexibility.

-   [**Node**](https://nodejs.org/en): Node.js is a server-side JavaScript execution environment that enables the development of scalable and highly concurrent applications. It uses the Google Chrome V8 engine to run JavaScript code.

-   [**Express.js**](https://expressjs.com): Express.js is a minimalist web framework for Node.js that simplifies the creation of web applications and APIs. It provides essential functions for handling routes, middleware, and HTTP requests.

## Framework MVC Introduction

Nancy is built on the Model-View-Controller (MVC) framework, a powerful architectural pattern that separates an application into three interconnected components. The **Model** (Mongo) represents the data and business logic, the **View** (React.js) handles the user interface, and the **Controller** (Express.js/Node.js) manages user input and interaction. This structure promotes modular development, making it easier to maintain and scale the application.

<p align="center">
  <img alt="MVC Architecture MERN" src="/docs/images/mern-stack.png" width="328" height="221" />
</p>

## Explication

-   In this project, following the MVC architecture with the MERN stack, it's quite evident that we use MongoDB as our database. **MongoDB** stores the models _("User" and "Note")_, currently mapped to code through Mongoose, the library we use as an ORM to connect to MongoDB.

-   The database exclusively interacts with **controllers** _("notesController" and "authController")_, implemented as functions in **Node.js**. These functions are invoked by the **Express** backend framework, which, in turn, is triggered by routes coming from the **client**.

-   The client interacts through a **graphical interface** built with **React.js** _("HomePage, "LoginPage", "NoteFormPage", etc.)_. It's crucial to note that React cannot directly access MongoDB, and MongoDB cannot send data to the client without passing through the controllers, in accordance with the MVC architecture.

-   For clarity and organizational purposes, in the project, models and controllers have been separated into the **"server"** folder, while views are located in the **"client"** folder.

## Requirements

Before setting up and running Nancy Prototype, ensure that your system meets the following requirements:

-   **Node.js**: Nancy uses Node.js for `server-side scripting`. Ensure that you have Node.js installed.
-   **MongoDB**: MongoDB is used as the `database` for Nancy. Install MongoDB on your system.

## Getting Started

Follow these steps to get started with Nancy:

1. **Clone the Repository and go to the destination folder:**

    ```bash
    git clone https://github.com/WashingtonYandun/Nancy_Prototype.git
    ```

2. **Run the following commands in the corresponding folder:**

-   This in the root folder

    ```bash
    npm i
    npm run dev
    ```

-   This in the root folder too

    ```bash
    cd client/
    npm i
    npm run dev
    ```

## License

This project is licensed under the CC0 1.0 Universal (CC0 1.0) License

## More documentation

-   [Authentication](/docs/auth/README.md)
-   [Admin](/docs/admin/README.md)
-   [Core](/docs/core/README.md)
-   [Def](/docs//new_feat/README.md)
