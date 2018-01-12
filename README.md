# funcX Router

Universal routing utility for Javascript Application without dependency to any framework (including funcX).

funcX Router gives the way to convert the both of predefined path and arbitrary value to/from url and manipulate it as historical state.

```
// URL Path
#/user/1234?eyJvcHRpb25zIjp7ImxhbmciOiJqYSJ9fQ==
      or
/user/1234?eyJvcHRpb25zIjp7ImxhbmciOiJqYSJ9fQ==

// Path Parameter
{ "path": "/user/1234", "localValue": {"lang": "en"}}

// Route Parameter
{id: "user", userId: "1234"}
```

## Installation

```
npm install funcx-router
```

## Components

| Name             | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| StateHistory     | Register string (path) and arbitrary value (localValue) as state.          |
| HashStateHistory | Implemenetation of StateHistory with location.hash.                        |
| PathStateHistory | Implemenetation of StateHistory with location.pathname and location.query. |
| RouteMatcher     | Convert route <-> path with toPath() and toRoute() method.                 |

## Usage (StateHistory)

```js
import { HashStateHistory } from "funcx-router";
const stateHistory = new HashStateHistory();

stateHistory.on(stateParam => {
  console.log("LOG: ", JSON.stringify(stateParam));
});

stateHistory.updatePath("/user", { options: { lang: "en" } });
stateHistory.updatePath("/user/12345", { options: { lang: "ja" } });

history.back(); // LOG: { "path": "/user/", "localValue": {"lang": "en"}}

console.log(history.hash); // #/user?eyJvcHRpb25zIjp7ImxhbmciOiJqYSJ9fQ==

location.hash = "#/thing?InBxciI="; // LOG: { "path": "/thing", "localValue": "pqr"}

stateHistory.setShareMode(false);

console.log(history.hash); // #/thing

// localValue is hided but still alive as an inner state.
```

## Usage (RouteMatcher)

```js
import { RouteMatcher } from "funcx-router";
const routeMatcher = new RouteMatcher([
  {
    path: "/user/:userId",
    id: "user",
    params: {
      mainComponent: "user",
      component: ActionPanel,
      schema: schema,
    },
    children: [
      {
        path: "/image/:imageId",
        id: "image",
        params: {
          subComponent: "image",
        },
      },
    ],
  },
  {
    path: "/rep/:userId*",
    id: "rep",
  },
  {
    path: "*",
    id: "all",
  },
]);

routeMatcher.route("/user/1234/image/5678");
// {value: { id: "user.image", userId: 1234, imageId: 5678}, params: {mainComponent: 'user', subComponent: 'image'}}
routeMatcher.route("/rep/1234/5678");
// {value: { id: "rep", userId: ["1234", "5678"]}}

routeMatcher.toPath({ id: "user.image", userId: 1234, imageId: 5678 });
// "/user/1234/image/5678"
```

## API Reference

[Link](https://funcx-team.github.io/funcx-router/identifiers.html)
