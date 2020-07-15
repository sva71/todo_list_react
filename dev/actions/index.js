export const addArticle = (article) => ({ type: 'ADD_ARTICLE', payload: article });
export const updateArticle = (article) => ({ type: 'UPDATE_ARTICLE', payload: article });
export const deleteArticle = (id) => ({ type: 'DELETE_ARTICLE', payload: id });

export default {addArticle, updateArticle, deleteArticle}