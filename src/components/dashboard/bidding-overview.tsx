"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { sampleBid } from "@/lib/data";
import { getCounterPriceSuggestion } from "@/app/actions";
import type { SuggestCounterPriceOutput } from "@/ai/flows/suggest-counter-price";
import { Wand, Loader2, Lightbulb } from "lucide-react";

export function BiddingOverview() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestCounterPriceOutput | null>(null);
  const [counterPrice, setCounterPrice] = useState("");

  const handleSuggestPrice = async () => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await getCounterPriceSuggestion({
        productId: sampleBid.product.sku,
        customerId: sampleBid.customer.name,
        requestedPrice: sampleBid.requestedPrice,
        quantity: sampleBid.quantity,
        adminRole: "Manager",
        minMarginPercentage: 15,
        tierRules: "Gold Tier Customer - 5% auto-discount on list price",
      });
      setSuggestion(result);
      setCounterPrice(result.suggestedPrice.toFixed(2));
    } catch (error) {
      console.error("Failed to get suggestion:", error);
      // Here you would show a toast to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Bidding Overview</CardTitle>
        <CardDescription>Monitor and act on price bids.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          <Image
            src={sampleBid.product.imageUrl}
            width={64}
            height={64}
            alt={sampleBid.product.name}
            className="rounded-lg"
            data-ai-hint="medicine box"
          />
          <div className="flex-grow">
            <p className="font-semibold">{sampleBid.product.name}</p>
            <p className="text-sm text-muted-foreground">
              {sampleBid.quantity} units requested
            </p>
            <p className="text-sm font-medium">
              Bid Price: ${sampleBid.requestedPrice.toFixed(2)}
            </p>
          </div>
          <Badge variant="secondary">{sampleBid.status}</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={sampleBid.customer.avatarUrl} data-ai-hint="person portrait" />
            <AvatarFallback>
              {sampleBid.customer.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{sampleBid.customer.name}</span>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label htmlFor="counter-price">Counter Offer</Label>
          <div className="flex items-center gap-2">
            <Input
              id="counter-price"
              type="number"
              placeholder="e.g., 19.00"
              value={counterPrice}
              onChange={(e) => setCounterPrice(e.target.value)}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleSuggestPrice}
              disabled={isLoading}
              aria-label="Suggest Price with AI"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Wand className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {suggestion && (
          <div className="p-3 bg-accent/30 rounded-lg space-y-2 border border-accent/50">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h4 className="font-semibold font-headline">AI Suggestion</h4>
            </div>
            <p className="text-sm text-muted-foreground italic">
              &quot;{suggestion.reasoning}&quot;
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="w-full">
          Reject
        </Button>
        <Button className="w-full">Accept Bid</Button>
      </CardFooter>
    </Card>
  );
}
