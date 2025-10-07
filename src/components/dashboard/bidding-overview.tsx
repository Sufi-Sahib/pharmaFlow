
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
import { bids, type Bid } from "@/lib/data";
import { getCounterPriceSuggestion } from "@/app/actions";
import type { SuggestCounterPriceOutput } from "@/ai/flows/suggest-counter-price";
import { Wand, Loader2, Lightbulb, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { HelpTooltip } from "../ui/help-tooltip";

function BidDetailView({ bid, onBack }: { bid: Bid; onBack: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestCounterPriceOutput | null>(null);
  const [counterPrice, setCounterPrice] = useState("");
  const { toast } = useToast();

  const handleSuggestPrice = async () => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await getCounterPriceSuggestion({
        productId: bid.product.sku,
        customerId: bid.customer.name,
        requestedPrice: bid.requestedPrice,
        quantity: bid.quantity,
        adminRole: "Manager",
        minMarginPercentage: 15,
        tierRules: "Gold Tier Customer - 5% auto-discount on list price",
      });
      setSuggestion(result);
      setCounterPrice(result.suggestedPrice.toFixed(2));
    } catch (error) {
      console.error("Failed to get suggestion:", error);
      toast({
        variant: "destructive",
        title: "AI Suggestion Failed",
        description: "Could not retrieve an AI-powered price suggestion.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = () => {
    toast({
      title: "Bid Rejected",
      description: `The price bid for ${bid.product.name} has been rejected.`,
    });
    onBack();
  };

  const handleAccept = () => {
    if (counterPrice) {
      toast({
        title: "Counter-Offer Sent!",
        description: `A counter-offer of PKR ${counterPrice} has been sent for ${bid.product.name}.`,
      });
    } else {
      toast({
        title: "Bid Accepted!",
        description: `The price bid for ${bid.product.name} has been accepted.`,
      });
    }
    onBack();
  };

  return (
    <div>
        <Button variant="ghost" onClick={onBack} className="mb-2">
            <ArrowLeft className="mr-2" /> Back to list
        </Button>
        <div className="space-y-4">
            <div className="flex items-start gap-4">
            <Image
                src={bid.product.imageUrl}
                width={64}
                height={64}
                alt={bid.product.name}
                className="rounded-lg"
                data-ai-hint="medicine box"
            />
            <div className="flex-grow">
                <p className="font-semibold">{bid.product.name}</p>
                <p className="text-sm text-muted-foreground">
                {bid.quantity} units requested
                </p>
                <p className="text-sm font-medium">
                Bid Price: PKR {bid.requestedPrice.toFixed(2)}
                </p>
            </div>
            <Badge variant="secondary">{bid.status}</Badge>
            </div>
            <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
                <AvatarImage src={bid.customer.avatarUrl} data-ai-hint="person portrait" />
                <AvatarFallback>
                {bid.customer.name.substring(0, 2)}
                </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{bid.customer.name}</span>
            </div>
            <Separator />
            <div className="space-y-2">
            <Label htmlFor="counter-price">Counter Offer</Label>
            <div className="flex items-center gap-2">
                <Input
                id="counter-price"
                type="number"
                placeholder="e.g., 1900.00"
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
            <div className="flex gap-2 pt-2">
                <Button variant="outline" className="w-full" onClick={handleReject}>
                Reject
                </Button>
                <Button className="w-full" onClick={handleAccept}>Accept Bid</Button>
            </div>
        </div>
    </div>
  );
}

function BidListView({ onSelectBid }: { onSelectBid: (bid: Bid) => void }) {
  const pendingBids = bids.filter(b => b.status === 'Requested');
  return (
    <div className="space-y-4">
      {pendingBids.map(bid => (
        <div key={bid.id} onClick={() => onSelectBid(bid)} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors">
          <Image
            src={bid.product.imageUrl}
            width={40}
            height={40}
            alt={bid.product.name}
            className="rounded-md"
            data-ai-hint="medicine box"
          />
          <div className="flex-grow">
            <p className="font-semibold text-sm">{bid.product.name}</p>
            <p className="text-xs text-muted-foreground">{bid.customer.name}</p>
          </div>
          <div className="text-right">
             <p className="font-semibold text-sm">PKR {bid.requestedPrice.toFixed(2)}</p>
             <p className="text-xs text-muted-foreground">Qty: {bid.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function BiddingOverview() {
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
            <CardTitle className="font-headline">Bidding Overview</CardTitle>
            <CardDescription>Monitor and act on price bids.</CardDescription>
        </div>
         <HelpTooltip>
            This card lists all pending price bids from customers. Click a bid to view details, suggest a counter-offer with AI, accept, or reject it.
          </HelpTooltip>
      </CardHeader>
      <CardContent>
        {selectedBid ? (
          <BidDetailView bid={selectedBid} onBack={() => setSelectedBid(null)} />
        ) : (
          <BidListView onSelectBid={setSelectedBid} />
        )}
      </CardContent>
    </Card>
  );
}
