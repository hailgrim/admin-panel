"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTES = exports.DEV = exports.PASSWORD_REGEX = exports.EMAIL_REGEX = exports.NAME_REGEX = void 0;
/** Name validation regex */
exports.NAME_REGEX = /^[\w ]{1,100}$/;
/** Email validation regex */
exports.EMAIL_REGEX = /^[\w.]+@\w+\.+\w{2,4}$/;
/** Password validation regex */
exports.PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{10,100}$/;
exports.DEV = 'development';
/** Supported application routes */
exports.ROUTES = {
    ui: {
        signUp: '/registration',
        signIn: '/authorization',
        signInGoogle: '/authorization/google',
        forgotPassword: '/forgot-password',
        home: '/',
        profile: '/profile',
        users: '/users',
        newUser: '/users/new',
        user: (id) => `/users/${id}`,
        roles: '/roles',
        newRole: '/roles/new',
        role: (id) => `/roles/${id}`,
        resources: '/resources',
        newResource: '/resources/new',
        resource: (id) => `/resources/${id}`,
    },
    api: {
        auth: '/auth',
        sighUp: '/auth/sign-up',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
        signIn: '/auth/sign-in',
        verifyUser: '/auth/verify-user',
        signInGoogle: '/auth/sign-in/google',
        refresh: '/auth/refresh',
        signOut: '/auth/sign-out',
        profile: '/profile',
        updatePassword: '/profile/update-password',
        changeEmail: '/profile/change-email',
        sessions: '/profile/sessions',
        users: '/users',
        user: (id) => `/users/${id}`,
        userRoles: (id) => `/users/${id}/roles`,
        roles: '/roles',
        role: (id) => `/roles/${id}`,
        roleRights: (id) => `/roles/${id}/rights`,
        resources: '/resources',
        resource: (id) => `/resources/${id}`,
    },
};
//# sourceMappingURL=constants.js.map