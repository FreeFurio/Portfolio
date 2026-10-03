# CODING_GUIDELINES.md

> Read this file **before** writing or changing any code.
> Goal: every file follows the same structure and the same pattern.
> `[brackets]` = filled in per project. Sections 3 to 10 are the core and stay the same for every project.

---

## 0. AI Workflow: FOLLOW STRICTLY AND EVERY TIME

1. Read every file related to the request before answering. Re-read them each time; do not rely on earlier messages.
2. Restate my request in your own words so I can confirm you understood it.
3. Give suggestions first. Wait until I say **"go"** before giving any code.
4. Multiple files: do not dump all the code. Go in sequence: "let's start with this file, then the next once that's done."
5. Every code block shows **Before** and **After**.
6. When I say **"done"**, check the files again and confirm there are no errors.
7. If I skip or miss one of your questions, ask it again. Never decide for me.
8. Be consistent with the existing coding pattern (sections 3 and 15).

---

## 1. Project Block (fill in when there is a project)

```
Project Name:      Portfolio — Reeon Lance Tobia, Full-Stack Developer
Stack Profile:     B
Project Structure: client/ = React + Vite frontend, server/ = Node + Express backend
Roles:             Public, Admin (only Reeon)
Key Features:
  - Hero:     editable name, title, tagline, CTA buttons, resume download, social links
  - About:    editable bio, photo URL, and stats (pulled from Firebase)
  - Projects: editable collection (title, description, tech stack, GitHub/live links, featured flag)
  - Skills:   editable grouped skill list
  - Contact:  public form → backend → Firebase messages collection
  - Auth:     Supabase email/password, admin only
  - Admin:    dashboard to edit Hero, About, Projects (with featured toggle), Skills; view/delete messages
Local Development:
  - client: cd client && npm run dev  (port 5173)
  - server: cd server && npm run dev  (port 3000)
  - env files: client/.env, server/.env (see .env.example in each)
Production URLs:   Railway (TBD — fill in after first deploy)
Known Gotchas:     see section 16
```

---

## 2. Stack Profiles (keep ONE, delete the others)

**Never add a package, framework, or tool without asking. Pin exact versions.**

### Profile A: .NET

| Layer | Choice |
|---|---|
| Language | C# [version] |
| Backend | ASP.NET Core Web API [version] |
| Frontend | Blazor [Server / WebAssembly] |
| Database | Microsoft SQL Server |
| Data access | [Entity Framework Core / Dapper] |
| Real-time | SignalR (only if a feature needs live updates) |
| Hosting | [Microsoft Azure / other] |

### Profile B: JavaScript ✅ ACTIVE

| Layer | Choice |
|---|---|
| Language | JavaScript (ES modules) |
| Frontend | React 19 with Vite 8 |
| Backend | Node.js 20 with Express 5 |
| Database | Firebase (Firestore) via firebase-admin 13 |
| Auth | Supabase 2 (email/password, admin only) |
| Real-time | Not needed |
| Hosting | Railway |

**Key packages (server):** express ^5.2.1, firebase-admin ^13.10.0, @supabase/supabase-js ^2.109.0, dotenv ^18.0.5, cors ^2.8.6
**Key packages (client):** react ^19.2.8, react-router-dom ^7.18.4, axios ^1.20.0

### Profile C: Python + React

| Layer | Choice |
|---|---|
| Language | Python [version] |
| Backend | Django + Django REST Framework |
| Frontend | React [version] with Vite |
| Database | [Firestore / PostgreSQL / SQL Server] |
| Real-time | [Django Channels], only if needed |
| Hosting | [Railway / other] |

---

## 3. Core Principles

1. **Consistency beats cleverness.** Before writing anything new, find the closest existing feature and copy its pattern (see section 15). If there is no example, ask me.
2. **One job per piece.** A file, class, function, or component does one thing. If you need "and" to describe it, split it.
3. **Separation of layers.** UI, HTTP handling, business rules, and data access are different jobs and live in different places (section 4).
4. **Dependencies point one way.** Outer layers call inner layers, never the reverse (section 4).
5. **Group by feature, not by file type.** Everything for one feature lives together (section 5).
6. **Rule of three.** Duplicate once if you must. On the third copy, extract it. Do not build abstractions "just in case."
7. **Explicit over implicit.** No hidden side effects, no magic strings, no values that appear from nowhere.
8. **Smallest change that works.** Do not refactor or reformat code that the task does not touch. Suggest it separately.

---

## 4. Layers and Responsibilities

Every piece of code belongs to exactly one layer. This is the map:

| Layer | Its one job | May call | Must NOT |
|---|---|---|---|
| **UI** (pages, components) | Render and handle user events | Client logic (hooks / client services) | Make raw HTTP calls, contain business rules |
| **Client logic** (hooks, API services) | Fetch data, hold UI state, talk to the backend | API client | Render UI |
| **Edge** (controller / route / view / hub / consumer) | Receive the request, validate its shape, call a service, return a response | Services | Contain business rules, query the database |
| **Service** | Business rules and workflows | Repositories, other services (via interface) | Know about HTTP, `request`/`response`, or UI |
| **Data access** (repository / ORM / selectors) | Read and write the database | Database | Contain business rules, call services |
| **Model** (entity, DTO, schema) | Describe the shape of data | Nothing | Contain logic beyond simple validation |

### Where each layer lives per profile

| Layer | A: .NET | B: JavaScript | C: Python + React |
|---|---|---|---|
| UI | Blazor pages / components | React components / pages | React components / pages |
| Client logic | Blazor services (typed API client) | hooks + `services/` | hooks + `services/` |
| Edge | Controllers, SignalR hubs | routes + controllers | `views.py` / viewsets, Channels consumers |
| Service | `*Service` classes | `*.service.js` | `services.py` |
| Data access | Repositories / DbContext | `*.repository.js` / models | models, `selectors.py` (reads) |
| Model | Entities + DTOs | models + validation schemas | models + serializers |

### Direction of calls

```
UI -> client logic -> (HTTP) -> edge -> service -> data access -> database
```

- Each arrow goes **one way only**. Nothing calls backwards.
- UI never talks to data access. An edge never talks to the database directly.
- Data access never calls a service.
- Two services may call each other only through an interface, and never in a circle (A calls B calls A). If that happens, the logic belongs in a third service.

---

## 5. Feature-Based Structure

**One folder per feature/module. Do not dump everything into shared folders.**

### What a feature folder contains

Everything the feature needs lives inside it, on both frontend and backend.

**Profile A: .NET**
```
/src/ProjectName.Api
  /Features
    /Orders
      OrdersController.cs
      IOrderService.cs
      OrderService.cs
      IOrderRepository.cs
      OrderRepository.cs
      Order.cs                 # entity
      /Dtos                    # CreateOrderRequest, OrderResponse
      OrderValidator.cs
  /Shared                      # middleware, extensions, constants, base classes
  /Data                        # DbContext, Migrations
/src/ProjectName.Web           # Blazor
  /Features
    /Orders
      /Pages                   # OrderList.razor (+ OrderList.razor.cs code-behind)
      /Components              # used only by Orders
      OrderApiClient.cs
  /Shared                      # layout, generic components
```

**Profile B: JavaScript**
```
/server/src
  /features
    /orders
      orders.routes.js
      orders.controller.js
      orders.service.js
      orders.repository.js
      orders.validation.js
      orders.model.js
  /shared                      # middleware, config, error classes, utils
/client/src
  /features
    /orders
      /components              # used only by orders
      /hooks                   # useOrders.js
      /services                # ordersApi.js
      /pages
      constants.js
      index.js                 # the ONLY thing other features may import from
  /shared                      # generic components, api client, hooks, styles
```

**Profile C: Python + React**
```
/server
  /core                        # settings, root urls, asgi
  /orders                      # one Django app per feature
    models.py
    serializers.py
    views.py
    services.py
    selectors.py
    urls.py
    consumers.py               # only if real-time
    tests/
  /common                      # generic helpers only
/client/src                    # same structure as Profile B
```

### Rules

- **A feature owns its code.** UI, hooks, API calls, routes, services, and models for "orders" are all in the `orders` folder.
- **Start inside the feature.** New code always begins in its feature folder.
- **Promotion rule:** move code to `shared` only when **two or more features** already use it, and only if it knows nothing about any one feature.
- **The shared-folder test:** "Would this still make sense in a different project?" If not, it does not belong in `shared`.
- **Features talk through a public surface.** Feature A imports from Feature B's `index.js` or service interface, never from its internal files.
- **Deletion test:** you should be able to delete a feature folder and only get errors where it is deliberately used (routes, menus), not inside other features.
- **No junk drawers.** No `utils.js`, `helpers.js`, `misc.js`, or `common.js` that collects unrelated functions. Name files by purpose: `dateFormat.js`, `currency.js`, `fileSize.js`.
- **A folder per concern is fine, a folder per file is not.** Do not create a folder for a single small file.

---

## 6. Business Logic Lives in Services

**Business logic lives in services, never in controllers/routes or UI components.**

### What counts as business logic

- Rules about what is allowed: ownership checks, status transitions, limits, duplicates
- Calculations and decisions: totals, matching, eligibility, "who gets notified"
- Workflows that touch more than one table or more than one entity
- Anything you would explain to a non-programmer as "how the system works"

### What each layer is allowed to do instead

| Layer | Allowed |
|---|---|
| Controller / route / view | Read the request, check input shape, call **one** service method, return the standard response. Target: under ~15 lines per action |
| UI component | Render data, handle clicks and typing, call a hook, show loading/empty/error |
| Service | Everything in the list above |

### Wrong vs right: backend (.NET)

```csharp
// WRONG: the controller owns the rules and talks to the database
[HttpPost("{id}/approve")]
public async Task<IActionResult> Approve(int id)
{
    var order = await _db.Orders.FindAsync(id);
    if (order == null) return NotFound();
    if (order.OwnerId != User.GetId()) return Forbid();
    if (order.Status != "Pending") return BadRequest("Not pending");
    order.Status = "Approved";
    await _db.SaveChangesAsync();
    return Ok(order);
}
```

```csharp
// RIGHT: controller only translates; the service owns the rules
[HttpPost("{id}/approve")]
public async Task<IActionResult> Approve(int id)
{
    var result = await _orderService.ApproveAsync(id, User.GetId());
    return Ok(ApiResponse.Ok(result, "Order approved"));
}

// OrderService.cs
public async Task<OrderResponse> ApproveAsync(int id, int userId)
{
    var order = await _orders.GetByIdAsync(id)
        ?? throw new NotFoundException("Order not found");

    if (order.OwnerId != userId) throw new ForbiddenException();
    if (order.Status != OrderStatus.Pending)
        throw new ValidationException("Only pending orders can be approved");

    order.Status = OrderStatus.Approved;
    await _orders.UpdateAsync(order);
    return OrderMapper.ToResponse(order);
}
```

### Wrong vs right: frontend (React)

```jsx
// WRONG: the component fetches, filters, and decides rules itself
function OrderList() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/orders').then((res) =>
      setOrders(res.data.data.filter((o) => o.status !== 'cancelled')));
  }, []);
  return orders.map((o) => <div key={o.id}>{o.name}</div>);
}
```

```jsx
// RIGHT: three small pieces, each with one job

// features/orders/services/ordersApi.js   (HTTP only)
export const getOrders = () => api.get('/orders').then((res) => res.data.data);

// features/orders/hooks/useOrders.js      (data + UI state)
export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrders().then(setOrders).catch(setError).finally(() => setLoading(false));
  }, []);

  return { orders, loading, error };
}

// features/orders/components/OrderList.jsx (render only)
export default function OrderList() {
  const { orders, loading, error } = useOrders();
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!orders.length) return <EmptyState text="No orders yet" />;
  return orders.map((o) => <OrderCard key={o.id} order={o} />);
}
```

> The filter "hide cancelled orders" is a **rule**. If the server decides what is visible, it lives in the backend service, not in the UI.

---

## 7. Backend Rules

- **Thin edges.** Controllers, routes, views, SignalR hubs, and WebSocket consumers all follow the same pattern: receive, validate shape, call a service, respond.
- **Real-time is an edge, too.** A hub/consumer does not contain business logic. To push an update, a service calls a small notifier (e.g. `IOrderNotifier`, `broadcast_order_update()`) that the hub/consumer layer implements.
- **One service per feature/aggregate.** Services are classes/modules with clear public methods. Private helpers stay private.
- **Dependency injection.** Never create a service or repository with `new` inside other code. Inject it. (Django/Node: import services as modules and keep them stateless.)
- **Validate at the boundary, authorize twice.** Validate input shape at the edge. Check role at the edge, then check **ownership/permission** inside the service.
- **DTOs in, DTOs out.** Requests and responses use their own types. Never return a database entity directly.
- **Standard response shape** for every endpoint:

```json
{ "success": true, "message": "Order approved", "data": {}, "errors": [] }
```

- **Status codes:** `200` OK, `201` created, `204` no content, `400` validation, `401` not logged in, `403` not allowed, `404` not found, `409` conflict, `500` server error.
- **Transactions** belong in the service, wrapping a whole workflow.
- **Route registration order matters** in some frameworks (e.g. Django). Register specific paths before general ones.
- **Config comes from one place** (options class / settings module / config file), read from environment variables. No hard-coded URLs, keys, or limits.
- **Paginate** every list that can grow: `?page=1&pageSize=20`.

---

## 8. Frontend Rules

- **Container vs presentational.** Pages/containers get data (via hooks) and pass it down. Presentational components receive props and render. They never fetch.
- **One API client.** A single configured instance (Axios / HttpClient) with the base URL, auth header, and error handling. Feature API files use it; components never import Axios or call `fetch` directly.
- **Hooks (or Blazor services) hold the logic** that components need: fetching, submitting, filtering, derived state. If a component grows past ~150 lines, extract.
- **Server data is not UI state.** Do not copy server data into global state "just in case." Use a data-fetching hook or library for server data. Keep global state only for app-wide things (current user, theme, layout).
- **State lives as low as possible.** Local first. Lift only when two siblings need it. Global last.
- **Props:** keep them few and explicit. More than ~6 props means the component does too much or needs a grouped object.
- **Every data view handles three states:** loading, empty, error.
- **Routing and guards in one place.** Route definitions and access checks live in a single routing module, not scattered inside pages.
- **Constants in one place.** Statuses, roles, route paths, and UI text come from constants/enums. No `'pending'` typed by hand in five files.
- **Styling:** design tokens (colors, spacing, radius, fonts) defined once and reused. No random hex codes or one-off pixel values in components.
- **Blazor specifics:** use code-behind (`Component.razor.cs`) for logic, inject services with `@inject`, and never touch `DbContext` from a component.
- **Responsive by default:** mobile-first. Every table, dialog, and layout works at ~360px width.
- **Use provided assets** (logos, images, icons) before generating or substituting new ones.

---

## 9. Data Layer Rules

- **All queries live in the data-access layer.** Services ask repositories/selectors; they do not build queries.
- **Entities never leave the service.** Map to a DTO/serializer before returning.
- **Every record has** `Id`, `CreatedAt`, `UpdatedAt`. Prefer soft delete (`IsDeleted`) for user-facing data.
- **Statuses and roles are enums/constants,** never free text.
- **Schema changes go through migrations.** Never edit the database by hand.
- **No string-built queries.** Use parameters or the ORM.
- **Avoid N+1 queries.** Load related data in one query when a list needs it.
- **NoSQL (Firestore / Firebase):** define each document's shape in one model/doc comment, access collections only through the data-access module, and note any query that needs a composite index in section 16.
- **Seed data** lives in one place: [seed file / migration].

---

## 10. Error Handling Contract

Each layer has a defined role, so errors are handled in one place instead of everywhere.

| Layer | What it does with errors |
|---|---|
| Data access | Lets database errors bubble up. Never swallows them |
| Service | Throws **named** errors: `NotFound`, `Forbidden`, `Validation`, `Conflict` |
| Edge | No try/catch for normal flow. One **global handler** converts named errors into status code + the standard response shape |
| Client service | Unwraps the response and throws a normalized error |
| UI | Shows a friendly message. Never shows a stack trace |

- Never use an empty `catch`.
- Log errors with context (what failed, which id). Never log passwords, tokens, or personal data.

---

## 11. Naming

| Thing | Convention | Example |
|---|---|---|
| C# classes, methods, properties | PascalCase | `OrderService`, `GetById` |
| C# private fields | `_camelCase` | `_orders` |
| C# interfaces | `I` + PascalCase | `IOrderService` |
| Blazor / React components | PascalCase, file = component name | `OrderCard.razor`, `OrderCard.jsx` |
| JS variables, functions | camelCase | `getOrderById` |
| JS non-component files | camelCase or `feature.layer.js` | `ordersApi.js`, `orders.service.js` |
| Python files, functions, variables | snake_case | `order_service.py` |
| Python classes | PascalCase | `OrderSerializer` |
| Constants | UPPER_SNAKE_CASE | `MAX_UPLOAD_SIZE` |
| Booleans | `is` / `has` / `can` prefix | `isActive`, `hasAccess` |
| Feature folders | .NET: PascalCase / JS: kebab-case / Django: snake_case | `Orders`, `order-history`, `order_history` |
| DB tables / columns | PascalCase (SQL Server) or snake_case (Django) | `Orders`, `CreatedAt` |
| API routes | kebab-case, plural nouns | `/api/order-items` |
| CSS classes | kebab-case (or the project's utility framework) | `order-card` |
| Git branches | `type/short-description` | `feature/order-approval` |

- Names describe purpose. No `data1`, `temp`, `x`, `doStuff`.
- **Same concept, same word, everywhere** (UI, code, database, API). Keep the glossary in section 1 or the README.
- Methods that return something are named for what they return; methods that do something are verbs: `getOrders`, `approveOrder`.

---

## 12. Code Style

- Indent: 4 spaces for C# and Python, 2 spaces for JS/JSX/CSS/JSON. No tabs.
- Always use braces for `if` blocks in C# and JS.
- `async/await` only, never mixed with `.then()` chains inside the same function.
- JS: `const` by default, `let` when reassigning, never `var`. Use `===`.
- C#: nullable reference types on. `var` only when the type is obvious.
- No magic strings or numbers. Constants or enums.
- No dead code, no commented-out code, no leftover `console.log` / `Console.WriteLine` / `print`.
- Comments explain **why**, not what. Public service methods get a one-line summary.
- Functions stay under ~40 lines. Files stay under ~300 lines. Split when they grow.
- Prefer early returns over deep nesting (max 3 levels).

---

## 13. Security, Git, Testing (short)

**Security**
- Secrets never go in code or Git. Use `.env` / user secrets and commit a `.env.example` with fake values.
- Passwords are hashed. Use the framework's built-in auth where possible.
- Third-party API keys are called from the **backend only**.
- CORS only for known origins. Sanitize anything rendered back to a page.

**Git**
- `main` always works. Work on branches: `feature/...`, `fix/...`, `chore/...`.
- Commit format: `type: short summary` (`feat`, `fix`, `refactor`, `docs`, `chore`).
- `.gitignore` covers build output, `node_modules`, `bin/obj`, `venv`, `.env`, IDE files.
- The README always explains how to install, configure, and run the project.

**Testing**
- Test every feature manually: happy path, empty input, invalid input, wrong role.
- Test endpoints in Postman and keep the collection updated.
- Automated tests go on services first (xUnit / Jest or Vitest / pytest). Fix a bug, then add a test for it.

---

## 14. Build Order for a New Feature (bottom-up)

Build from the inside out, one file at a time, and wait for my "done" between files (section 0).

1. **Model:** entity/schema and migration
2. **Data access:** repository / selectors
3. **DTOs and validation:** request and response shapes
4. **Service:** the business rules
5. **Edge:** controller / route / view, then register it
6. **Test the endpoint** (Postman) before touching the frontend
7. **Client API service:** the HTTP calls
8. **Hook / client service:** data and UI state
9. **Components:** presentational pieces first, then the page
10. **Route and guard:** add the page to routing and the menu

---

## 15. Pattern Consistency Check (before writing any code)

- [ ] Found the **closest existing feature** and opened its files
- [ ] New files use the **same folder layout and file names** as that feature
- [ ] Same **naming**, **response shape**, and **error pattern**
- [ ] Each piece of logic sits in the **correct layer** (section 4)
- [ ] Nothing new goes into `shared` unless two features already need it
- [ ] No new package or pattern introduced without asking
- [ ] If the existing code breaks these guidelines, **follow the existing pattern for this task** and tell me so we can decide on a cleanup separately

---

## 16. Known Gotchas Log (fill in as they appear)

Write down any bug or surprise that cost time, so it is never repeated. One entry each:

```
- [Area] Symptom -> Cause -> Fix
  e.g. [API] List endpoint returns 404 -> specific route registered after the general one -> register specific routes first
```

- [add entries here]
- [Firebase] Server 500 on first run -> Firestore API disabled in Google Cloud -> Enable at console.developers.google.com/apis/api/firestore.googleapis.com
- [Supabase] Server crash on Node 20 -> No native WebSocket support -> Install `ws` and pass as transport option to createClient
- [Theme] Login page shows no styles (white screen) -> data-theme not set before React renders -> Set data-theme from localStorage in main.jsx before createRoot
- [Firebase] seed.js must use `node seed.js` not `npm run` -> no script registered, run directly with node

---

## 17. Definition of Done

- [ ] Works as described, including error and empty cases
- [ ] Each piece of logic is in the right layer, in the right feature folder
- [ ] Follows naming, style, and the existing pattern
- [ ] Input validated on the server; permissions checked in the service
- [ ] No hard-coded secrets, magic values, debug logs, or commented-out code
- [ ] UI handles loading / empty / error and works on mobile width
- [ ] Project builds and runs without new warnings
- [ ] README / `.env.example` / migrations updated if needed
- [ ] I said **"done"** and the files were re-checked (section 0)
