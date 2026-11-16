/** Real Google reviews of Naveen Bike Rentals (shortened, names abbreviated). */
export const reviews = [
  {
    name: "Kevin M.",
    rating: 4,
    when: "Google review",
    bike: "Pulsar 150",
    text: "The owner is super chill and fair. Needed the bike for about 28 hours on a weekend and he even gave a discount without me asking. The ₹500 deposit was refunded instantly, no hassle at all.",
  },
  {
    name: "Saiteja E.",
    rating: 5,
    when: "Google review",
    text: "Bike was clean, well-maintained, and the pickup process was smooth. No hidden charges. Definitely renting again.",
  },
  {
    name: "Abhijeet K.",
    rating: 5,
    when: "Google review",
    bike: "Scooty",
    text: "We were on a day trip to Warangal and wanted a scooty. Got a good deal, the bike was in good condition and he was kind enough to give a pillion helmet for my wife.",
  },
  {
    name: "Venkatreddy M.",
    rating: 5,
    when: "Google review",
    bike: "Pulsar",
    text: "Best bike rental service. Vehicle in good condition, and he even guided my 2-day trip. Highly recommended for a Warangal trip.",
  },
  {
    name: "Jagadeesh M.",
    rating: 5,
    when: "Google review",
    text: "Took a bike for my trip to Laknavaram, totally worth it, and the bike was in great condition.",
  },
  {
    name: "Reshma Y.",
    rating: 5,
    when: "Google review",
    text: "Made our journey smooth without any hurdles. Bike in excellent condition with reasonable prices. Go for it without any hesitation.",
  },
  {
    name: "Hari P.",
    rating: 5,
    when: "Google review",
    bike: "Shine",
    text: "Such a genuine service. Got a Shine in good condition and they returned the deposit money completely.",
  },
  {
    name: "Sudheer K.",
    rating: 5,
    when: "Google review",
    text: "Excellent service. Good-condition bikes and scooties available, and he's also a mechanic. A polite person.",
  },
  {
    name: "Raghav M.",
    rating: 5,
    when: "Google review",
    text: "Took 2 bikes and 3 scooties for our group. Stock was available and he was polite all the time.",
  },
  {
    name: "Akshith A.",
    rating: 5,
    when: "Google review",
    text: "Took two bikes, worth the money and no regrets. Thank you Naveen anna for the warm welcome!",
  },
  {
    name: "Venkata K.",
    rating: 5,
    when: "Google review",
    text: "Bike in excellent condition and staff behaviour is so nice. Made my Warangal trip more memorable.",
  },
  {
    name: "Sai T.",
    rating: 5,
    when: "Google review",
    text: "Affordable price. Really useful to roam all around the city when you're coming from far places.",
  },
];

export const faqs = [
  {
    q: "What documents do I need to rent a bike?",
    a: "A valid driving licence for the vehicle type and an Aadhaar card or other government photo ID. Please carry the originals: we check them at pickup. Riders must be 18 or older.",
  },
  {
    q: "How much is the security deposit?",
    a: "A refundable security deposit is collected at pickup. The amount depends on the bike and rental length, and we tell you on WhatsApp before you come. It's refunded when the bike is returned in the same condition.",
  },
  {
    q: "Is fuel included?",
    a: "No, fuel is not included. Note the fuel level at pickup and return the bike at the same level. There's a petrol bunk close to our location.",
  },
  {
    q: "How many kilometres can I ride per day?",
    a: "Every plan includes free kilometres: 125 km/day on scooties and 125 cc bikes, 150 km/day on the Shine, SP 125 and Pulsar 150, 180 km/day on the FZ-S and NS160, and 200 km/day on all Royal Enfields. Extra kilometres are charged as per the rental terms.",
  },
  {
    q: "Do you give helmets?",
    a: "Yes, helmets are available at pickup. Need one for your pillion too? Mention it when you book and we'll keep it ready.",
  },
  {
    q: "Can I take the bike outside Warangal, to Ramappa, Laknavaram or further?",
    a: "Yes, outstation and tour rides are welcome. Just tell us your route when booking so we can suggest the right bike and plan the kilometres.",
  },
  {
    q: "Do you have weekend, weekly or monthly plans?",
    a: "Yes. Daily, weekend and monthly rentals are available. For a week or longer, message us and we'll share a better rate than the daily price.",
  },
  {
    q: "How do I book?",
    a: "Pick a bike on this site and tap “Book on WhatsApp”. Your bike, dates and estimate are filled in automatically. We confirm availability and the deposit in the chat. You can also simply call us.",
  },
  {
    q: "What are your timings?",
    a: "Open every day: 6:00 AM – 11:30 PM (Friday till 10:30 PM, Saturday from 7:00 AM). Please message before you come so the bike is ready.",
  },
  {
    q: "What if the bike breaks down?",
    a: "Call us right away. We'll guide you over the phone or arrange help. Don't attempt major repairs yourself.",
  },
];

/**
 * Rides from the counter in Kishanpura. Distances are approximate one-way
 * road km. Photographs are licensed Wikimedia Commons stand-ins of each
 * place (credited on /credits); swap in your own riders' photos any time.
 */
export const rides = [
  {
    name: "Thousand Pillar Temple",
    km: 3,
    time: "10 minutes",
    text: "The 12th-century Kakatiya temple is right in town. Go early, before the heat and the crowds.",
    bike: "any scooter",
    photo: { src: "/rides/thousand-pillar-temple.jpg", width: 1920, height: 1440, alt: "The carved stone Thousand Pillar Temple under a clear blue sky" },
    credit: { by: "Shishirdasika", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Warangal_Thouand_Pillars_Temple.jpg" },
  },
  {
    name: "Bhadrakali Temple and lake",
    km: 5,
    time: "15 minutes",
    text: "The temple sits on the rocks above the lake. Ride the bund road at sunset and stop for chai on the way back.",
    bike: "an Activa or Jupiter",
    photo: { src: "/rides/bhadrakali-lake.jpg", width: 1920, height: 1440, alt: "Bhadrakali temple tower beside the lake, with the water stretching to the hills" },
    credit: { by: "Harsha8398", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Warangal_Bhadrakali_Temple_beside_Bhadrakali_lake,_Warangal,_Telangana,_India_(2017)_1.jpg" },
  },
  {
    name: "Warangal Fort",
    km: 12,
    time: "30 minutes",
    text: "Four carved stone gateways stand in the open fort grounds. Flat roads all the way, easy on a commuter bike.",
    bike: "a Shine or SP 125",
    photo: { src: "/rides/warangal-fort.jpg", width: 1920, height: 1080, alt: "A carved Kakatiya stone gateway at Warangal Fort among trees" },
    credit: { by: "Subhodeep Mukherjee", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Warangal_Fort(6)-Warangal-Telengana-N-AP-131.jpg" },
  },
  {
    name: "Ramappa Temple",
    km: 65,
    time: "1 hour 30 minutes",
    text: "The UNESCO World Heritage temple at Palampet, with Ramappa Lake next door. A good half-day out on a 350.",
    bike: "the Classic 350",
    photo: { src: "/rides/ramappa-temple.jpg", width: 1920, height: 1002, alt: "Ramappa Temple's sandstone tower in late afternoon light" },
    credit: { by: "SukuPhotography", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Master_piece_of_ramappa_temple.jpg" },
  },
  {
    name: "Laknavaram Lake",
    km: 75,
    time: "1 hour 45 minutes",
    text: "Hanging bridges, islands and forest on every side. The weekend ride most of our customers ask about.",
    bike: "the Meteor 350 or NS160",
    photo: { src: "/rides/laknavaram-lake.jpg", width: 1920, height: 1080, alt: "Laknavaram Lake, still water with forested hills behind" },
    credit: { by: "Tarunsamanta", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Laknavaram_Lake_in_Telangana_16.jpg" },
  },
];

/** Booking really is a sequence, so the steps are numbered. */
export const steps = [
  {
    title: "Pick a bike and the days",
    text: "Choose the bike, the pickup date and how many days. The total and the free kilometres show before you send anything.",
  },
  {
    title: "Send it on WhatsApp",
    text: "Your message is written for you. We reply with availability and the deposit for that bike.",
  },
  {
    title: "Show your licence and ride",
    text: "Bring your driving licence and Aadhaar. We check the bike with you, hand over the helmet and keys.",
  },
  {
    title: "Return it, get the deposit",
    text: "Bring it back on time with the fuel at the level you took it. The deposit comes back after a quick look.",
  },
];
