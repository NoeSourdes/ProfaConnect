import type { ValueId } from "@/src/config/customizer-plugins";

export const isEnabled = (
  id: ValueId,
  currentId?: ValueId,
  componentId?: boolean
) => (!currentId && componentId !== false) || currentId === id;
