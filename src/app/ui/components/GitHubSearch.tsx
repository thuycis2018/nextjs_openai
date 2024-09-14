import React from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_REPOSITORIES } from '../../api/queries/queries';
import {SearchProps} from '../../lib/definition';
import { PostsSkeleton } from '../../ui/components/Skeletons';

const GitHubSearch: React.FC<SearchProps> = ({ query, first }) => {

  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, {
    variables: { query, first },
    context: {
      fetch:  async () => {
        return await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: SEARCH_REPOSITORIES.loc?.source.body,
          }),
        }).then(response => response.json());
      },
    },
  });

  if (loading && query) return <PostsSkeleton />;
  if (error) return <p>Error: {error.message}</p>;

  return (
        <div>
            <ul className="space-y-4">
                {data?.search.edges.map((edge: { node: { url: string | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; owner: { login: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; description: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; stargazerCount: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; forkCount: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; }, index: React.Key | null | undefined) => (
                <li key={index} className="items-start p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                >
                    <h2 className="text-xl font-semibold mb-1">
                    <a className="text-black font-bold text-xl hover:underline" href={edge.node.url} target="_blank" rel="noopener noreferrer">
                        {edge.node.name}
                    </a>
                    </h2>
                    <p className="text-gray-700">Owner: {edge.node.owner.login}</p>
                    <p className="text-gray-700">Description: {edge.node.description}</p>
                    <p className="text-gray-700">Stars: {edge.node.stargazerCount}</p>
                    <p >Forks: {edge.node.forkCount}</p>
                </li>
                ))}
            </ul>
      </div>
  );
};

export default GitHubSearch;
