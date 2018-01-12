# Class

## `RouteEntry`

### `constructor()`

### `params: any`

### `id: string`

### `regexp: RegExp`

### `toPath: function`

### `keys: *`

### `isStar: boolean`

### `isPrefix: boolean`

### `childMatcher: RouteMatcher`

### `match(path: string): nullable`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| path | string |  |

### `decodeParam(val: any)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| val | any |  |

## `RouteMatcher`

### `constructor()`

### `routeEntries: array`

### `routeEntryMap: *`

### `route(path: string): nullable`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| path | string |  |

### `toPath(param: any, undefined: *)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| param | any |  |
| undefined | * |  |

## `StateHistory`

### `constructor(options: {onPathChange: function})`

Constructor

### `shareMode: *`

### `localValue: any`

### `localData: string`

### `urlPath: string`

### `options: any`

### `path: string`

### `emitter: *`

### `onPopState: *`

### `on(listener: function(path: string, localValue: any): void): void`

Register listner

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| listener | function(path: string, localValue: any): void |  | listener |

### `off(listener: function(path: string, localValue: any): void)`

Remove listner

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| listener | function(path: string, localValue: any): void |  | listener |

### `close()`

Release all resources

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `back()`

Alias of history.back()

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `forward()`

Alias of history.forward()

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `parsePath()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `compoundPath(path: string, localData: any)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| path | string |  |
| localData | any |  |

### `toData(value: any)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| value | any |  |

### `fromData(data: string)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| data | string |  |

### `setShareMode(shareMode: boolean)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| shareMode | boolean |  |

### `updatePath(_newPath: string, localValue: any, option: object)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| _newPath | string |  |
| localValue | any |  |
| option | object |  |

### `getCurrentParam()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `PathStateHistory`

### `parsePath()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `compoundPath(path: string, localData: any)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| path | string |  |
| localData | any |  |

## `HashStateHistory`

### `parsePath()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `compoundPath(path: string, localData: any)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| path | string |  |
| localData | any |  |

# Function