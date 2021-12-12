import admin from '../firebase/config';
import { validCommentPostBody } from '../utils/schema';

const auth = admin.auth();
const db = admin.firestore();

export const postComment = async (req, res) => {
    const body = req.body;
    try {
        if (!validCommentPostBody(body)) throw new Error('Malformed schema');
        const token = await auth.verifyIdToken(body.token);
        if (!token) throw new Error('Not authorized');
        const userId = token.uid;
        if (!userId) throw new Error('No user id');
        const docRef = await db.collection('comments').add({
            userId: userId,
            text: body.text,
        });
        if (!docRef) throw new Error('No collection');
        const doc = await docRef.get();
        if (!doc.exists) throw new Error('No doc created');
        const commentId = doc.id;
        res.status(201).json({
            commentId: commentId,
        });
    } catch (error) {
        console.log(error);
        switch (error) {
            case 'Not authorized':
                res.status(400);
                break;
            case 'No user id':
                res.status(400);
                break;
            default:
                res.status(400);
        }
        res.send(error);
    }
};
