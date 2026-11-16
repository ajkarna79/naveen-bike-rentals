/**
 * Rental rules: cancellation, deposit refunds and late returns.
 * Adopted by the owner in Nov 2026 to match the local standard (the same rules
 * Garuda Bike Rentals publishes), written in our own words. Change the numbers
 * here and every page that shows them updates: /cancellation-policy,
 * /refund-policy, /rental-guide, /terms, the FAQ and /llms.txt.
 */

export const POLICY_DATE = "16 November 2026";

/** Unapproved late return: one penalty applies (not added up), plus normal rent for the extra time. */
export const lateReturn = {
  graceHours: 1,
  bands: [
    { delay: "Up to 1 hour", penalty: "No penalty" },
    { delay: "Over 1 hour, up to 3 hours", penalty: "₹100" },
    { delay: "Over 3 hours, up to 6 hours", penalty: "₹200" },
    { delay: "Over 6 hours, up to 24 hours", penalty: "₹300" },
    { delay: "More than 24 hours", penalty: "₹500 for each extra day" },
  ],
};

/** When an advance was paid to hold a bike. */
export const cancellation = [
  { when: "24 hours or more before the pickup time", refund: "Full refund of the advance" },
  { when: "Less than 24 hours before the pickup time", refund: "No refund of the advance" },
  { when: "No-show (no message or call by the pickup time)", refund: "No refund of the advance" },
  { when: "We cancel (the bike is not available)", refund: "Full refund, or another bike if you prefer" },
];

/** What can and cannot come out of the security deposit. */
export const deductions = [
  { item: "Accident damage (body panels, mirrors, indicators, lights)", charged: true, basis: "What the repair actually costs at an authorised service centre" },
  { item: "Lost or broken keys, locks or helmet", charged: true, basis: "What it costs to replace" },
  { item: "Less fuel than at pickup", charged: true, basis: "The cost of the missing fuel at the pump price that day" },
  { item: "Late return without an approved extension", charged: true, basis: "Normal rent for the extra time plus the one late-return penalty that applies" },
  { item: "Bike returned very dirty", charged: true, basis: "A flat cleaning charge, told to you before it is applied" },
  { item: "Normal wear (small surface marks from normal use)", charged: false, basis: "Never charged" },
  { item: "Damage that was already there and noted at pickup", charged: false, basis: "Never charged" },
];

export const policyFaqs = [
  {
    q: "What if I return the bike late?",
    a: "The first hour after your return time is free. After that, without an approved extension, you pay normal rent for the extra time plus one penalty: ₹100 for over 1 to 3 hours, ₹200 for over 3 to 6 hours, ₹300 for over 6 to 24 hours, and ₹500 for each day beyond 24 hours. Message us before your return time to extend instead and you pay normal rent only.",
  },
  {
    q: "Can I cancel my booking?",
    a: "Yes, by call or WhatsApp. Most bookings need no advance, so there is nothing to refund. If you paid an advance to hold a bike, it is refunded in full when you cancel 24 hours or more before pickup; cancelling later or not turning up means the advance is not refunded.",
  },
  {
    q: "What can be deducted from my deposit?",
    a: "Only real costs, explained item by item when you return the bike: accident damage at repair cost, lost or broken keys, locks or helmet, missing fuel, late-return charges, and a cleaning charge if the bike comes back very dirty. Normal wear and damage noted at pickup are never charged.",
  },
];
