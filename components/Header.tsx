'use client'

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"
import { useCart } from "./contexts/cartContext"

export default function Header(){
  const { itemCount } = useCart()
  
    const [bouncing, setBouncing] = useState(false)

    // anima quando quantidade muda
    useEffect(() => {
        if (itemCount > 0) {
        setBouncing(true)
        const timer = setTimeout(() => setBouncing(false), 400)
        return () => clearTimeout(timer)
        }
    }, [itemCount])

    return(
    <header className="sticky top-0 z-50 border-b border-border bg-white/70 backdrop-blur-md px-[20px] lg:px-[200px]">
        <div className="mx-auto flex justify-between items-center h-16">
            <Link href={'/'}>
                <p>Saboroso Pudim</p>
            </Link>

            <Link href="/cestinha" className="relative flex items-center gap-2 rounded-full bg-primary px-4 py-2 tex font-semibold text-primary-foreground transition-all hover:bg-[var(--primary-hover)] shadow-md text-white" >
                <ShoppingBag className={`h-4 w-4 ${ bouncing ? "animate-cart-bounce" : "" }`}/>

                <span>Cestinha</span>

                {itemCount > 0 && ( <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[rgb(75,40,27)] text-[10px] font-bold text-white"> {itemCount} </span> )}
            </Link>
        </div>
    </header>
    )
}