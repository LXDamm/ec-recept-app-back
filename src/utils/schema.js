export const validUser = (data) => {
    return 'username' in data && 'firstname' in data && 'surname' in data && 'bio' in data && 'favorites' in data && 'follows' in data;
}