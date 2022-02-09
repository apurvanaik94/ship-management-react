import shipApi from './api';

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
};

const formateData = data => ({
    ...data,
    length: parseFloat(data.length ? data.length : 0),
    width: parseFloat(data.width ? data.width : 0)
})

//react thunk function
export const fetchAll = () => dispatch => {
    shipApi.ship().fetchAll()
    .then(
        response=>{
            dispatch({
                type:ACTION_TYPES.FETCH_ALL,
                payload:response.data
            })
        }
    )
    .catch(err=>console.log(err))
};

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    shipApi.ship().create(data)
        .then(res => {
            console.log(res);
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    shipApi.ship().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    shipApi.ship().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
