import type React from "react";

export function HeartICon(props: React.ComponentProps<'svg'>) {
    return (
        <svg className="h-8 w-8 text-red-500 hover:fill-red-500 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
    )
}