import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "../actions/types";

// Take our state object, create a new instance of it, and dynamically pass in the stream id as the key and the actual stream as the payload
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      // Don't have to reference id property because id is in the payload
      return _.omit(state, action.payload);
    case FETCH_STREAMS:
      // Takes the list of streams we got back from API, and we create an object out of it with ID as the key
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
