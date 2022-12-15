import { createObjectBuilder } from '../src/create-object-builder';

describe('Builder', () => {
  describe('setter methods', () => {
    it('builds methods for a single layer of properties', () => {
      const builder = createObjectBuilder({ hello: 'world', something: 'anything' })();

      expect(builder.withHello).toBeTruthy();
      expect(builder.withSomething).toBeTruthy();
    });

    it('does not modify original object when passed in', () => {
      const refObject = { hello: 'world' };
      const builder = createObjectBuilder(refObject)();

      builder.withHello('other').build();

      expect(refObject).not.toEqual({ hello: 'other' });
    });

    it('multiple builders do not have an effect on each other', () => {
      const builder = createObjectBuilder({ hello: 'world' });

      const result1 = builder().withHello('anything').build();
      const result2 = builder().build();

      expect(result1).not.toEqual(result2);
    });

    it('allows for modifying a prop', () => {
      const changedValue = 'any other value';
      const builder = createObjectBuilder({ someProp: 'any' })();

      expect(builder.withSomeProp(changedValue).build()).toEqual({ someProp: changedValue });
    });
  });

  describe('build', () => {
    it('contains build method', () => {
      const builder = createObjectBuilder({ hello: 'world' })();

      expect(builder.build).toBeTruthy();
    });

    it('returns created object if no properties were modified', () => {
      const refObject = { hello: 'world' };
      const builder = createObjectBuilder(refObject)();

      expect(builder.build()).toEqual(refObject);
    });
  });
});