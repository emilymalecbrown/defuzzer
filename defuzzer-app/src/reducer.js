// reducers.js

import {
  CREATE_ROOM_SUCCESS,
  JOIN_ROOM_SUCCESS,
  SET_GAME_IMAGES,
  SET_USERNAME,
  UPDATE_CHAT_LOG,
  UPDATE_USERS,
  SET_START_GAME,
} from "./actions";

const initialState = {
  room: null,
  chatLog: [],
  username: null,
};

export default function chatReducer(state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case CREATE_ROOM_SUCCESS:
      state.room = action.payload;
      break;

    case JOIN_ROOM_SUCCESS:
      state.room = action.payload;
      break;

    case SET_USERNAME:
      state.username = action.username;
      break;

    case UPDATE_USERS:
      state.users = action.users;
      break;

    case UPDATE_CHAT_LOG:
      if (state.room !== null && action.update.roomId === state.room.id) {
        state.chatLog = [...state.chatLog, action.update.data];
      }
      break;

    case SET_START_GAME:
      state.gameStarted = true;
      break;

    case SET_GAME_IMAGES:
      state.setGameImages = action.gameImages;
      break;

    default:
      return state;
  }

  return state;
}
