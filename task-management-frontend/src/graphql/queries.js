import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($status: String) {
    tasks(status: $status) {
      id
      title
      description
      status
      dueDate
      createdAt
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      dueDate
      createdAt
    }
  }
`;