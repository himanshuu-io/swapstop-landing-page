export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What is SwapStop?',
    answer:
      'SwapStop helps local sellers complete transactions without meeting the buyer in person. It handles the payment and physical handoff through a secure locker process.',
  },
  {
    id: 'faq2',
    question: 'Is SwapStop a marketplace?',
    answer:
      'No. You can keep listing your items wherever you already sell, such as Facebook Marketplace, OfferUp, Craigslist, or offline. SwapStop handles what happens after you find a buyer.',
  },
  {
    id: 'faq3',
    question: 'Does the buyer need a SwapStop account?',
    answer:
      'No. The buyer can review and pay through a web experience. A lightweight account is generated for them, and existing SwapStop users can use the app.',
  },
  {
    id: 'faq4',
    question: 'How does payment work?',
    answer:
      'The buyer pays before pickup. The payment is held securely until the buyer accepts the item.',
  },
  {
    id: 'faq5',
    question: 'Do I have to meet the buyer?',
    answer:
      'No. The seller drops off the item, and the buyer picks it up separately.',
  },
  {
    id: 'faq6',
    question: 'How does the locker work?',
    answer:
      'Once the transaction is confirmed, you receive the instructions and credentials needed for drop-off. After the item is deposited, the buyer receives the locker location and access credentials needed for pickup.',
  },
  {
    id: 'faq7',
    question: 'How do I access the locker?',
    answer:
      'SwapStop can provide access through the app, a QR code, or other issued credentials depending on the transaction.',
  },
  {
    id: 'faq8',
    question: 'Is the handoff recorded?',
    answer:
      'Yes. The seller records the item as it goes into the locker, and the buyer is recorded when they pick it up. The kiosk also has on-site camera coverage.',
  },
  {
    id: 'faq9',
    question: 'What happens if the buyer rejects the item?',
    answer:
      'The buyer has an eight-hour acceptance window. If they reject the item, they receive a return QR code and place it back in the locker. The seller then re-verifies the item before the refund is completed.',
  },
  {
    id: 'faq10',
    question: 'What if someone tries to return a different item?',
    answer:
      'Sellers can provide a unique identifier, such as a serial number, when creating the transaction. This helps SwapStop verify the item if it is returned.',
  },
  {
    id: 'faq11',
    question: 'What happens if there is a dispute?',
    answer:
      'If the issue cannot be resolved through the return process, SwapStop\'s customer service team handles the dispute.',
  },
  {
    id: 'faq12',
    question: 'What if the buyer never picks up the item?',
    answer:
      'SwapStop notifies the seller and handles the next step according to the transaction process.',
  },
  {
    id: 'faq13',
    question: 'Where is SwapStop available?',
    answer:
      'SwapStop is launching in Chula Vista, California, with expansion planned as more locations are validated.',
  },
  {
    id: 'faq14',
    question: 'Who is SwapStop for?',
    answer:
      'SwapStop is built for local sellers, including regular sellers, power sellers, resellers, swap-meet and flea-market sellers, and small local businesses.',
  },
  {
    id: 'faq15',
    question: 'What does it cost?',
    answer:
      'The current seller fee is $1.99 per locker transaction, plus a separate locker reservation fee. The buyer does not pay an additional SwapStop fee under the current model.',
  },
];
