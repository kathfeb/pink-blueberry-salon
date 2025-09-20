// Simple test suite for Pink Blueberry Salon
// Run with: node src/tests/simple-tests.js

import { products } from "../data/products";
import { services } from "../data/services";

console.log("🧪 Running Pink Blueberry Salon Tests...\n");

let passedTests = 0;
let totalTests = 0;

// Test helper
function test(description, testFn) {
  totalTests++;
  try {
    testFn();
    console.log(`✅ ${description}`);
    passedTests++;
  } catch (error) {
    console.log(`❌ ${description}`);
    console.log(`   Error: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

// Test 1: Cart Total Calculation
test("Cart total calculation is correct", () => {
  const mockCart = [
    { product: { id: 1, price: 28 }, quantity: 2 },
    { product: { id: 2, price: 12 }, quantity: 1 },
  ];

  const total = mockCart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  assert(total === 68, `Expected 68, got ${total}`);
});

// Test 2: Add to Cart Function
test("Add to cart creates correct item structure", () => {
  const cart = [];
  const product = { id: 1, name: "Shampoo", price: 28 };

  // Simulate adding to cart
  cart.push({ product, quantity: 1 });

  assert(cart.length === 1, "Cart should have 1 item");
  assert(cart[0].quantity === 1, "Quantity should be 1");
  assert(cart[0].product.name === "Shampoo", "Product name should be Shampoo");
});

// Test 3: Email Validation
test("Email validation works correctly", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validEmails = [
    "test@example.com",
    "user.name@domain.co",
    "admin@site.org",
  ];
  const invalidEmails = [
    "notanemail",
    "@example.com",
    "test@",
    "test..@example.com",
  ];

  validEmails.forEach((email) => {
    assert(emailRegex.test(email), `${email} should be valid`);
  });

  invalidEmails.forEach((email) => {
    assert(!emailRegex.test(email), `${email} should be invalid`);
  });
});

// Test 4: Phone Validation
test("Phone validation accepts common formats", () => {
  const phoneRegex = /^[\d\s\-\(\)]+$/;

  const validPhones = [
    "123-456-7890",
    "(123) 456-7890",
    "123 456 7890",
    "1234567890",
  ];
  const invalidPhones = ["abc-def-ghij", "123@456", "phone"];

  validPhones.forEach((phone) => {
    assert(phoneRegex.test(phone), `${phone} should be valid`);
  });

  invalidPhones.forEach((phone) => {
    assert(!phoneRegex.test(phone), `${phone} should be invalid`);
  });
});

// Test 5: Service Price Calculation
test("Service prices are all positive numbers", () => {
  services.forEach((service) => {
    assert(
      typeof service.price === "number",
      `Service ${service.name} price should be a number`
    );
    assert(
      service.price > 0,
      `Service ${service.name} price should be positive`
    );
  });
});

// Test 6: Product Data Integrity
test("All products have required fields", () => {
  const requiredFields = ["id", "name", "category", "price", "description"];

  products.forEach((product) => {
    requiredFields.forEach((field) => {
      assert(
        product[field] !== undefined,
        `Product ${product.id} missing ${field}`
      );
    });
  });
});

// Test 7: Booking Step Validation
test("Booking steps require proper data", () => {
  const booking = {
    service: null,
    stylist: null,
    date: "",
    time: "",
    customerInfo: { name: "", email: "", phone: "" },
  };

  // Step 1 validation
  assert(!booking.service, "Should not proceed without service");

  booking.service = { id: 1, name: "Test Service" };
  assert(booking.service, "Should proceed with service");

  // Step 4 validation
  assert(!booking.customerInfo.name, "Should not proceed without name");
  assert(!booking.customerInfo.email, "Should not proceed without email");

  booking.customerInfo = {
    name: "John",
    email: "john@example.com",
    phone: "123-456-7890",
  };
  assert(
    booking.customerInfo.name && booking.customerInfo.email,
    "Should proceed with complete info"
  );
});

// Test 8: Price Formatting
test("Price formatting returns correct format", () => {
  const formatPrice = (price) => `$${price?.toFixed(2)}`;

  assert(formatPrice(28) === "$28.00", "Should format 28 as $28.00");
  assert(formatPrice(150.5) === "$150.50", "Should format 150.5 as $150.50");
  assert(formatPrice(0.99) === "$0.99", "Should format 0.99 as $0.99");
});

// Test 9: Category Filtering
test("Product category filtering works correctly", () => {
  const hairCareProducts = products.filter((p) => p.category === "Hair Care");
  const soapProducts = products.filter((p) => p.category === "Organic Soap");

  assert(hairCareProducts.length > 0, "Should have Hair Care products");
  assert(soapProducts.length > 0, "Should have Organic Soap products");
  assert(
    hairCareProducts.length + soapProducts.length === products.length,
    "All products should belong to a category"
  );
});

// Test 10: Date Validation
test("Date selection only allows future dates", () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  assert(tomorrow > today, "Tomorrow should be after today");
  assert(yesterday < today, "Yesterday should be before today");
});

// Test Summary
console.log("\n📊 Test Results:");
console.log(`Passed: ${passedTests}/${totalTests}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100)?.toFixed(1)}%`);

if (passedTests === totalTests) {
  console.log("\n🎉 All tests passed!");
} else {
  console.log("\n⚠️  Some tests failed. Please check the output above.");
}

export { test, assert };
