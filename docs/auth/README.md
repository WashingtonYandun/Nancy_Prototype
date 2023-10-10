### Authentication System - Explanation

#### Backend (Node.js, Express, MongoDB)

##### Controllers (auth.controller.js)

-   **Registration (`register`):**

    -   Checks if the email is already in use.
    -   Hashes the password.
    -   Creates and saves a new user in the database.
    -   Generates an access token and stores it in a cookie.

-   **Login (`login`):**

    -   Searches for the user by email.
    -   Compares the provided password with the hashed password in the database.
    -   If credentials are correct, generates an access token and stores it in a cookie.

-   **Token Verification (`verifyToken`):**

    -   Verifies the validity of the token stored in the cookie.
    -   If the token is valid, returns the user details.

-   **Logout (`logout`):**
    -   Deletes the cookie containing the token.

##### Middleware (auth.middleware.js)

-   **Authentication Middleware (`auth`):**
    -   Checks if there is a token in the cookie.
    -   If the token is valid, allows access to protected routes.

---

#### Frontend (React)

##### Registration (Register.js)

-   Uses the authentication context (`useAuth`) to manage registration.
-   Utilizes `react-hook-form` for form validation.
-   Redirects the user to the notes page after registration.

##### Login (LoginPage.js)

-   Uses the authentication context (`useAuth`) to manage login.
-   Utilizes `react-hook-form` for form validation.
-   Redirects the user to the notes page after login.

##### Authentication Context (AuthContext.js)

-   Defines a React context to manage authentication state.
-   Provides functions for signup, signin, signout, and checking authentication status.

##### API Requests

-   Uses functions (`registerRequest`, `loginRequest`, `verifyTokenRequest`) to make HTTP requests to the backend.

### Activity Diagram

<p align="center">
  <img alt="Auth activity diagram" src="/docs/auth/img/auth_activity.png" />
</p>

#### Activity Diagram Explanation

1. **Registration:**

    - The user visits the registration page.
    - Completes the registration form.
    - Client-side validation ensures email uniqueness.
    - If data is valid, a registration request is sent to the server.
    - The server validates the data and registers the user in the database.

2. **Login:**

    - The user visits the login page.
    - Completes the login form.
    - If data is valid, a login request is sent to the server.
    - The server authenticates the user and generates an access token.

3. **Token Verification:**

    - The user visits a protected page.
    - Checks for the existence of the authentication token.
    - If the token exists, a verification request is sent to the server.
    - The server verifies the token and allows access if it is valid.

4. **Logout:**
    - The user performs a logout action.
    - The authentication token stored in the cookie is removed.

This flow ensures a secure and efficient process for registration, login, and route protection in the application.

---

### Class Diagram explanation

<p align="center">
  <img alt="Auth class diagram" src="/docs//auth/img/auth_class.png" />
</p>

#### Activity Diagram Explanation

> I have to change to functions to a class. Perhaps this diagram folloes the current and future behavior of the authentication

1. **User Model (user.model.js)**

-   Defines the user data schema for MongoDB.

2. **JWT (jwt.js)**

-   Contains functions for creating JWT tokens.

3. **AuthMiddleware (auth.middleware.js)**

-   Verify the token.

4. **AuthController (auth.controller.js)**

-   Logic of the authentication system.
