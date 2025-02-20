"use client"

import { Button } from "@/app/_components/ui/button";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import Cart from "@/app/_components/cart";

interface CartBannerProps {
    restaurant: Pick<Restaurant, 'id'>
}

const CartBanner = ({restaurant}: CartBannerProps) => {
    const {products, totalPrice, totalQuantity} = useContext(CartContext);

    const restaurantHasProductsOnCart = products.some((product) => product.restaurantId == restaurant.id)

    if (!restaurantHasProductsOnCart) return null;
    
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full bg-white p-5 pt-3 border-t border-solid border-muted shadow-md">
            <div className="flex justify-between items-center">
                {/* PRECO */}
                <div>
                    <span className="text-xs text-muted-foreground font-normal">Total sem entrega</span>
                    <h3 className="font-semibold">{formatCurrency(totalPrice)} <span className="text-xs text-muted-foreground"> / {totalQuantity} { totalQuantity > 1 ? "itens" : "item" }</span></h3>
                </div>

                {/* BOTAO */}
                <Sheet>
                    <SheetTrigger>
                        <Button>Ver sacola</Button>
                    </SheetTrigger>
                    <SheetContent className="w-[90vw]">
                    <SheetHeader>
                        <SheetTitle className="text-left">Sacola</SheetTitle>
                    </SheetHeader>
                        <Cart />
                    </SheetContent>
                </Sheet>
                
                
            </div>
        </div>
    );
}
 
export default CartBanner;