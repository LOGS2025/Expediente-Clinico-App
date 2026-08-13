import type { StateCreator } from "zustand";
import { persist } from 'zustand/middleware'
import { create } from "zustand";
import type { UserSlice } from "@/lib/slices/userSlice";
import { createUserSlice } from "@/lib/store/createUserStore";

type BoundState = 
  UserSlice;

export type BoundStateCreator<SliceState> = StateCreator<
  BoundState,
  [],
  [],
  SliceState
>;

export const useBoundStore = create<BoundState>()(
  persist(
  (...args) => ({
  ...createUserSlice(...args),
}), {name: 'bound-storage'}
  )
);
