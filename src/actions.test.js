import * as actions from "./actions";
import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED,
} from "./constants";

import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import nock from "nock";

const mockStore = configureMockStore([thunkMiddleware]);

// it("should create an action to search robots", () => {
//   const text = "whoa";
//   const expectedAction = {
//     type: CHANGE_SEARCHFIELD,
//     payload: text,
//   };
//   expect(actions.setSearchField(text)).toEqual(expectedAction);
// });

// it("handles requesting robots API", () => {
//   const store = mockStore();
//   store.dispatch(actions.requestRobots());
//   const action = store.getActions();
//   const expectedAction = {
//     type: REQUEST_ROBOTS_PENDING,
//   };
//   expect(action[0]).toEqual(expectedAction);
// });

// Challenge

it("checks if API returns expected data", async () => {
  const nock = require("nock");
  const store = mockStore();
  store.dispatch(actions.requestRobots());
  const action = store.getActions();

  // Using nock, data = mock of the API call
  const scope = nock("https://jsonplaceholder.typicode.com")
    .get("/users")
    .reply(200, {
      data: {
        id: "123",
        name: "test",
        email: "test@gmail.com",
      },
    });

  const expectedAction = {
    type: REQUEST_ROBOTS_SUCCESS,
    payload: data,
  };
  // ???
  expect(action.data).toEqual(expectedAction);
  expect(scope).toEqual(expectedAction);
});

it("checks if API call fails", () => {
  const nock = require("nock");

  const scope = nock("https://jsonplaceholder.typicode.com")
    .get("/users")
    .replyWithError("something awful happened, ERROR");

  const expectedAction = {
    type: REQUEST_ROBOTS_FAILED,
    payload: error,
  };

  expect(scope).toEqual(expectedAction);
});
