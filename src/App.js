import React from "react";
import { gql, useQuery } from "@apollo/client";

export const ALL_PEOPLE = gql`
  query AllPeople {
    people {
      id
      name
    }
  }
`;

export default function App() {
  const {
    loading,
    data
  } = useQuery(ALL_PEOPLE);

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Names</h2>
      {loading ? (
        <p testId="loading">Loading…</p>
      ) : (
        <ul>
          {data.people.map(person => (
            <li key={person.id} testId={person.id}>{person.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
