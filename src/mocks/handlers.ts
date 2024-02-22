import { http, HttpResponse, delay } from "msw";
import { Broker, BrokerSchema, BrokerWithId } from "../models";

const brokers: BrokerWithId[] = [
  {
    id: 1,
    legalName: "Tech Innovations Ltd",
    address: {
      street: "123 Main Street",
      city: "Silicon Valley",
      postalCode: "94025",
    },
    country: "USA",
    contact: "John Doe",
    commission: 15,
  },
  {
    id: 2,
    legalName: "Global Solutions Inc",
    address: {
      street: "789 Tech Park Avenue",
      city: "Bangalore",
      postalCode: "560001",
    },
    country: "India",
    contact: "Jane Smith",
    commission: 10,
  },
  {
    id: 3,
    legalName: "EuroTech Services",
    address: {
      street: "456 Innovation Drive",
      city: "Berlin",
      postalCode: "10115",
    },
    country: "Germany",
    contact: "Bob Johnson",
    commission: 12.5,
  },
  {
    id: 4,
    legalName: "Asia Tech Hub",
    address: {
      street: "890 Cloud Road",
      city: "Tokyo",
      postalCode: "100-0004",
    },
    country: "Japan",
    contact: "Sara Williams",
    commission: 20,
  },
  {
    id: 5,
    legalName: "MegaCorp Systems",
    address: {
      street: "555 Data Center Lane",
      city: "Sydney",
      postalCode: "2000",
    },
    country: "Australia",
    contact: "Mike Brown",
    commission: 18.75,
  },
  {
    id: 6,
    legalName: "LatinTech Solutions SA",
    address: {
      street: "678 Avenida Digital",
      city: "Mexico City",
      postalCode: "06700",
    },
    country: "Mexico",
    contact: "Elena Rodriguez",
    commission: 8.5,
  },
  {
    id: 7,
    legalName: "InnoTech Scandinavia AB",
    address: {
      street: "321 Innovation Boulevard",
      city: "Stockholm",
      postalCode: "111 22",
    },
    country: "Sweden",
    contact: "Gustav Nilsson",
    commission: 15.5,
  },
  {
    id: 8,
    legalName: "AfricInnovate Ltd",
    address: {
      street: "987 Tech Plaza",
      city: "Nairobi",
      postalCode: "00100",
    },
    country: "Kenya",
    contact: "Linda Mwangi",
    commission: 22,
  },
  {
    id: 9,
    legalName: "Pacific Data Systems",
    address: {
      street: "741 Tech Haven",
      city: "Auckland",
      postalCode: "1010",
    },
    country: "New Zealand",
    contact: "Chris Thompson",
    commission: 13.25,
  },
  {
    id: 10,
    legalName: "SouthTech Solutions",
    address: {
      street: "159 Tech Street",
      city: "Cape Town",
      postalCode: "8001",
    },
    country: "South Africa",
    contact: "Zane Patel",
    commission: 17.8,
  },
  {
    id: 11,
    legalName: "ArcticTech Services",
    address: {
      street: "369 Iceberg Avenue",
      city: "Oslo",
      postalCode: "0010",
    },
    country: "Norway",
    contact: "Kristin Hansen",
    commission: 9.75,
  },
  {
    id: 12,
    legalName: "Middle East Innovations LLC",
    address: {
      street: "852 Tech Oasis",
      city: "Dubai",
      postalCode: "Dubai",
    },
    country: "United Arab Emirates",
    contact: "Ahmed Al-Mansoori",
    commission: 25,
  },
  {
    id: 13,
    legalName: "BrazilianTech Ventures",
    address: {
      street: "456 Copacabana Drive",
      city: "Rio de Janeiro",
      postalCode: "22050-002",
    },
    country: "Brazil",
    contact: "Isabela Silva",
    commission: 11,
  },
  {
    id: 14,
    legalName: "SunnyTech Solutions",
    address: {
      street: "123 Sunshine Street",
      city: "Sydney",
      postalCode: "2000",
    },
    country: "Australia",
    contact: "Tom Wilson",
    commission: 16.5,
  },
  {
    id: 15,
    legalName: "Canadian Innovation Co",
    address: {
      street: "789 Maple Leaf Lane",
      city: "Toronto",
      postalCode: "M5G 1R3",
    },
    country: "Canada",
    contact: "Emily Jones",
    commission: 19.25,
  },
];

export const searchBrokersByName = http.get("/brokers", async ({ request }) => {
  const literralBrokers = brokers.map((broker) => ({
    id: broker.id,
    text: `${broker.legalName} - ${broker.address.street}, ${broker.address.city}, ${broker.address.postalCode} - ${broker.country}`,
  }));
  const url = new URL(request.url);
  await delay(1000);
  const name = url.searchParams.get("name");
  if (name) {
    const availableResponse = literralBrokers.filter((broker) =>
      broker.text.toLowerCase().includes(name)
    );
    return HttpResponse.json({
      brokers: availableResponse,
    });
  }
  return new HttpResponse("request not valid", { status: 404 });
});

export const getBroker = http.get("/broker/:id", async ({ params }) => {
  await delay(1000);
  const broker = brokers.find((broker) => broker.id === Number(params.id));
  if (broker) {
    return HttpResponse.json(broker);
  }
  return new HttpResponse("broker not found", { status: 404 });
});

export const postBroker = http.post("/broker", async ({ request }) => {
  const data = (await request.json()) as Broker;
  const checkResult = BrokerSchema.safeParse(data);
  await delay(1000);
  if (checkResult.success) {
    const id = Math.random();
    brokers.push({ ...data, id });
    return HttpResponse.json({ id });
  }
  return new HttpResponse("broker data unvalid", { status: 403 });
});

export const patchBroker = http.patch(
  "/broker/:id",
  async ({ request, params }) => {
    const data = (await request.json()) as Partial<Broker>;
    const checkResult = BrokerSchema.partial().safeParse(data);
    await delay(1000);
    if (checkResult.success) {
      const index = brokers.findIndex(
        (broker) => broker.id === Number(params.id)
      );
      brokers[index] = { ...brokers[index], ...data };
      return HttpResponse.text("updated");
    }
    return new HttpResponse("broker data unvalid", { status: 403 });
  }
);
