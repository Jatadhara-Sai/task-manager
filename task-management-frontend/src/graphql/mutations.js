import { gql } from '@apollo/client';

export const ADD_TASK = gql`
  mutation AddTask($input: TaskInput!) {
    addTask(input: $input) {
      id
      title
      description
      status
      dueDate
    }
  }
`;

export const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($id: ID!, $status: String!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      title
      status
    }
  }
`;

