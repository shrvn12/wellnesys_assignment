# wellnesys_assignment

1. Overview
    - This is documentation for wellnesys programming assignment
    - Basic API endpoint: `https://wellnesys-assignment-ftrr.onrender.com`
    - All requests must be secure i'e `https://`

2. Endpoints

    - View users
        - URL : `https://wellnesys-assignment-ftrr.onrender.com/users`
        - Method: `GET`
        - Parameters: None
        - Response: `{users data....}`

    - Add users
        - URL : `https://wellnesys-assignment-ftrr.onrender.com/users`
        - Method: `POST`
        - Parameters:

        ```
            {
                "name":String (required),
                "email": String (required),
                "password": String (required)
            }

        ```

        - Response: `{users data....}`

    - View Logs
        - URL : `https://wellnesys-assignment-ftrr.onrender.com/logs`
        - Method: `GET`
        - Parameters: None
        - Response: `{logs data....}`

3. Steps followed
    - Crated a setup for bulding the app
        - initialised backend project using NPM
        - Created respective folders
        - Installed required packages
    - Logger function
        - Declared a logger function to write all logs to a json server.
        - Created logs data using class & constructor function.
    - Wrote API's
        - Declared API methods
        - Wrote all logics required for functions.
        - Fetching and writing data to json server.
        - integrating loggers
    - Handling Invalid requests
        - Functions for checking invalid endpoints
        - Sending back appropriate response to user.

4. Challenges faced
    - Error when json file is unavailable/not created
        - This was solved by checking if json file is present and creating it if not present with appropriate content
    
    - Clumsy code due to complex logger function
        - This was solved by creating a simple looger function and invoking the function with proper data to log the information.

    - Server showing in-consistent logs in response
        - when user makes request for checking logs (`/logs`), the response does not includes the current request made for checking the logs.
        - This was fixed by adding current log data to the response and saving data at same time.
    
    - Write access blocked by the deployment server
        - Project is deployed on Render, which does not blocks write access

5. Learnings
    - Learnt Creating a well defined logger function
        - Logging all necesary info i'e date&time, user's IP address, response sent etc.
        - Creating a consistent logger function.
        - Saving data about the platform when server starts.

    - Better understanding read and write concepts.
        - reading and writing files in an efficient manner.
        - Creating readstreams for large data.
        - handling absence of data when using write function.

    - Read and write access on deployment server
        - Knowledge about permission to write files after deployment.
        - explored diffrent servers and their read write policies.
        - Learnt about temprory files on server which may give write access.

5. Deployments
    - The project is deployed on Render.
    - 👉🏻 <a href="https://wellnesys-assignment-ftrr.onrender.com" >Here</a> is the deployed link of the project.