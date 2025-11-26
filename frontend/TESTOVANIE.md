# Testovanie Frontend

## Spustenie testov

```bash
cd frontend
npm install
npm test
```

Pre zobrazenie code coverage:
```bash
npm run test:coverage
```

---

## Prehľad testov

### 1. schemas.test.ts
📁 [`__tests__/lib/schemas.test.ts`](__tests__/lib/schemas.test.ts)

Testuje validačné schémy formulárov (Zod).

**loginSchema:**
- ✓ should accept valid email and password
- ✓ should accept password with exactly 6 characters
- ✓ should reject empty email
- ✓ should reject invalid email format
- ✓ should reject password shorter than 6 characters
- ✓ should reject missing email field
- ✓ should reject missing password field

**registerSchema:**
- ✓ should accept valid registration data
- ✓ should accept name with exactly 2 characters
- ✓ should reject name shorter than 2 characters
- ✓ should reject mismatched passwords
- ✓ should reject invalid email format
- ✓ should reject empty name
- ✓ should reject password shorter than 6 characters

**forgotPasswordSchema:**
- ✓ should accept valid email
- ✓ should accept different valid email formats
- ✓ should reject empty email
- ✓ should reject invalid email format
- ✓ should reject email without domain
- ✓ should reject missing email field

**Ukážka testu:**
```typescript
it('should reject mismatched passwords', () => {
  const invalidData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    confirmPassword: 'different123',
  };
  const result = registerSchema.safeParse(invalidData);
  expect(result.success).toBe(false);
});
```

---

### 2. storage.test.ts
📁 [`__tests__/lib/storage.test.ts`](__tests__/lib/storage.test.ts)

Testuje utility funkcie pre prácu s localStorage a cookies.

**Použitý Test Double: MOCK**

**getToken / setToken / removeToken:**
- ✓ should return null when no token is stored
- ✓ should return token when stored
- ✓ should store token in localStorage
- ✓ should also set cookie with token
- ✓ should remove token from localStorage
- ✓ should expire the cookie

**getUser / setUser / removeUser:**
- ✓ should return null when no user is stored
- ✓ should return parsed user object when stored
- ✓ should store user as JSON string
- ✓ should remove user from localStorage

**clear:**
- ✓ should remove both token and user from localStorage
- ✓ should expire the auth cookie

**Ukážka mocku (Test Double):**
```typescript
// Mock localStorage - TEST DOUBLE (Mock)
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
```

**Ukážka testu s použitím mocku:**
```typescript
it('should store token in localStorage', () => {
  storage.setToken('new-token-456');
  expect(localStorageMock.setItem).toHaveBeenCalledWith('authToken', 'new-token-456');
});
```

---

### 3. utils.test.ts
📁 [`__tests__/lib/utils.test.ts`](__tests__/lib/utils.test.ts)

Testuje utility funkciu `cn()` z lib/utils.

- ✓ should merge class names
- ✓ should handle empty input
- ✓ should handle conditional classes
- ✓ should merge tailwind conflicts

---

### 4. cn.test.ts
📁 [`__tests__/utils/cn.test.ts`](__tests__/utils/cn.test.ts)

Testuje utility funkciu `cn()` z utils/cn (Tailwind merge).

**basic functionality:**
- ✓ should merge simple class names
- ✓ should handle single class name
- ✓ should return empty string for no arguments

**conditional classes:**
- ✓ should handle conditional classes with objects
- ✓ should handle falsy values
- ✓ should handle arrays of classes

**tailwind merge functionality:**
- ✓ should merge conflicting tailwind classes
- ✓ should merge conflicting margin classes
- ✓ should merge conflicting text color classes
- ✓ should preserve non-conflicting tailwind classes
- ✓ should handle complex tailwind conflicts

**real-world usage patterns:**
- ✓ should handle button variant pattern
- ✓ should handle responsive classes pattern
- ✓ should handle component composition pattern

**Ukážka testu:**
```typescript
it('should merge conflicting tailwind classes', () => {
  const result = cn('px-2', 'px-4');
  expect(result).toBe('px-4');
});
```

---

### 5. seo.test.ts
📁 [`__tests__/lib/seo.test.ts`](__tests__/lib/seo.test.ts)

Testuje SEO utility funkcie.

**createSEODefaults:**
- ✓ should return default SEO values
- ✓ should return keywords array

**buildMetadata:**
- ✓ should return metadata with defaults when no input
- ✓ should use custom title and description
- ✓ should set robots to noindex when specified
- ✓ should include canonical URL when provided
- ✓ should include image in openGraph when provided

**createPageMetadata / createArticleMetadata:**
- ✓ should create metadata for a page
- ✓ should accept additional options
- ✓ should create metadata with article type
- ✓ should include published time when provided

---

### 6. TimePill.test.tsx
📁 [`__tests__/components/ui/TimePill.test.tsx`](__tests__/components/ui/TimePill.test.tsx)

Testuje komponent TimePill (zobrazenie času).

- ✓ should render label
- ✓ should render value
- ✓ should pad single digit with zero
- ✓ should not pad double digit
- ✓ should render zero as 00

**Ukážka testu UI komponentu:**
```typescript
it('should pad single digit with zero', () => {
  render(<TimePill label="Minutes" value={5} />);
  expect(screen.getByText('05')).toBeInTheDocument();
});
```

---

### 7. Alert.test.tsx
📁 [`__tests__/components/ui/Alert.test.tsx`](__tests__/components/ui/Alert.test.tsx)

Testuje komponent Alert.

- ✓ should render title
- ✓ should render children
- ✓ should render title and children together
- ✓ should render icon when provided
- ✓ should render without icon

---

### 8. PageTitle.test.tsx
📁 [`__tests__/components/ui/PageTitle.test.tsx`](__tests__/components/ui/PageTitle.test.tsx)

Testuje komponent PageTitle.

- ✓ should render title
- ✓ should render title as h1
- ✓ should render subtitle when provided
- ✓ should not render subtitle when not provided
- ✓ should apply custom className

---

### 9. FeatureCard.test.tsx
📁 [`__tests__/components/ui/FeatureCard.test.tsx`](__tests__/components/ui/FeatureCard.test.tsx)

Testuje komponent FeatureCard.

- ✓ should render title
- ✓ should render description
- ✓ should render icon
- ✓ should apply custom className

---

## Zhrnutie

| Súbor | Cesta | Počet testov | Test Double |
|-------|-------|--------------|-------------|
| schemas.test.ts | [`__tests__/lib/`](__tests__/lib/) | 20 | - |
| storage.test.ts | [`__tests__/lib/`](__tests__/lib/) | 12 | Mock |
| utils.test.ts | [`__tests__/lib/`](__tests__/lib/) | 4 | - |
| cn.test.ts | [`__tests__/utils/`](__tests__/utils/) | 14 | - |
| seo.test.ts | [`__tests__/lib/`](__tests__/lib/) | 11 | - |
| TimePill.test.tsx | [`__tests__/components/ui/`](__tests__/components/ui/) | 5 | - |
| Alert.test.tsx | [`__tests__/components/ui/`](__tests__/components/ui/) | 5 | - |
| PageTitle.test.tsx | [`__tests__/components/ui/`](__tests__/components/ui/) | 5 | - |
| FeatureCard.test.tsx | [`__tests__/components/ui/`](__tests__/components/ui/) | 4 | - |
| **Spolu** | | **80** | |

---

## Test Doubles

V projekte je použitý **Mock** pre `localStorage` a `document.cookie` v súbore [`storage.test.ts`](__tests__/lib/storage.test.ts).

Mock simuluje správanie prehliadača bez skutočného ukladania dát, čo umožňuje testovať kód izolovaný od externých závislostí.
