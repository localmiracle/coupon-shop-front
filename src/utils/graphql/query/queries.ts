import { gql } from "@apollo/client";

export const GET_TRANSACTION = gql`
  query getTransactions {
    getTransactions {
      id
      ownerId
      value
      trxNumber
      status
      createdAt
      updatedAt
      actionedAt
    }
  }
`;

export const GET_ORGANISATION_USERS = gql`
  query getOrganizationUsers{
    getOrganizationUsers{
      id
      email
      phone
      roles
      organizationId
      createdAt
      updatedAt
    }
  }`

export const GET_COUPONS = gql`
  query GetCoupons{
    coupon{
      name
      description
      price
      image
      level of subscription
    }
  }
`

 export const GET_SUBSCRIPTIONS = gql`
  query GetSubscriptions{
    subscription{
      name
      description
      price
      level
    }
  }
 `

 export const GET_ORGANIZATION = gql`
  query GetOrganization{
    organization{
      name
      email
      level
    }
  }
 `

