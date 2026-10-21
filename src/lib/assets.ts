/** Root-relative public files, resolved against the deploy base. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
