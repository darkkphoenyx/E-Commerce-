/*
  Warnings:

  - You are about to drop the `OrderLine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductConfiguration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Variation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariationOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderLine" DROP CONSTRAINT "OrderLine_product_item_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderLine" DROP CONSTRAINT "OrderLine_shop_order_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_parent_category_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductConfiguration" DROP CONSTRAINT "ProductConfiguration_product_item_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductConfiguration" DROP CONSTRAINT "ProductConfiguration_variation_option_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ShopOrder" DROP CONSTRAINT "ShopOrder_order_status_id_fkey";

-- DropForeignKey
ALTER TABLE "ShopOrder" DROP CONSTRAINT "ShopOrder_shipping_address_id_fkey";

-- DropForeignKey
ALTER TABLE "ShopOrder" DROP CONSTRAINT "ShopOrder_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Variation" DROP CONSTRAINT "Variation_category_id_fkey";

-- DropForeignKey
ALTER TABLE "VariationOption" DROP CONSTRAINT "VariationOption_variation_id_fkey";

-- DropTable
DROP TABLE "OrderLine";

-- DropTable
DROP TABLE "OrderStatus";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductCategory";

-- DropTable
DROP TABLE "ProductConfiguration";

-- DropTable
DROP TABLE "ProductItem";

-- DropTable
DROP TABLE "ShopOrder";

-- DropTable
DROP TABLE "Variation";

-- DropTable
DROP TABLE "VariationOption";
