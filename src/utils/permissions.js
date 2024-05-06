const URL = process.env.CLIENT_URL;

const usersRoles = [
  {
    role: "admin",
    priority: 4,
    allows: [
      { resource: "/admin/users", permissions: "*" },
      { resource: "/admin/users/add", permissions: "*" },
      { resource: "/admin/users/edit", permissions: "*" },
      { resource: "/admin/users/edit/:id", permissions: "*" },
      { resource: "/admin/users/delete/:id", permissions: "*" },
    ],
  },
  {
    role: "tenant",
    priority: 3,
    allows: [{ resource: `/dashboard`, permissions: ["post"] }],
  },
  {
    role: "lodger",
    priority: 2,
    allows: [{ resource: `/dashboard`, permissions: ["post", "get"] }],
  },
  {
    role: "guest",
    priority: 1,
    allows: [],
  },
];

export const permissions = {
  usersRoles: usersRoles,
  addRoleParents: function (targetRole, sourceRole) {
    const targetData = this.usersRoles.find((v) => v.role === targetRole); // np obiekt z role admin
    const sourceData = this.usersRoles.find((v) => v.role === sourceRole); // np obiekt z role user

    targetData.allows = targetData.allows.concat(sourceData.allows);
  },
  isResourceAllowedForUser: function (userRole, resource, method) {
    // sprawdza czy user o określonej roli może mieć dostęp do resource
    // zwraca false jeśli nie ma dostępu, true jeśli ma dostęp
    const roleData = this.usersRoles.find((v) => v.role === userRole);

    if (!roleData) return false; // brak dostępu bo nie ma takie roli obsługiwanej na serwerze

    const resourceData = roleData.allows.find((v) => v.resource === resource);
    if (!resourceData) return false; // osoba o tej roli nie ma info o tym adresie więc nie ma dostępu
    if (!resourceData.permissions) return false; // nie ma dostępu bo nie ma opisanych dozwolonych metod

    if (!Array.isArray(resourceData.permissions)) {
      if (resourceData.permissions === "*") return true; // dostęp do wszystkich metod, może korzystać z url
      if (resourceData.permissions === method) return true; // ma dostęp do tej metody, więc może korzystać
    } else {
      // tablica
      if (resourceData.permissions.find((v) => v === "*")) return true; // ma dostęp
      if (resourceData.permissions.find((v) => v === method)) return true; // ma dostęp
    }

    return false; // brak dostępu
  },
  getPriorityByRole: function (role) {
    const user = this.usersRoles.find((v) => v.role === role);
    if (user) return user.priority;

    return -1;
  },
};

permissions.addRoleParents("tenant", "lodger");
permissions.addRoleParents("admin", "tenant");
