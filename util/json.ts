import sjson from 'secure-json-parse';

// import type { FruitComment } from '../app/fruits/[fruitId]/actions';

export function parseJson(json: string | undefined) {
  if (!json) return undefined;
  try {
    // `as` is called a type assertion
    //
    // This tells TypeScript that you know better about
    // what the type is
    //
    // Slightly unsafe, because we don't really absolutely
    // know what the type is coming back from sjson (it
    // tells us that it is `any`)
    return sjson(json) as FruitComment[];
  } catch {
    return undefined;
  }
}
