- [Service Request Portal](#service-request-portal)
  - [Features](#features)
  - [Live Demo](#live-demo)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Local Development](#local-development)
  - [Design Decisions and Trade-offs](#design-decisions-and-trade-offs)
  - [Challenges and Learnings](#challenges-and-learnings)
  - [Future Issues / Improvements](#future-issues--improvements)
  - [Miscellaneous](#miscellaneous)

# Service Request Portal

This project is a web application built with React and AWS Amplify that includes user authentication, S3 file management, and a service request system with data stored in DynamoDB.

## Features

- User authentication with AWS Cognito
- Dashboard for viewing and managing service requests
- File browser for accessing files stored in S3
- Dynamic form for creating service requests

## Live Demo

You can access the live site at: [Service Portal](https://deploy.d1ph28uy6927s5.amplifyapp.com/)

Login credentials:

- Email: rakeshkota19@gmail.com
- Password: Qwerty@123

## Setup Instructions

### Prerequisites

- Node.js
- npm
- AWS Cli
- AWS account with appropriate permissions
- Git

### Local Development

1. Clone the repository: https://github.com/rakeshkota19/data-foundry-app
2. Install all dependencies : npm install
3. Install Amplify: npm create amplify@latest -y
4. Setup AWS profile : aws configure sso
5. Create a sandbox env : npx ampx sandbox --profile default-name
6. Sanbox will generate the amplify_outputs file
7. We can also generate create/update modal forms using - npx ampx generate forms
8. copy amplify_outputs.json to src folder
9. Start the app: npm start

## Design Decisions and Trade-offs

- Material UI vs. Custom CSS -
  I chose Material UI for the UI components to provide a consistent, professional look while maintaining good development speed
- Single Page Application (SPA) -
  The application is built as a SPA to provide a seamless user experience. This approach reduces server load and provides faster transitions between pages, though it requires proper state management and routing.
- Modal Form vs. Separate Page -
  Service request form is implemented as a modal dialog rather than a separate page to keep the user within the context of their current task.
- State management-
  I used React's Context API for global states like login authentication info and theme. For other component-level states, I utilized React's built-in useState and useEffect hooks. Implementing a complex state management solution like Redux would have been overkill for this application's requirements, given the relatively simple state interactions.
- S3 File Access Control -
  I designed the storage structure with two folders in S3:  
  auth-images/: For authenticated users only
  images/: For all users (including guests)

  While I didn't get time to fully implement this separation in the UI, the proper access controls have been defined at the S3 bucket level using IAM policies. This approach allows for granular control over file access based on authentication status.

## Challenges and Learnings

- Configuration File Issues -
  A significant amount of time was spent dealing with the Amplify configuration process. The React restriction on importing files from outside the src/ directory caused issues with the generated amplify_outputs.json file. The AWS Amplify documentation wasn't entirely clear on the best practices for handling this in a Create React App environment.
  The solution involved copying the file into the src/ directory during the build process, which required additional build configuration.
- Amplify -
  This is my first time using Amplify extensively, so I occasionally spent time debugging issues encountered while dealing with models and storage. I have learned how to build a small scale full-stack application through this project.

## Future Issues / Improvements

- Add test cases
- Complete implementation of file access controls based on authentication status
- Implement search and filtering for service requests
- Add file upload functionality
- Menu header should be mobile responsive
- Add/Enable DAX for caching to improve performance
- XSS Prevention: All user inputs are properly sanitized before being stored or displayed to prevent cross-site scripting attacks.
- Cache the S3 files

## Miscellaneous

- I didnot use the Amplify modal forms which are stored in ui-components folder.I have created custom create form component
