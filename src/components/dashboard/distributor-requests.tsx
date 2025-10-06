import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { distributors } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

export function DistributorRequests() {
  const pendingDistributors = distributors.filter(
    (d) => d.status === "Pending"
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Distributor Requests</CardTitle>
        <CardDescription>
          Approve or reject new distributors waiting for onboarding.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Package</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingDistributors.map((distributor) => (
              <TableRow key={distributor.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={distributor.logoUrl}
                      width={40}
                      height={40}
                      alt={distributor.companyName}
                      className="rounded-full"
                      data-ai-hint="company logo"
                    />
                    <span className="font-medium">
                      {distributor.companyName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{distributor.package}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">Review</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Review: {distributor.companyName}
                        </DialogTitle>
                        <DialogDescription>
                          Review the details and assign a final package before
                          approving.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Company
                          </Label>
                          <span className="col-span-3 font-semibold">
                            {distributor.companyName}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="package" className="text-right">
                            Package
                          </Label>
                          <Select
                            defaultValue={distributor.package.toLowerCase()}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select a package" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="starter">Starter</SelectItem>
                              <SelectItem value="growth">Growth</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                           <Label className="text-right">Documents</Label>
                           <Button variant="link" className="col-span-3 justify-start p-0 h-auto">View KYC Docs</Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Reject</Button>
                        <Button>Approve & Onboard</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
