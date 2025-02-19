import { Suspense } from "react";


export default function CVBuilderLayout({ children }: { children: React.ReactNode }) {
    return <Suspense>
        {children}
    </Suspense>
}
