export type BuilderInstance<BuildType> = {
  [P in keyof BuildType as `with${Capitalize<string & P>}`]-?: (value: Required<BuildType>[P]) => BuilderInstance<BuildType>;
} & {
  build: () => BuildType;
};

export function createObjectBuilder<BuildType extends object>(defaultObject: Required<BuildType>): () => BuilderInstance<BuildType> {
  return () => {
    const builder: any = {};
    const currentObject = { ...defaultObject };

    defineSetterMethods(builder, currentObject);
    builder['build'] = () => ({ ...currentObject });

    return builder;
  };
}

function defineSetterMethods<BuildType extends object>(builder: any, refObject: BuildType) {
  Object.keys(refObject).forEach(key => {
    const [fChar, ...restKey] = key;
    builder[`with${fChar.toUpperCase() + restKey.join('')}`] = (value: any) => {
      (refObject as any)[key] = value;
      return builder;
    };
  });
}