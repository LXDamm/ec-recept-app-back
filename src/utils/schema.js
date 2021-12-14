export const validUserCreateBody = (data) => {
    return (
        'username' in data &&
        'email' in data &&
        'token'
    );
};

export const validUserLoginBody = (data) => {
    return 'token' in data;
};

export const validRecipeBody = (data) => {
    return (
        'description' in data &&
        'instruction' in data &&
        'ingredients' in data &&
        'title' in data &&
        'rating' in data &&
        'userId' in data &&
        'categories' in data
    );
};

export const validRecipePostBody = (data) => {
    return (
        'token' in data &&
        'description' in data &&
        'ingredients' in data &&
        'title' in data &&
        'instructions' in data &&
        'categories' in data
    );
};

export const validRecipeDeleteBody = (data) => {
    return 'token' in data;
};

export const validCommentPostBody = (data) => {
    return 'token' in data && 'userId' in data && 'text' in data;
};
