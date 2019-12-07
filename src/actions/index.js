import streams from "../apis/stream";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "./types";
import stream from "../apis/stream";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

// POST request to create new streeam
export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  // Takes userId and formValues and combines into single object
  const response = await streams.post("/streams", { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });
};

// GET request to fetch all streams
export const fetchStreams = () => async dispatch => {
  const response = await stream.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// GET request to fetch stream with matching ID
export const fetchStream = id => async dispatch => {
  const response = await stream.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

// PUT request to update matching stream with new form values
export const editStream = (id, formValues) => async dispatch => {
  const response = await stream.put(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
};

// DELETE request to delete stream with matching ID
export const deleteStream = id => async dispatch => {
  await stream.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
};
