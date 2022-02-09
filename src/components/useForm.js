import React,{useState} from 'react';

const useForm=(initialFieldValues,validate,setCurrentId)=>{
    const [values,setValues]=useState(initialFieldValues);
    const [errors,setErrors]=useState({});
    const handleInputChange=e=>{
        const{name,value}=e.target;
        const fieldValue={[name]:value};
        setValues({
          ...values,
          ...fieldValue
        });
        validate(fieldValue);
        };

        const resetForm = () => {
            setValues({
                ...initialFieldValues
            })
            setErrors({})
            setCurrentId(0)
        }

    return{
        values,
        setValues,
        handleInputChange,
        errors,
        setErrors,
        resetForm
    }
}

export default useForm;