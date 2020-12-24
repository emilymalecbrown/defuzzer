// actions.js
import axios from "axios";
import { API_BASE } from "./config";

// These are our action types
export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST";
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_ERROR = "CREATE_ROOM_ERROR";

// Now we define actions
export function createRoomRequest() {
  return {
    type: CREATE_ROOM_REQUEST,
  };
}

export function createRoomSuccess(payload) {
  return {
    type: CREATE_ROOM_SUCCESS,
    payload,
  };
}

export function createRoomError(error) {
  return {
    type: CREATE_ROOM_ERROR,
    error,
  };
}

export function createRoom(roomName, navigate) {
  return async function (dispatch) {
    dispatch(createRoomRequest());
    try {
      const response = await axios.get(`${API_BASE}/room?name=${roomName}`);
      dispatch(createRoomSuccess(response.data));
      navigate(`/room/${response.data.id}`);
    } catch (error) {
      dispatch(createRoomError(error));
    }
  };
}

export const JOIN_ROOM_REQUEST = "JOIN_ROOM_REQUEST";
export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS";
export const JOIN_ROOM_ERROR = "JOIN_ROOM_ERROR";

export function joinRoomRequest() {
  return {
    type: JOIN_ROOM_REQUEST,
  };
}

export function joinRoomSuccess(payload) {
  return {
    type: JOIN_ROOM_SUCCESS,
    payload,
  };
}

export function joinRoomError(error) {
  return {
    type: JOIN_ROOM_ERROR,
    error,
  };
}

export function joinRoom(roomId, navigate) {
  return async function (dispatch) {
    dispatch(joinRoomRequest());
    try {
      const response = await axios.get(`${API_BASE}/room/${roomId}`);
      dispatch(joinRoomSuccess(response.data));
      navigate(`/room/${roomId}`);
    } catch (error) {
      dispatch(joinRoomError(error));
    }
  };
}

export const SET_USERNAME = "SET_USERNAME";
export const UPDATE_USERS = "UPDATE_USERS";

export const setUsername = (username) => ({
  type: SET_USERNAME,
  username,
});

export const updateUsers = ({ allUsers }) => ({
  type: UPDATE_USERS,
  users: allUsers,
});

export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const UPDATE_CHAT_LOG = "UPDATE_CHAT_LOG";

export function updateChatLog(update) {
  return {
    type: UPDATE_CHAT_LOG,
    update,
  };
}
