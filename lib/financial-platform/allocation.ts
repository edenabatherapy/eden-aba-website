export type BalanceBreakdown = {
  totalDonationsCents: number;
  reservedFundsCents: number;
  distributedFundsCents: number;
  availableBalanceCents: number;
};

export function computeAvailableBalance(input: {
  totalDonationsCents: number;
  reservedFundsCents: number;
  distributedFundsCents: number;
}): BalanceBreakdown {
  const totalDonationsCents = Math.max(0, input.totalDonationsCents);
  const reservedFundsCents = Math.max(0, input.reservedFundsCents);
  const distributedFundsCents = Math.max(0, input.distributedFundsCents);
  const availableBalanceCents = Math.max(
    0,
    totalDonationsCents - reservedFundsCents - distributedFundsCents,
  );

  return {
    totalDonationsCents,
    reservedFundsCents,
    distributedFundsCents,
    availableBalanceCents,
  };
}

export function canAllocateFunds(
  availableBalanceCents: number,
  requestedAmountCents: number,
): boolean {
  return requestedAmountCents > 0 && requestedAmountCents <= availableBalanceCents;
}
