export const validUserCreateBody = (data) => {
	return (
		'username' in data &&
		'email' in data &&
		'password' in data &&
		'firstname' in data &&
		'surname' in data &&
		'bio' in data &&
		'favorites' in data &&
		'follows' in data
	);
};

export const validUserLoginBody = (data) => {
	return (
		'token' in data
	);
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
	return (
		'token' in data
	);
};