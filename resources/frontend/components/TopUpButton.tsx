import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

export function TopUpButton() {

  return (
    <Dialog>
      <div className="relative group">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
        <DialogTrigger>
          <Button
            size="lg"
            variant="secondary"
            className="relative hidden h-10 sm:flex hover:bg-secondary"
          >
            Top up wallet
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Top up wallet</DialogTitle>
          <DialogDescription>
            Add balance to your wallet. You can use this balance to purchase
            links.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Current wallet balance */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Current balance</div>
            <div className="text-sm font-medium text-[#5fd045]">$0.00</div>
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Payment methods</SelectLabel>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="submit" disabled>
            Add balance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
