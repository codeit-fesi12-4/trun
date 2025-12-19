import { describe, it, expect, beforeEach } from "vitest";
import { useLoginModalStore } from "@/stores/loginModal.store";

describe("loginModal.store", () => {
  beforeEach(() => {
    // Reset store state before each test
    useLoginModalStore.setState({ open: false });
  });

  it("should have initial state with open as false", () => {
    const state = useLoginModalStore.getState();
    expect(state.open).toBe(false);
  });

  it("should set open to true", () => {
    const { setOpen } = useLoginModalStore.getState();
    setOpen(true);

    const state = useLoginModalStore.getState();
    expect(state.open).toBe(true);
  });

  it("should set open to false", () => {
    useLoginModalStore.setState({ open: true });

    const { setOpen } = useLoginModalStore.getState();
    setOpen(false);

    const state = useLoginModalStore.getState();
    expect(state.open).toBe(false);
  });

  it("should toggle open state multiple times", () => {
    const { setOpen } = useLoginModalStore.getState();

    setOpen(true);
    expect(useLoginModalStore.getState().open).toBe(true);

    setOpen(false);
    expect(useLoginModalStore.getState().open).toBe(false);

    setOpen(true);
    expect(useLoginModalStore.getState().open).toBe(true);
  });

  it("should maintain state across multiple calls", () => {
    const store1 = useLoginModalStore.getState();
    const store2 = useLoginModalStore.getState();

    expect(store1).toBe(store2);
  });
});