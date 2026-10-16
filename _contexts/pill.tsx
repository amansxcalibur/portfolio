'use client';

import {
   createContext,
   useCallback,
   useContext,
   useMemo,
   useState,
   type ReactNode,
} from 'react';

export type PillItem = {
   id: string;
   label: string;
   href?: string;
};

export type PillConfig = {
   /** Change to morph into a new set. Keep it to only slide the highlight. */
   key: string;
   items: PillItem[];
   /** Selected item id. */
   value: string | null;
   /** Keep the selected item highlighted while hovering others. */
   persist: boolean;
   /** Ignored for items that have an href. */
   onSelect: ((item: PillItem) => void) | null;
};

type PillContextValue = {
   pill: PillConfig;
   setPill: (next: Partial<PillConfig>) => void;
};

const EMPTY: PillConfig = {
   key: 'empty',
   items: [],
   value: null,
   persist: true,
   onSelect: null,
};

const PillContext = createContext<PillContextValue | null>(null);

export function PillProvider({ children }: { children: ReactNode }) {
   const [pill, setPillState] = useState<PillConfig>(EMPTY);
   const setPill = useCallback(
      (next: Partial<PillConfig>) => setPillState({ ...EMPTY, ...next }),
      []
   );
   const ctx = useMemo(() => ({ pill, setPill }), [pill, setPill]);
   return <PillContext.Provider value={ctx}>{children}</PillContext.Provider>;
}

export function usePill() {
   const ctx = useContext(PillContext);
   if (!ctx) throw new Error('usePill must be used inside <PillProvider>');
   return ctx;
}