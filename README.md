# Travel-paradise - Site web organisation 
Application web pour les organisation permettant de créer et gérer les utilisateurs, visites, réservations.

## Fonctionnalités

- Authentification JWT
- Création d’organisation et compte administrateur
- Visualisation des visites et reservations
- Visualisation des utilisateurs, guides, administrateurs de l’organisation

## Stack technique

### Frontend

- React 19.0.0
- React-router 7.5.1
- Tailwind CSS 4.1.4
- Typescript
- heroicons 2.2.2

### Gestion des données

- Axios 1.8.4
- Jwt-decode 4.0.0

## Arborescense principale

```yaml
├── App.css
├── App.tsx
├── Route.tsx
├── assets
│   ├── images
│   └── react.svg
├── components
│   ├── DeleteUser.tsx
│   ├── EditUser.tsx
│   ├── ErrorPage.tsx
│   ├── Home.tsx
│   ├── LastVisitsNotation.tsx
│   ├── Layout.tsx
│   ├── Nav.tsx
│   ├── Profile.tsx
│   ├── ProtectedRoute.tsx
│   ├── Register.tsx
│   ├── ReservationCarrousel.tsx
│   ├── ReservationTable.tsx
│   ├── VisitTable.tsx
│   ├── VisitorAttendanceRateGraph.tsx
│   ├── adminList.tsx
│   ├── createOrganisationForm.tsx
│   ├── createUserForm.tsx
│   ├── guideList.tsx
│   ├── login.tsx
│   ├── logout.tsx
│   ├── user.api.ts
│   ├── user.provider.tsx
│   └── userList.tsx
├── context
│   └── AuthContext.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```

## Installation et lancement

```yaml
npm install 
vite
```

L’application se lancera sur `http://localhost:3001`