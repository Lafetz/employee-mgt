import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
prisma.employee.create({
  data: {
    firstname: "abel",
    lastname: "teshome",
    email: "test@gmail.com",
    password: "abc123",
  },
});
