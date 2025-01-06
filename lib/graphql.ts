"use client";
import { gql } from "@apollo/client";

export const GET_TRIP_PLAN_QUERY = gql`
  query ($location: String!, $days: String!, $people: String!) {
    generateTripPlan(location: $location, days: $days, people: $people)
  }
`;
