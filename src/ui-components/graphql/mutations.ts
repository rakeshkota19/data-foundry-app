/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createServiceRequest = /* GraphQL */ `
  mutation CreateServiceRequest(
    $condition: ModelServiceRequestConditionInput
    $input: CreateServiceRequestInput!
  ) {
    createServiceRequest(condition: $condition, input: $input) {
      createdAt
      creationDate
      description
      id
      location
      name
      reporterEmail
      reporterName
      resolutionDate
      severity
      updatedAt
      __typename
    }
  }
`;
export const deleteServiceRequest = /* GraphQL */ `
  mutation DeleteServiceRequest(
    $condition: ModelServiceRequestConditionInput
    $input: DeleteServiceRequestInput!
  ) {
    deleteServiceRequest(condition: $condition, input: $input) {
      createdAt
      creationDate
      description
      id
      location
      name
      reporterEmail
      reporterName
      resolutionDate
      severity
      updatedAt
      __typename
    }
  }
`;
export const updateServiceRequest = /* GraphQL */ `
  mutation UpdateServiceRequest(
    $condition: ModelServiceRequestConditionInput
    $input: UpdateServiceRequestInput!
  ) {
    updateServiceRequest(condition: $condition, input: $input) {
      createdAt
      creationDate
      description
      id
      location
      name
      reporterEmail
      reporterName
      resolutionDate
      severity
      updatedAt
      __typename
    }
  }
`;
