/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getServiceRequest = /* GraphQL */ `
  query GetServiceRequest($id: ID!) {
    getServiceRequest(id: $id) {
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
export const listServiceRequests = /* GraphQL */ `
  query ListServiceRequests(
    $filter: ModelServiceRequestFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listServiceRequests(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
