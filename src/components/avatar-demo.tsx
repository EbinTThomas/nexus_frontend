"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useEffect, useState } from "react";

export function AvatarDemo({ imgSrc }) {
    
    return (
        <Avatar>
            <AvatarImage src={imgSrc} alt="@shadcn" className="object-cover" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
