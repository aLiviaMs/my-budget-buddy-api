-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('CHECKING', 'INVESTMENT', 'CASH');

-- CreateTable
CREATE TABLE "bankAccounts" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "initialBalance" DOUBLE PRECISION NOT NULL,
    "type" "BankAccountType" NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "bankAccounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bankAccounts" ADD CONSTRAINT "bankAccounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
