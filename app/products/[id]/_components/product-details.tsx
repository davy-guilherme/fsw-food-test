"use client"

import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import DiscountBadge from "@/app/_components/discount-badge";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react";
import { useState } from "react";
import { Card } from "@/app/_components/ui/card";
import ProductList from "@/app/_components/product-list";

interface ProductDetailsProps {
    // product: Product
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>;
    complementaryProducts: Prisma.ProductGetPayload<{
        include: {
            restaurant: true;
        }
    }>[]; // [] pq é uma lista, e não um produto só
}

const ProductDetails = ({product, complementaryProducts}: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncreaseQuantityClick = () => setQuantity(currentState => currentState + 1);
    const handleDecreaseQuantityClick = () => setQuantity(currentState => {
        if (currentState == 1) return 1;

        return currentState - 1;
    });

    return ( 
        <div className="py-5 z-50 relative rounded-tr-3xl rounded-tl-3xl mt-[-1.5rem] bg-white">
            {/* RESTAURANTE */}
            <div className="flex items-center gap-[0.375rem] px-5">
                <div className="relative h-6 w-6">
                    <Image
                        src={product.restaurant.imageUrl}
                        alt={product.restaurant.name}
                        fill
                        className="rounded-full object-cover"
                    />
                </div>

                <span className="text-xs text-muted-foreground text-sm">{product.restaurant.name}</span>
            </div>

            {/* NOME DO PRODUTO */}
            <h1 className="mb-2 mt-1 text-xl font-semibold  px-5">{product.name}</h1>

            {/* PRECO DO PRODUTO E QUANTIDADE */}
            <div className="flex justify-between px-5">
                {/* PRECO COM DESCONTO */}
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">
                            {formatCurrency(calculateProductTotalPrice(product))}
                        </h2>

                        {product.discountPercentage > 0 && (
                            <DiscountBadge product={product} />
                        )}
                    </div>

                    {/* PRECO ORIGINAL */}
                    {product.discountPercentage > 0 && (
                        <p className="text-sm text-muted-foreground">
                            De: {formatCurrency(Number(product.price))}
                        </p>
                    )}

                </div>

                {/* QUANTIDADE */}
                <div className="flex gap-2 items-center text-center">
                    <Button 
                        size="icon" 
                        variant="ghost" 
                        className="border border-solid border-muted-foreground"
                        onClick={handleDecreaseQuantityClick}
                    >
                        <ChevronLeftIcon />
                    </Button>
                    
                    <span className="w-4">
                        { quantity }
                    </span>
                    

                    <Button
                        size="icon"
                        onClick={handleIncreaseQuantityClick}
                    >
                        <ChevronRightIcon />
                    </Button>
                </div>



                
            </div>

            {/* DADOS DA ENTREGA */}
            <div className="px-5">
            <Card className="mt-6 flex justify-around py-3">
                {/* CUSTO */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <BikeIcon size={14} />
                        <span className="text-xs">Entrega</span>
                    </div>

                    {Number(product.restaurant.deliveryFee) > 0 ? (
                        <p className="text-xs font-semibold">
                            {formatCurrency(Number(product.restaurant.deliveryFee))}
                        </p>
                    ) : (
                        <p className="text-xs font-semibold">
                            Grátis
                        </p>
                    )}
                    
                </div>

                {/* TEMPO */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <TimerIcon size={14} />
                        <span className="text-xs">Entrega</span>
                    </div>

                    {Number(product.restaurant.deliveryFee) > 0 ? (
                        <p className="text-xs font-semibold">
                            {formatCurrency(Number(product.restaurant.deliveryFee))}
                        </p>
                    ) : (
                        <p className="text-xs font-semibold">
                            Grátis
                        </p>
                    )}
                    
                </div>
                
            </Card>
            </div>

            <div className="mt-6 space-y-3 px-5">
                <h3 className="font-semibold">Sobre</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>

            <div className="mt-6 space-y-3">
                <h3 className="font-semibold px-5">Sucos</h3>
                <ProductList products={complementaryProducts} />
            </div>
        </div>
     );
}
 
export default ProductDetails;