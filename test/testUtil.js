import { prismaClient } from "../src/app/database.js";
import authHandler from "../src/utils/authHandler.js";

export const removeAllUser = async () => {
  return await prismaClient.user.deleteMany({
    where: {
      userId: {
        gte: 0,
      },
    },
  });
};

export const removeAllTutor = async () => {
  return await prismaClient.tutor.deleteMany({
    where: {
      tutorId: {
        gte: 0,
      },
    },
  });
};

export const createTestUser = async () => {
  return await prismaClient.user.create({
    data: {
      fullName: "user one",
      email: "user1@localhost.local",
      noHp: "+658987654321",
      password: await authHandler.encryptPassword("password"),
    },
  });
};

export const createTestTutor = async () => {
  const tempUser = await createTestUser();
  return await prismaClient.tutor.create({
    data: {
      tutorTitle: "Jr. Mobile Dev",
      userId: tempUser.userId,
    },
  });
};

export const createManyTestUser = async () => {
  for (let i = 0; i < 5; i++) {
    await prismaClient.user.create({
      data: {
        fullName: `user ${i}`,
        email: `user${i}@localhost.local`,
        noHp: `+65898765432${i}`,
        password: await authHandler.encryptPassword("password"),
      },
    });
  }
};
