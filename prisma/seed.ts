import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import type { HouseType } from "../src/generated/prisma/enums";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_CONNECTION_STRING }),
});

const img = (id: string) => `https://images.unsplash.com/photo-${id}`;

// Placeholder stock photos only (Data Protection Act; no real tenant property photos).
const samples: {
  slug: string;
  title: string;
  houseType: HouseType;
  bedrooms: number;
  bathrooms: number;
  price: number;
  area: string;
  latitude: number;
  longitude: number;
  featured?: boolean;
  images: string[];
}[] = [
  {
    slug: "modern-3-bedroom-kilimani",
    title: "Modern 3 Bedroom Apartment",
    houseType: "THREE_BEDROOM",
    bedrooms: 3,
    bathrooms: 2,
    price: 145000,
    area: "Kilimani",
    latitude: -1.2906,
    longitude: 36.7853,
    featured: true,
    images: ["1600596542815-ffad4c1539a9", "1502672260266-1c1ef2d93688", "1556909114-f6e7ad7d3136"],
  },
  {
    slug: "garden-villa-karen",
    title: "Garden Villa with Pool",
    houseType: "VILLA",
    bedrooms: 5,
    bathrooms: 5,
    price: 650000,
    area: "Karen",
    latitude: -1.3197,
    longitude: 36.7076,
    featured: true,
    images: ["1613490493576-7fde63acd811", "1600607687939-ce8a6c25118c", "1586023492125-27b2c045efd7"],
  },
  {
    slug: "2-bedroom-westlands",
    title: "Bright 2 Bedroom near Sarit",
    houseType: "TWO_BEDROOM",
    bedrooms: 2,
    bathrooms: 2,
    price: 95000,
    area: "Westlands",
    latitude: -1.2637,
    longitude: 36.8027,
    featured: true,
    images: ["1522708323590-d24dbb6b0267", "1560448204-e02f11c3d0e2"],
  },
  {
    slug: "studio-kileleshwa",
    title: "Furnished Studio",
    houseType: "STUDIO",
    bedrooms: 0,
    bathrooms: 1,
    price: 45000,
    area: "Kileleshwa",
    latitude: -1.2805,
    longitude: 36.7826,
    images: ["1493809842364-78817add7ffb", "1505691938895-1758d7feb511"],
  },
  {
    slug: "bedsitter-south-b",
    title: "Spacious Bedsitter",
    houseType: "BEDSITTER",
    bedrooms: 0,
    bathrooms: 1,
    price: 15000,
    area: "South B",
    latitude: -1.3089,
    longitude: 36.8381,
    images: ["1484154218962-a197022b5858"],
  },
  {
    slug: "maisonette-runda",
    title: "4 Bedroom Maisonette",
    houseType: "MAISONETTE",
    bedrooms: 4,
    bathrooms: 4,
    price: 320000,
    area: "Runda",
    latitude: -1.2166,
    longitude: 36.8095,
    featured: true,
    images: ["1580587771525-78b9dba3b914", "1600585154340-be6161a56a0c", "1545324418-cc1a3fa10c00"],
  },
];

async function main() {
  const email = process.env.OWNER_EMAIL;
  const password = process.env.OWNER_PASSWORD;
  if (!email || !password || password.startsWith("REPLACE_")) {
    throw new Error("Set OWNER_EMAIL and OWNER_PASSWORD in .env before seeding.");
  }
  await db.user.upsert({
    where: { email },
    update: {},
    create: { email, name: "Owner", passwordHash: await bcrypt.hash(password, 12) },
  });
  console.log(`Owner account ready: ${email}`);

  for (const s of samples) {
    const { images, ...data } = s;
    await db.listing.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        ...data,
        city: "Nairobi",
        description:
          "Placeholder listing for development. Replace with real details from the admin dashboard.",
        amenities: ["Parking", "Backup water", "24/7 security"],
        images: {
          create: images.map((id, position) => ({ url: img(id), position })),
        },
      },
    });
  }
  console.log(`Seeded ${samples.length} sample listings.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
