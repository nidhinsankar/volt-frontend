"use client";
import { ApolloProvider as BaseApolloProvider } from "@apollo/client";
import client from "./apollo-client";
const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
};
export default ApolloProvider;
