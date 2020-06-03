import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import renderer from 'react-test-renderer';

import { peopleData } from './graphql/schema';
import App, { ALL_PEOPLE } from './App';

describe('reproduction', () => {
  it('should render correctly', async () => {
    const mock = {
      request: {
        query: ALL_PEOPLE,
      },
      result: {
        data: { people: peopleData },
      },
    };

    const component = renderer.create(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <App name="Buck" />
      </MockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response

    const p = component.root.findByProps({testId: 1});
    expect(p.children).toContain('John Smith');
  });

  it('should render loading state initially', () => {
    // This test is actually producing an error because the mock is missing.
    // The error only manifests in the next test to execute.
    // So if you put a third copy at the bottom that one will succeed.
    const component = renderer.create(
      <MockedProvider mocks={[]}>
        <App />
      </MockedProvider>
    );

    const loadingElement = component.root.findByProps({testId: 'loading'});
    expect(loadingElement.children).toContain('Loading…');
  });

  it('should render correctly again', async () => {
    const mock = {
      request: {
        query: ALL_PEOPLE,
      },
      result: {
        data: { people: peopleData },
      },
    };

    const component = renderer.create(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <App name="Buck" />
      </MockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response

    const p = component.root.findByProps({testId: 1});
    expect(p.children).toContain('John Smith');
  });
});

describe('minimal reproduction', () => {
  it('succeeds', () => {
    const component = renderer.create(
      <MockedProvider mocks={[]}>
        <App />
      </MockedProvider>
    );
  });

  it('fails', async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
});
