export type Flag = {
  sign: string;
  note: string;
};

export type MessageCard = {
  id: string;
  channel: "Email" | "SMS" | "WhatsApp";
  sender: string;
  subject?: string;
  body: string;
  isPhishing: boolean;
  flags: Flag[];
  safeNote?: string;
};

export const messages: MessageCard[] = [
  {
    id: "m1",
    channel: "Email",
    sender: "PayPa1 Support <security@paypa1-secure.com>",
    subject: "Your account is suspended",
    body: "Dear Customer, your account will be closed TODAY unless you verify now. Click here to verify your account: www.paypa1-secure.com/verify",
    isPhishing: true,
    flags: [
      { sign: "Urgent or threatening language", note: "\u201cclosed TODAY\u201d is designed to make you panic and act fast." },
      { sign: "Generic greeting", note: "\u201cDear Customer\u201d \u2014 a real company usually knows your name." },
      { sign: "Fake link", note: "The domain is paypa1-secure.com, not paypal.com. The \u201cl\u201d was swapped for a \u201c1\u201d." },
    ],
  },
  {
    id: "m2",
    channel: "SMS",
    sender: "+254 700 000 111",
    body: "CONGRATULATIONS! You have WON KES 1,000,000 in the Safaricom Anniversary Draw. Send KES 2,000 processing fee to claim your prize now.",
    isPhishing: true,
    flags: [
      { sign: "Too good to be true", note: "A prize you never entered for, appearing out of nowhere." },
      { sign: "Asks for money up front", note: "Real prizes never ask you to pay to receive them." },
      { sign: "Urgent or threatening language", note: "\u201cclaim your prize now\u201d pushes you to act before thinking." },
    ],
  },
  {
    id: "m3",
    channel: "WhatsApp",
    sender: "Unknown Number",
    body: "Hie, this is IT Support. We detected a virus on your computer. Call this number now or reply with your password so we can fix it remotely.",
    isPhishing: true,
    flags: [
      { sign: "Requests a password", note: "Real IT support will never ask you to send your password in a message." },
      { sign: "Urgent or threatening language", note: "A scary claim (\u201cvirus detected\u201d) is used to rush you." },
      { sign: "Unverified sender", note: "It comes from an unknown number, not your actual IT department." },
    ],
  },
  {
    id: "m4",
    channel: "Email",
    sender: "Jobs4You <hr@jobs4you-hiring.net>",
    subject: "You're hired! Start earning KES 500/week",
    body: "Dear Applicant, you have been selected to work from home. To secure your position, send a KES 1,500 training fee and your ID number and M-Pesa PIN today.",
    isPhishing: true,
    flags: [
      { sign: "Requests a PIN", note: "A real employer will never ask for your M-Pesa PIN." },
      { sign: "Generic greeting", note: "\u201cDear Applicant\u201d for a job you never applied to." },
      { sign: "Asks for money up front", note: "Legitimate jobs don't charge you a fee to start working." },
    ],
  },
  {
    id: "m5",
    channel: "SMS",
    sender: "M-PESA",
    body: "Confirmed. You have received KES 1,500.00 from JOHN KAMAU on 14/7/26 at 6:42 PM. New M-PESA balance is KES 3,240.00.",
    isPhishing: false,
    flags: [],
    safeNote: "A routine transaction confirmation \u2014 no link, no request for a PIN or password, nothing urgent to act on.",
  },
  {
    id: "m6",
    channel: "Email",
    sender: "Swahilipot Hub <training@swahilipothub.co.ke>",
    subject: "Reminder: Module 6 practical tomorrow",
    body: "Hi Amina, quick reminder that our Module 6 practical starts tomorrow at 9:00 AM in the training room. Let me know if you have any questions.",
    isPhishing: false,
    flags: [],
    safeNote: "Addressed to you by name, no links, no request for personal information \u2014 a normal, low-pressure message.",
  },
  {
    id: "m7",
    channel: "Email",
    sender: "Yuor Bank <alerts@secure-bank-kenya.info>",
    subject: "Yuor acount has bean suspendd",
    body: "Dear Customer, we detected unusual activity. Reply with your account number and PIN within 24 hours or yuor acount will be permanently closed.",
    isPhishing: true,
    flags: [
      { sign: "Spelling and grammar mistakes", note: "\u201cYuor acount has bean suspendd\u201d \u2014 professional companies proofread their messages." },
      { sign: "Requests a PIN", note: "No real bank asks you to reply with your PIN by email." },
      { sign: "Urgent or threatening language", note: "A 24-hour deadline is meant to stop you from thinking it through." },
    ],
  },
];
