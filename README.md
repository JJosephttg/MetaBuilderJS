# MetaBuilderJS
A TypeScript-friendly factory that creates a working builder in JavaScript/TypeScript

## Installation:

Simply run the command `npm i metabuilder-js` if using npm or `yarn add metabuilder-js` to add the dependency to your project

## How to use:

To use the builder, call the createObjectBuilder method with an object of your choosing to create the builder

```
import { createObjectBuilder } from 'metabuilder-js';

const helloWorldBuilder = createObjectBuilder({ hello: 'world', iMade: 'A builder' });
```

The parameter that createObjectBuilder takes is the default object that any instance of the builder you create will start out with.

This method generates a builder that contains helper methods with*PropName* where PropName is one of the properties specified on the object.

For example, using the builder we just created you can set the hello and iMade props:

```
const myObject = helloWorldBuilder()
  .withHello('a different value')
  .withIMade('different builder')
  .build();

console.log(myObject); // { hello: 'a different value', iMade: 'different builder' } 
```


