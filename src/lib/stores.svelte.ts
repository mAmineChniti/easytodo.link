import { generateId, type List } from "./utils";

// Browser + Local Storage
const browser_exists = (typeof window !== "undefined") && (typeof (document) !== "undefined");
const storage = browser_exists ? localStorage : null;

// Generalized Local Storage
export function persisted<T>(key: string, default_value: T) {
  let value : T | undefined = $state();

  const initial_local = storage?.getItem(key);
  if (initial_local) {
    value = JSON.parse(initial_local).value as T;
  }
  else {
    value = default_value;
    update();
  }

  function update() {
    if (browser_exists) {
      storage?.setItem(key, JSON.stringify({ value: value }));
    }
  }

  return {
    get value() { return value; },
    set value(new_value) { value = new_value; update(); },
    update
  }
}

export const local_lists = persisted<List[]>("local_lists", [
  {
    id: generateId(),
    title: "Take a Break",
    tasks: [
      { id: generateId(), description: "Drink water", is_completed: false },
      { id: generateId(), description: "Stand up and stretch", is_completed: false },
      { id: generateId(), description: "Go outside for 10 seconds", is_completed: false }, ]
  }
]);

export const pinned_list = persisted<string>("pinned_list", local_lists.value![0].id);
