import { permissions } from './permissions.js';

export const getGuestDefaultUser = () => {
  return {
    role: 'lodger'
  }
};

export const authRole = (req, res, next) => {

  console.log('authRole() - middleware');
  const resource = req.route.path;
  const method = req.method.toLowerCase();
  console.log('resource: ', resource, 'method: ', method);

  if (!req.user) {
    req.user = getGuestDefaultUser();
  }

  console.log('req.user: ', req.user);

  if (permissions.isResourceAllowedForUser(req.user.role, resource, method)) {
   //ma dostęp
    return next()
  } else {
    //nie ma dostępu
    res.status(401)
    return res.send('Access forbidden');
  }

  return next();
};