/** Name validation regex */
export declare const NAME_REGEX: RegExp;
/** Email validation regex */
export declare const EMAIL_REGEX: RegExp;
/** Password validation regex */
export declare const PASSWORD_REGEX: RegExp;
export declare const DEV = "development";
/** Supported application routes */
export declare const ROUTES: {
    readonly ui: {
        readonly signUp: "/registration";
        readonly signIn: "/authorization";
        readonly signInGoogle: "/authorization/google";
        readonly forgotPassword: "/forgot-password";
        readonly home: "/";
        readonly profile: "/profile";
        readonly users: "/users";
        readonly newUser: "/users/new";
        readonly user: (id: string | number) => string;
        readonly roles: "/roles";
        readonly newRole: "/roles/new";
        readonly role: (id: string | number) => string;
        readonly resources: "/resources";
        readonly newResource: "/resources/new";
        readonly resource: (id: string | number) => string;
    };
    readonly api: {
        readonly auth: "/auth";
        readonly sighUp: "/auth/sign-up";
        readonly forgotPassword: "/auth/forgot-password";
        readonly resetPassword: "/auth/reset-password";
        readonly signIn: "/auth/sign-in";
        readonly verifyUser: "/auth/verify-user";
        readonly signInGoogle: "/auth/sign-in/google";
        readonly refresh: "/auth/refresh";
        readonly signOut: "/auth/sign-out";
        readonly profile: "/profile";
        readonly updatePassword: "/profile/update-password";
        readonly changeEmail: "/profile/change-email";
        readonly sessions: "/profile/sessions";
        readonly users: "/users";
        readonly user: (id: string | number) => string;
        readonly userRoles: (id: string | number) => string;
        readonly roles: "/roles";
        readonly role: (id: string | number) => string;
        readonly roleRights: (id: string | number) => string;
        readonly resources: "/resources";
        readonly resource: (id: string | number) => string;
    };
};
//# sourceMappingURL=constants.d.ts.map