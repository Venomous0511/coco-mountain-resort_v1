"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { urlFor } from "@/sanity/lib/image";
import { Menu } from "@/sanity/types";

interface DiningMenuProps {
  items: Menu[];
}

export default function DiningMenu({ items }: DiningMenuProps) {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredItems =
    filter === "All" ? items : items.filter((item) => item.category === filter);

  const itemsToShow = showAll ? filteredItems : filteredItems.slice(0, 4);
  return (
    <>
      <div className="flex flex-wrap justify-start items-center gap-3 mb-6">
        {["All", "Main Course", "Pasta", "Dessert", "Beverage", "Alcohol"].map(
          (category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "secondary"}
              onClick={() => setFilter(category)}
            >
              {category}
            </Button>
          )
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {itemsToShow.map((item) => (
          <Card key={item._id} className="overflow-hidden border-0 shadow-lg">
            <Image
              src={
                item.image ? urlFor(item.image).url() : "/images/600x400.png"
              }
              alt={item.foodItem ?? "Food Image"}
              width={600}
              height={400}
              className="h-64 w-full object-cover"
            />
            <CardContent className="pt-4">
              <h3 className="text-lg font-semibold text-foreground">
                {item.foodItem}
              </h3>
              <p className="text-muted-foreground">₱ {item.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show More"}
        </Button>
      </div>
    </>
  );
}
