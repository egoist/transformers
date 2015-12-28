# transformers

ES6+ & PostCSS & [NPMCDN](http://npmcdn.com) => All in one

## Installation

```bash
$ npm i -g node-transformers
```

To start server:

```bash
$ transformers
```

## API

### Babel

POST `/api/babel`

**Parameters**

|Name|Type|Description|
|---|---|---|
|code|String|The content to be transformed to ES5. ES6 by default|
|react|Boolean|**false**. Enable this to allow transforming JSX code|
|experimental|Boolean|**false**. Enable this to allow stage-0 features|

**Response**

```json
{
  "code": "\"use strict\";\n\nvar a = React.createElement(\"div\", null);"
}
```

### PostCSS

POST `/api/postcss`

**Parameters**

|Name|Type|Description|
|---|---|---|
|code|String|The content to be transformed to valid CSS. Support `PreCSS` by using PostCSS|

**Response**

```json
{
  "code": "body h1{\n    font-size:15px;\n}"
}
```

## Development

|Command|Description|
|---|---|
|npm run start:server|Run server in development mode (nodemon)|
|npm run build:server|Build server for production use. (rollup)|

## License

MIT &copy; [EGOIST](https://github.com/egoist)
