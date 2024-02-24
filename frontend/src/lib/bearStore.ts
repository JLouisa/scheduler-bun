import { create } from "zustand";

interface BearState {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const bearStore = create<BearState>((set) => ({
  isAdmin: false,
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));

export default bearStore;

// import bearStore from "./bearStore";

// const Counter = () => {
//   const { count, increment, decrement } = bearStore();

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//     </div>
//   );
// };

// export default Counter;
