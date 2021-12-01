export const validUserBody = (data) => {
    return 'username' in data && 'email' in data && 'password' in data && 'firstname' in data && 'surname' in data && 'bio' in data && 'favorites' in data && 'follows' in data;
}