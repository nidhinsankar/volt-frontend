"use client";
import { gql } from "@apollo/client";

export const GET_TRIP_PLAN_QUERY = gql`
  query ($location: String!, $days: String!, $people: String!) {
    generateTripPlan(location: $location, days: $days, people: $people)
  }
`;

export const GET_ALL_TAGS = gql`
  query {
    allTags
  }
`;

export const GET_ALL_TRIPS = gql`
  query {
    allTrip {
      id
      name
      type
      price
      address
      image
      tags
      cost_option
      description
    }
  }
`;

export const SEARCH_TRIP = gql`
  query ($query: String!, $contentType: String!) {
    searchTrip(query: $query, contentType: $contentType) {
      id
      name
      type
      price
      address
      image
      tags
      cost_option
      description
    }
  }
`;

export const GET_TRIP_BY_ID = gql`
  query ($id: String!) {
    trip(id: $id) {
      id
      name
      type
      price
      address
      image
      tags
      cost_option
      description
    }
  }
`;

export const GET_TRIP_BY_TAG = gql`
  query ($tag: String!) {
    tripByTag(tag: $tag) {
      id
      name
      type
      price
      address
      image
      tags
      cost_option
      description
    }
  }
`;

export const GET_TRIP_BY_TYPE = gql`
  query ($type: String!) {
    tripByType(type: $type) {
      id
      name
      type
      price
      address
      image
      tags
      cost_option
      description
    }
  }
`;

export const ADD_CONTENT = gql`
  mutation ($content: TripItemInput!) {
    addContent(content: $content) {
      key
      value
    }
  }
`;
