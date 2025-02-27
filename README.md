- [Setup Instructions](#setup-instructions)
- [AWS](#aws)
  - [S3](#s3)
  - [Amplify](#amplify)
    - [Local development instructions](#local-development-instructions)
    - [Amplify Misc commands](#amplify-misc-commands)

# Setup Instructions

# AWS

## S3

## Amplify

### Local development instructions

- Create backend for amplify using the command
  ```
   npm create amplify@latest
  ```
- Create auth and data models in resource file
- Create sandbox and it will generate the amplify_outputs.json or download it from the Aws amplify page
- Use the file to configure Amplify in frontend and use the Authenicator from amplify-react-ui
- Generate create forms for models using amplify

### Amplify Misc commands

- Create command
  - `npx ampx sandbox --profile default`
- Command for generating form
  - `npx ampx generate forms`
