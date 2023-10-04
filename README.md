# Nancy Prototype - Learning Management System

<p align="center">
  <img alt="Nancy Prototype Logo" src="/assets/Nancy_Logo.png"/>
</p>

## Overview

Nancy Prototype is a robust Learning Management System (LMS) designed to enhance your learning experience through the integration of cutting-edge technologies. Leveraging Mediapipe, computer vision, and artificial intelligence powered by OpenAI, this system goes beyond traditional approaches to offer a more interactive and personalized learning journey.

## Features (Now)

-   **Cornell Notes CRUD:** Implement, read, update, and delete Cornell Notes directly within the system.

-   **Authentication:** Secure user authentication to protect user data and ensure a personalized learning experience.

## Features (Future)

-   **Mediapipe Integration:** Harness the power of Mediapipe for seamless video processing, enabling enhanced interactivity and engagement in learning materials.

-   **Computer Vision:** Utilize advanced computer vision techniques to create a visually immersive learning environment, making complex concepts more accessible.

-   **OpenAI Integration:** Tap into the capabilities of OpenAI to incorporate artificial intelligence-driven features, allowing for adaptive learning experiences tailored to individual needs.

-   **Personalized Learning:** Benefit from AI algorithms that analyze user interactions and adapt content delivery, ensuring a customized learning path for each user.

# Technologies:

## What is the MERN stack?

MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

-   MongoDB — document database
-   Express(.js) — Node.js web framework
-   React(.js) — a client-side JavaScript framework
-   Node(.js) — the premier JavaScript web server

Express and Node make up the middle (application) tier. Express.js is a server-side web framework, and Node.js is the popular and powerful JavaScript server platform.

-   **React.js**: React is a JavaScript library (not a framework) for building interactive user interfaces. It utilizes a component-based approach for creating web applications.

-   **Mongo**: MongoDB is a document-oriented NoSQL database that stores data in JSON BSON format and is known for its scalability and schema flexibility.

-   **Node**: Node.js is a server-side JavaScript execution environment that allows the development of scalable and highly concurrent applications. It uses the Google Chrome V8 engine to run JavaScript code.

-   **Express.js**: Express.js is a minimalist web framework for Node.js that simplifies the creation of web applications and APIs. It provides essential features for handling routes, middleware, and HTTP requests.

## Framework MVC Introduction

Nancy Prototype is built on the Model-View-Controller (MVC) framework, a powerful architectural pattern that separates an application into three interconnected components. The **Model** (Mongo) represents the data and business logic, the **View** (React) handles the user interface, and the **Controller** (Express/Node) manages user input and interaction. This structure promotes modular development, making it easier to maintain and scale the application.

<p align="center">
  <img alt="Nancy Prototype Logo" src="/assets/mern-stack.png"/>
</p>

> Explication

In this project, following the MVC architecture with the MERN stack, it's quite evident that we use MongoDB as our database. **MongoDB** stores the models _("User" and "Note")_, currently mapped to code through Mongoose, the library we use as an ORM to connect to MongoDB. The database exclusively interacts with **controllers** _("notesController" and "authController")_, implemented as functions in **Node.js**. These functions are invoked by the **Express** backend framework, which, in turn, is triggered by routes coming from the **client**. The client interacts through a **graphical interface** built with _React_ ("HomePage, "LoginPage", "NoteFormPage", etc.). It's crucial to note that React cannot directly access MongoDB, and MongoDB cannot send data to the client without passing through the controllers, in accordance with the MVC architecture.

For clarity and organizational purposes, in the project, models and controllers have been separated into the "server" folder, while views are located in the "client" folder.

## Getting Started

Follow these steps to get started with Nancy Prototype:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/WashingtonYandun/Nancy_Prototype.git
    ```

2. **Run the following commands:**

    ```bash
    npm i
    npm run dev
    cd client/
    npm i
    npm run dev
    ```

## License

This project is licensed under the CC0 1.0 Universal (CC0 1.0) License
