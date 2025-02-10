import { findRelativeImportPaths } from "@/util/find-relative-import-paths";

describe("findRelativeImports", () => {
  it("finds and returns relative imports.", () => {
    const contents = `
import myModule from './my-module';
import * as myOtherModule from '@/my-other-module';
import { 
  myComponent
} from '../MyComponent.tsx';
import('../../MyClientComponent');
export * from './myOtherOtherModule';
export { padLeft } from '../../../utils';
`;

    for (const group of findRelativeImportPaths(contents)) {
      console.log(group);
    }
  });
});
