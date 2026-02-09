# Project Conventions (Next.js)

This project follows strict naming + structure rules to keep the codebase consistent and scalable.

---

## Folder Naming

- All folders must be **snake_case**

✅ `user-profile/`  
❌ `UserProfile/`, `userProfile/`, `user-profile/`

---

## Component Naming

- All React components must be **PascalCase**

✅ `UserCard.tsx`  
❌ `userCard.tsx`, `user_card.tsx`

---

## Screens (Pages)

- All screen / route components must be under:

\`\`\`

pages/

\`\`\`

- Each route must be a folder with an \`index.tsx\`

✅
\`\`\`

pages/
login/
index.tsx
dashboard/
index.tsx

\`\`\`

❌
\`\`\`

pages/
dashboard.tsx

\`\`\`

---

## Components Structure

- Every component must have its own folder (snake_case)
- The component file inside must be PascalCase
- Each component folder must have an \`index.ts\` for export

✅
\`\`\`

components/
user-card/
UserCard.tsx
index.ts

\`\`\`

Example \`index.ts\`:
\`\`\`ts
export { default } from "./UserCard";
\`\`\`

---

## File Naming Rules

* Config files: \`name.config.ts\`
* Type files: \`name.type.ts\`
* API files: \`name.api.ts\`

✅ Examples:

\`\`\`
env.config.ts
auth.type.ts
user.api.ts
\`\`\`

---

## Recommended Structure

\`\`\`
src/
  pages/
    login/
      index.tsx
    dashboard/
      index.tsx

  components/
    user-card/
      UserCard.tsx
      index.ts

  api/
    auth.api.ts
    user.api.ts

  types/
    user.type.ts

  config/
    env.config.ts
\`\`\`

---


# Recommended Way to Create Components

\`\`\`
maximum create small compoenents then we can resuse it anywhere else . example use profile should be using lot of places . so do maximum items reusabel . and check if anything that i can use previously generated component then reuse that 

Responsiveness:
Resize the window to ensure the panel looks good on different screen sizes (though it's primarily a desktop feature based on the design).
\`\`\`
