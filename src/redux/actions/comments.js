import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from '../../utils/api.js';
import Swal from "sweetalert2";

let headers = ()=> {
    return {
        headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    }
}         

const datos_comments = createAsyncThunk(
    'datos_comments', async({productId, page}) => {
        console.log(productId)
        console.log(page)
        try {
            let { data } = await api.get(`https://fastcommerce-back-production.up.railway.app/api/comments?product_id=${productId}&page=${page}`)
            console.log(data)
            console.log(data.comments, data.totalPages, data.prev, data.next)
            return data.comments
        } catch (error) {
            console.log(error)
            return null
        }
    }                                    
)

const post_comment = createAsyncThunk(
    'post_comment', async({ product_id: productId, user_id: userId, comment: newComment }) => {
        try {
            let post = await api.post(`https://fastcommerce-back-production.up.railway.app/api/comments/`, { product_id: productId, user_id: userId, comment: newComment }, headers())
            Swal.fire({
                icon: 'success',
                title: 'Comment posted!',
            })
            return post
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error posting, try it again',
            })
            return null
        }
    }
)

const edit_comment = createAsyncThunk(
    'edit_comment', async({commentId, comment: editedComment}) => {
        try {
            await api.put(`https://fastcommerce-back-production.up.railway.app/api/comments/${commentId}`, {comment: editedComment }, headers());
            Swal.fire({
                icon: 'success',
                title: 'Comment changed successfully!',
            })
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error editing, try it again',
            })
            return null            
        }
    }
)

const eliminate_comment = createAsyncThunk(
    'eliminate_comment', async({commentId}) => {
        try {
            await api.delete(`https://fastcommerce-back-production.up.railway.app/api/comments/${commentId}`, headers());
            Swal.fire({
                icon: 'success',
                title: 'Comment deleted successfully!',
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'You do not have permission to delete this comment',
            });
            return null
        }
    }
)

// el objetivo de la accion es enviar informacion al reductor. 
// AQUI se realiza TODA la logica necesaria para modificar/reducir los estados globales.
const commentsActions = { datos_comments, post_comment, edit_comment, eliminate_comment }
export default commentsActions