# Admin Role Functionality - README

## Overview

This README provides an explanation of the admin role functionalities in the authentication and video management system. The system is built using Node.js, Express, MongoDB, and React, incorporating JWT for authentication.

## Backend (Node.js, Express, MongoDB)

### Controllers (admin.controller.js)

#### User State Modification

-   **Change User Status:**
    -   Allows the admin to modify the status of a user (e.g. make admin).
    -   Validates the request and updates the user status in the database.

#### Video Management

-   **Upload Video:**
    -   Enables the admin to upload new videos from youtube urls.
    -   Validates the video details and saves them in the database.

### Middleware (admin.middleware.js)

#### Admin Authentication Middleware

-   **Admin Authentication:**
    -   Verifies if the user has admin privileges (role).
    -   Grants access to admin-specific routes if authenticated.

## Frontend (React)

### Admin Dashboard (AdminDashboard.js)

-   Provides a user interface for admin-specific actions (delete users, make users admin, upload videos)

## API Requests

### Admin Requests (adminRequests.js)

-   Utilizes functions (changeUserStatusRequest, uploadVideoRequest) to make HTTP requests to the backend for admin-specific operations.

## Activity Diagram

<p align="center">
  <img alt="Auth class diagram" src="/docs/admin/admin_activity.png" />
</p>

### Admin Activity Diagram

Admin activity diagram explaining the flow of admin actions:

-   **Change User Status:**

    -   Admin visits the user management page.
    -   Initiates a status change for a specific user.
    -   Sends a request to the server.
    -   Server validates and updates the user status.

-   **Upload Video:**
    -   Admin accesses the video upload page.
    -   Completes the video upload form.
    -   Sends a request to the server for video upload.
    -   Server validates and saves the video details.

This flow ensures secure and efficient processes for admin-specific functionalities.
