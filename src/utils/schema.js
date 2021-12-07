export const validUserBody = (data) => {
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

export const validRecipeBody = (data) => {
	return (
		'description' in data &&
		'ingredients' in data &&
		'title' in data &&
		'rating' in data &&
		'userId' in data &&
		'categories' in data
	);
};

export const validRecipePostBody = (data) => {
	return (
		'description' in data &&
		'ingredients' in data &&
		'title' in data &&
		'instruction' in data &&
		'userId' in data &&
		'categories' in data
	);
};
